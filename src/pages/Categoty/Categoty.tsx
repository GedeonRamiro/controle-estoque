import Header from 'components/Header';
import { useEffect, useState } from 'react';
import { supabase } from 'services/supabase';
import { useAuth } from '../../context/auth';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin2Line, RiAddFill } from 'react-icons/ri';
import Spinner from 'components/Spinner';
import Modal from 'components/Modal';

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
                                                Ações
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
                                                        <Link
                                                            to={'/adicionar-categoria'}
                                                            state={category}
                                                        >
                                                            <button
                                                                type='button'
                                                                className='inline-block p-2 mx-1 text-xs font-medium leading-tight text-white uppercase transition duration-150 ease-in-out bg-blue-500 rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
                                                            >
                                                                <FiEdit size={18} />
                                                            </button>
                                                        </Link>
                                                        <Modal
                                                            id={String(category.id)}
                                                            nameBtnOpen={
                                                                <RiDeleteBin2Line size={18} />
                                                            }
                                                            styleBtnOpen={
                                                                'inline-block p-2 mx-1 text-xs font-medium leading-tight text-white uppercase transition duration-150 ease-in-out bg-red-500 rounded shadow-md cursor-pointer hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg'
                                                            }
                                                            btnAction={'Sim'}
                                                            onClick={() =>
                                                                removeCategory(category.id)
                                                            }
                                                        >
                                                            <h3 className='text-lg font-bold'>
                                                                Ops!
                                                            </h3>
                                                            <p className='py-4'>
                                                                Deseja excluir a categoria{' '}
                                                                <span className='font-semibold uppercase'>
                                                                    {category.name}?
                                                                </span>
                                                            </p>
                                                        </Modal>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                            </table>

                            {categories?.length === 0 && loading && (
                                <div className='mt-10'>
                                    <div className='text-lg font-semibold text-center '>
                                        Nenhuma categoria cadastrada!
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

export default Categoty;
