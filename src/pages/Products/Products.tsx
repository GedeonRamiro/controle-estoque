import Header from 'components/Header';
import { useEffect, useState } from 'react';
import { supabase } from 'services/supabase';
import { useAuth } from '../../context/auth';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin2Line } from 'react-icons/ri';

type Product = {
    amount: number;
    category_id: number;
    created_at: string;
    description: string;
    id: number;
    img_url: string;
    name: string;
    price: number;
    user_id: string;
};

const Products = () => {
    const { addToast } = useToasts();

    const auth = useAuth();

    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(false);

    console.log(products);

    const formatReal = (money: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(money);
    };

    const getProducts = async () => {
        const { data, error } = await supabase
            .from('product')
            .select('*')
            .eq('user_id', auth.user.id);

        if (error) {
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        }

        setProducts(data);
        setLoading(true);
    };

    const removeProduct = async (id: number) => {
        const { data, error } = await supabase.from('product').delete().match({ id: id });

        const dataDelete = products?.filter((item) => item.id !== data?.[0].id);
        setProducts(dataDelete ?? products);

        if (error) {
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        }

        addToast('Produto excluido com sucesso!', { appearance: 'success', autoDismiss: true });
    };

    useEffect(() => {
        if (auth.user.id) {
            getProducts();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (
        <Header>
            <Link to={'/adicionar-produto'}>
                <button className='my-10 btn btn-block sm:btn-wide btn-sm'>Novo Produto</button>
            </Link>

            <div className='w-full overflow-x-auto lg:overflow-hidden'>
                <div className='flex border-b border-gray-200 shadow'>
                    <table className='w-full'>
                        {products && (
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th className='px-16 py-2 text-xs text-gray-500'>Produtos</th>
                                    <th className='px-16 py-2 text-xs text-gray-500'>Preço</th>
                                    <th className='px-16 py-2 text-xs text-gray-500'>Quantidade</th>
                                    <th className='px-16 py-2 text-xs text-gray-500'>Ação</th>
                                </tr>
                            </thead>
                        )}
                        {products &&
                            products.map((product) => (
                                <tbody key={product.id} className='text-center bg-white border'>
                                    <tr className='whitespace-nowrap'>
                                        <td className='flex items-center px-2 py-4'>
                                            <img
                                                className='object-cover w-12 h-12 bg-center rounded-full '
                                                src={product.img_url}
                                                alt={product.name}
                                            />
                                            <div className='ml-2 text-sm font-semibold text-left text-gray-900'>
                                                {product.name}
                                            </div>
                                        </td>
                                        <td className='text-sm text-gray-900'>
                                            {formatReal(product.price)}
                                        </td>
                                        <td className='text-sm text-gray-900'>{product.amount}</td>

                                        <td className='px-6 py-4'>
                                            <Link to={'/adicionar-produto'} state={product}>
                                                <button className='p-2 mx-1 text-white bg-blue-500 border-2 border-blue-600 rounded shadow-lg'>
                                                    <FiEdit />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => removeProduct(product.id)}
                                                className='p-2 mx-1 text-white bg-red-500 border-2 border-red-700 rounded shadow-lg'
                                            >
                                                <RiDeleteBin2Line />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        {products?.length === 0 && loading && (
                            <h4 className='mb-10 text-lg font-semibold text-center'>
                                Lista vazia!
                            </h4>
                        )}
                        {!loading && (
                            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                                <button className='btn btn-sm btn-ghost loading'>loading</button>
                            </div>
                        )}
                    </table>
                </div>
            </div>
        </Header>
    );
};

export default Products;
