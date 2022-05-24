import Header from 'components/Header';
import { useEffect, useState } from 'react';
import { supabase } from 'services/supabase';
import { useAuth } from '../../context/auth';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin2Line, RiAddFill } from 'react-icons/ri';
import { AiOutlineMore } from 'react-icons/ai';
import Spinner from 'components/Spinner';

type Category = {
    created_at: Date;
    id: number;
    name: string;
    user_id: string;
};

const Categoty = () => {
    const { addToast } = useToasts();

    const auth = useAuth();

    const [categories, setCategories] = useState<Category[] | null>(null);
    const [loading, setLoading] = useState(false);

    const getCategories = async () => {
        const { data, error } = await supabase
            .from('category')
            .select('*')
            .eq('user_id', auth.user.id);

        if (error) {
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        }

        setCategories(data);
        setLoading(true);
    };

    const removeCategory = async (id: number) => {
        const { data, error } = await supabase.from('category').delete().match({ id: id });

        const dataDelete = categories?.filter((item) => item.id !== data?.[0].id);
        setCategories(dataDelete ?? categories);

        if (error) {
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        }

        addToast('Categoria excluida com sucesso!', { appearance: 'success', autoDismiss: true });
    };

    useEffect(() => {
        if (auth.user.id) {
            getCategories();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (
        <Header>
            {/*   <div className='flex flex-col'>
                <div>
                    <Link to={'/adicionar-categoria'}>
                        <button className='my-10 btn btn-block sm:btn-wide btn-sm'>
                            Nova Categoria
                        </button>
                    </Link>
                </div>
                <div className='w-full'>
                    <div className='flex border-b border-gray-200 shadow'>
                        <table className='w-full'>
                            {categories && (
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='px-6 py-2 text-xs text-gray-500'>
                                            Categorias
                                        </th>
                                        <th className='px-6 py-2 text-xs text-gray-500'>Ação</th>
                                    </tr>
                                </thead>
                            )}
                            {categories &&
                                categories.map((category) => (
                                    <tbody
                                        key={category.id}
                                        className='text-center bg-white border'
                                    >
                                        <tr className='whitespace-nowrap'>
                                            <td className='px-6 py-4'>
                                                <div className='text-sm font-semibold text-gray-900'>
                                                    {category.name}
                                                </div>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <Link to={'/adicionar-categoria'} state={category}>
                                                    <button className='p-2 mx-1 text-white bg-blue-500 border-2 border-blue-600 rounded shadow-lg'>
                                                        <FiEdit />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => removeCategory(category.id)}
                                                    className='p-2 mx-1 text-white bg-red-500 border-2 border-red-700 rounded shadow-lg'
                                                >
                                                    <RiDeleteBin2Line />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            {categories?.length === 0 && loading && (
                                <div className='flex flex-col items-center'>
                                    <div className='mb-10 text-lg font-semibold text-center'>
                                        Lista vazia!
                                    </div>
                                </div>
                            )}
                        </table>
                    </div>
                </div>
            </div>
            
 */}
            <div className='flex justify-end my-4 space-x-2'>
                <Link to={'/adicionar-categoria'}>
                    <button
                        type='button'
                        data-mdb-ripple='true'
                        data-mdb-ripple-color='light'
                        className=' flex items-center mr-2 lg:mr-0 px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                    >
                        <RiAddFill size={18} />
                        Nova Categoria
                    </button>
                </Link>
            </div>

            <div className='flex flex-col'>
                <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                        <div className='overflow-hidden'>
                            <table className='min-w-full'>
                                {categories && (
                                    <thead className='font-bold text-gray-900 bg-white border-b'>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='px-6 py-4 text-sm text-left '
                                            >
                                                #
                                            </th>
                                            <th scope='col' className='px-6 py-4 text-sm'>
                                                Nome
                                            </th>
                                            <th scope='col' className='px-6 py-4 text-sm '>
                                                Menu
                                            </th>
                                        </tr>
                                    </thead>
                                )}
                                {categories &&
                                    categories.map((category, index) => (
                                        <tbody>
                                            <tr
                                                className={` border-b ${
                                                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                                }`}
                                            >
                                                <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                                                    {index + 1}
                                                </td>
                                                <td className='px-6 py-4 text-sm font-light text-center text-gray-900 whitespace-nowrap'>
                                                    {category.name}
                                                </td>
                                                <td className='px-6 py-4 text-sm font-light text-center text-gray-900 whitespace-nowrap'>
                                                    <div className='flex justify-center'>
                                                        <div>
                                                            <div className='relative dropdown'>
                                                                <button
                                                                    className=' dropdown-toggle'
                                                                    type='button'
                                                                    id='dropdownMenuButton1'
                                                                    data-bs-toggle='dropdown'
                                                                    aria-expanded='false'
                                                                >
                                                                    <AiOutlineMore size={24} />
                                                                </button>
                                                                <ul
                                                                    className='absolute z-50 hidden float-left py-2 m-0 mt-1 text-base text-left list-none bg-white border-none rounded-lg shadow-lg dropdown-menu min-w-max bg-clip-padding'
                                                                    aria-labelledby='dropdownMenuButton1'
                                                                >
                                                                    <h6 className='block w-full px-4 py-2 text-sm font-semibold text-gray-500 uppercase bg-transparent '>
                                                                        {category.name}
                                                                    </h6>
                                                                    <li>
                                                                        <Link
                                                                            to={
                                                                                '/adicionar-categoria'
                                                                            }
                                                                            state={category}
                                                                        >
                                                                            <a
                                                                                className='flex items-center w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100'
                                                                                href='#'
                                                                            >
                                                                                <FiEdit />
                                                                                <span className='ml-1'>
                                                                                    Editar
                                                                                </span>
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            className='flex items-center w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100'
                                                                            href='#'
                                                                        >
                                                                            <RiDeleteBin2Line
                                                                                size={16}
                                                                            />
                                                                            <span className='ml-1'>
                                                                                Excluir
                                                                            </span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                            </table>
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

export default Categoty;
