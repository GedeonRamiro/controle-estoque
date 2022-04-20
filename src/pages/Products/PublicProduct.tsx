import { Link, useParams } from "react-router-dom";
import { supabase } from "services/supabase"
import { useToasts } from 'react-toast-notifications';
import { useEffect, useState } from "react";
import useDebounce from 'components/useDebounce'
import { AiOutlineWhatsApp } from 'react-icons/ai'

type ParamsId = {
    id: string
}

type Product = {
    amount: number
    category_id: number
    created_at: string
    description: string
    id: number
    img_url: string
    name: string
    price: number
    user_id: string
}

const PublicProduct = () => {

    const { addToast } = useToasts();
    
    const { id } = useParams<ParamsId>();

    
    const [products, setProducts] = useState<Product[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSerachTerm] = useState('')
    const [filterProducts, setFilterProducts] = useState<Product[] | null>(null)
    
    const debouncedSearchTerm = useDebounce(searchTerm)


    const handleChangeSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSerachTerm(event.target.value);
      } 

    const getProducts = async () => {
        const { data, error } = await supabase.from('product')
            .select('*')
            .eq('user_id', id)
        
        if(error){
            return addToast(error.message, { appearance: 'error',  autoDismiss: true });  
        }

        setProducts(data)
        setFilterProducts(data)
        setLoading(true)  
    }

    useEffect(() => {
        if(id) {
            getProducts()
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, debouncedSearchTerm, setFilterProducts])

    useEffect(() => {
        const result = products && products.filter(
            (productFilter) => productFilter.name.toLowerCase().includes(searchTerm.toLowerCase()) 
          )

          setProducts(result)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterProducts])
    

    return (
        <div className='container mx-auto'>
            <div className='justify-between flex-1 mx-4 mt-10 sm:mx-0 sm:flex'>
                <h1 className='text-2xl border-b-4 border-green-500 sm:text-4xl w-min'>Produtos</h1>
                <input type="text" placeholder="Pesquisar..." className="w-full my-4 sm:w-max input input-bordered sm:my-0" onChange={handleChangeSearchTerm} />
            </div>
            <div className="grid gap-10 my-4 lg:gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {products && products.map(product => (
                <a href={`#my-modal${product.id}`}  key={product.id}>
                    <div className="mx-4 shadow-xl sm:mx-0 card bg-base-100">
                        <div className="w-full h-80 avatar" ><img src={product.img_url} alt={product.name} /></div >
                        <div className="text-center card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p className='font-semibold'>R$ {product.price}</p>
                        </div>
                    </div>
                    <div className="flex items-center px-4 modal" id={`my-modal${product.id}`}>
                        <div className=" modal-box">
                            <img className='rounded-t-lg' src={product.img_url} alt={product.name} />
                            <h3 className="mt-4 text-lg font-bold">{product.name}</h3>
                            <p className="py-4">{product.description}</p>
                            <p className='text-2xl font-semibold'> R$ {product.price} </p>
                            <div className="modal-action">
                            <a href={`#`}>
                                <button  id={`my-modal${product.id}`} className="btn-success btn btn-sm sm:btn btn-outline sm:btn-outline">
                                   Cancelar
                                </button>
                            </a>    
                            <button className="btn btn-active btn-accent btn-sm sm:btn"> 
                                <AiOutlineWhatsApp className='text-xl sm:text-2xl' /> 
                                <p className='ml-2'>Fazer Pedido</p>
                            </button>
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
        {products?.length === 0 && loading && (
            <h4 className='mb-10 text-lg font-semibold text-center'>Produto não encontrador</h4>            
        )}
        {!loading && (
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <button className="btn btn-sm btn-ghost loading">loading</button>
            </div>
        )}
    </div>
    )
}

export default PublicProduct