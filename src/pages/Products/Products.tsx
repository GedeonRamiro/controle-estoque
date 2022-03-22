import Header from "components/Header"
import { useEffect, useState } from "react"
import { supabase } from "services/supabase"
import { useAuth } from "../../context/auth"
import { useToasts } from 'react-toast-notifications';
import { Link } from "react-router-dom";

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

const Products = () => {

    const { addToast } = useToasts();
    
    const auth = useAuth()

    const [products, setProducts] = useState<Product[] | null>(null)
    const [loading, setLoading] = useState(false)

    const getProducts = async () => {
        const { data, error } = await supabase.from('product')
            .select('*')
            .eq('user_id', auth.user.id)
        
        if(error){
            addToast(error.message, { appearance: 'error',  autoDismiss: true });  
        }

        setProducts(data)
        setLoading(true)  
    }

    useEffect(() => {
        if(auth.user.id) {
            getProducts()
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Header>
            <Link to={'/adicionar-produto'}>
                    <button className="my-10 btn btn-block sm:btn-wide btn-sm">Novo Produto</button> 
            </Link>
            <div className="grid gap-10 my-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {products && products.map(product => (
                        <div className="shadow-xl card bg-base-100">
                            <div className="w-full h-96 avatar" ><img src={product.img_url} alt="Shoes" /></div >
                            <div className="card-body">
                                <h2 className="card-title">{product.name}</h2>
                                <p>{product.description}</p>
                                <p className='font-semibold'>R$ {product.price}</p>
                                <p>Quantidade: {product.amount}</p>
                            </div>
                            <div className="justify-center mb-4 card-actions">
                                <button className="btn btn-info btn-sm">Editar</button>
                                <button className="btn btn-error btn-sm">Excluir</button>
                            </div>
                        </div>
                ))}
            </div>
            {products?.length === 0 && loading && (
                <h4 className='mb-10 text-lg font-semibold text-center'>Lista vazia!</h4>            
            )}
            {!loading && (
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <button className="btn btn-sm btn-ghost loading">loading</button>
                </div>
            )}
        </Header>
    )
}

export default Products