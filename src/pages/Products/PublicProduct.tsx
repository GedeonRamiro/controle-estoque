import { useParams } from "react-router-dom";
import { supabase } from "services/supabase"
import { useToasts } from 'react-toast-notifications';
import { useEffect, useState } from "react";
import useDebounce from 'components/useDebounce'

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

    console.log(products)
    
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
            <div className='flex justify-between my-10'>
                <h1 className='text-4xl'>Produtos</h1>
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered" onChange={handleChangeSearchTerm} />
                        <button className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid gap-10 my-4 lg:gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {products && products.map(product => (
                    <div key={product.id} className="mx-4 shadow-xl sm:mx-0 card bg-base-100">
                        <div className="w-full h-80 avatar" ><img src={product.img_url} alt={product.name} /></div >
                        <div className="text-center card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p className='font-semibold'>R$ {product.price}</p>
                        </div>
                    </div>
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