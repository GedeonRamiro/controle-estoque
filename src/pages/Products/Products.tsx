import Header from 'components/Header';
import { useEffect, useState } from 'react';
import { supabase } from 'services/supabase';
import { useAuth } from '../../context/auth';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { RiAddFill, RiDeleteBin2Line } from 'react-icons/ri';
import { GrView } from 'react-icons/gr';
import Modal from 'components/Modal';
import Spinner from 'components/Spinner';

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
            <div className='flex justify-end my-4 space-x-2'>
                <Link to={'/adicionar-produto'}>
                    <button
                        type='button'
                        data-mdb-ripple='true'
                        data-mdb-ripple-color='light'
                        className=' flex items-center mr-2 lg:mr-0 px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                    >
                        <RiAddFill size={18} />
                        Novo Produto
                    </button>
                </Link>
            </div>

            <div className='flex flex-col'>
                <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                        <div className='overflow-hidden'>
                            <table className='min-w-full mb-10'>
                                {products && (
                                    <thead className='font-bold text-gray-900 bg-white border-b'>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='px-6 py-4 text-sm text-left '
                                            ></th>
                                            <th scope='col' className='px-6 py-4 text-sm'>
                                                Nome
                                            </th>
                                            <th scope='col' className='px-6 py-4 text-sm'>
                                                Preço
                                            </th>

                                            <th scope='col' className='px-6 py-4 text-sm '>
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>
                                )}
                                {products &&
                                    products.map((product, index) => (
                                        <tbody>
                                            <tr
                                                className={` border-b ${
                                                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                                }`}
                                            >
                                                <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                                                    <Modal
                                                        id={'view' + `${product.id}`}
                                                        nameBtnOpen={<GrView size={18} />}
                                                        styleBtnOpen={
                                                            'inline-block p-2 mx-1 text-xs font-medium leading-tight uppercase transition duration-150 ease-in-out bg-gray-300 rounded shadow-md cursor-pointer hover:bg-gray-400 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg'
                                                        }
                                                    >
                                                        <div className='text-base sm:text-lg'>
                                                            <div className='whitespace-normal'>
                                                                <div className='flex justify-center'>
                                                                    <img
                                                                        className='object-cover bg-center rounded-lg'
                                                                        src={product.img_url}
                                                                        alt={product.name}
                                                                    />
                                                                </div>
                                                                <p className='mt-2 font-semibold uppercase'>
                                                                    {product.name}
                                                                </p>
                                                                <p>{product.description}</p>
                                                                <p className='mt-4 mb-2'>
                                                                    Preço:{' '}
                                                                    <span className='font-semibold '>
                                                                        {formatReal(product.price)}
                                                                    </span>
                                                                </p>
                                                                <p className='mb-2'>
                                                                    Quantidade:{' '}
                                                                    <span className='font-semibold '>
                                                                        {product.amount}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                </td>
                                                <td className='px-6 py-4 text-sm font-light text-center text-gray-900 whitespace-nowrap'>
                                                    {product.name}
                                                </td>

                                                <td className='px-6 py-4 text-sm font-light text-center text-gray-900 whitespace-nowrap'>
                                                    {formatReal(product.price)}
                                                </td>

                                                <td className='px-6 py-4 text-sm font-light text-center text-gray-900 whitespace-nowrap'>
                                                    <div className='flex justify-center'>
                                                        <Link
                                                            to={'/adicionar-produto'}
                                                            state={product}
                                                        >
                                                            <button
                                                                type='button'
                                                                className='inline-block p-2 mx-1 text-xs font-medium leading-tight text-white uppercase transition duration-150 ease-in-out bg-blue-500 rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
                                                            >
                                                                <FiEdit size={18} />
                                                            </button>
                                                        </Link>
                                                        <Modal
                                                            id={String(product.id)}
                                                            nameBtnOpen={
                                                                <RiDeleteBin2Line size={18} />
                                                            }
                                                            styleBtnOpen={
                                                                'inline-block p-2 mx-1 text-xs font-medium leading-tight text-white uppercase transition duration-150 ease-in-out bg-red-500 rounded shadow-md cursor-pointer hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg'
                                                            }
                                                            btnAction={'Sim'}
                                                            onClick={() =>
                                                                removeProduct(product.id)
                                                            }
                                                        >
                                                            <h3 className='text-lg font-bold'>
                                                                Ops!
                                                            </h3>
                                                            <p className='py-4'>
                                                                Deseja excluir o produto{' '}
                                                                <p className='font-semibold uppercase whitespace-normal'>
                                                                    {product.name}?
                                                                </p>
                                                            </p>
                                                        </Modal>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                            </table>

                            {products?.length === 0 && loading && (
                                <div className='mt-10'>
                                    <div className='text-lg font-semibold text-center '>
                                        Nenhum produto cadastrado!
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {!loading && (
                <>
                    <Spinner />
                </>
            )}
        </Header>
    );
};

export default Products;
