import Header from 'components/Header';
import { useEffect, useState } from 'react';
import { supabase } from 'services/supabase';
import { useAuth } from '../../context/auth';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin2Line } from 'react-icons/ri';

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
            <div className='container mx-auto'>
                <div className='flex flex-col'>
                    <Link to={'/adicionar-categoria'}>
                        <button className='my-10 btn btn-block sm:btn-wide btn-sm'>
                            Nova Categoria
                        </button>
                    </Link>
                    <div className='w-full'>
                        <div className='flex border-b border-gray-200 shadow'>
                            <table className='w-full'>
                                {categories && (
                                    <thead className='bg-gray-50'>
                                        <tr>
                                            <th className='px-6 py-2 text-xs text-gray-500'>
                                                Categorias
                                            </th>
                                            <th className='px-6 py-2 text-xs text-gray-500'>
                                                Ação
                                            </th>
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
                                                    <Link
                                                        to={'/adicionar-categoria'}
                                                        state={category}
                                                    >
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
            </div>
            {!loading && (
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <button className='btn btn-sm btn-ghost loading'>loading</button>
                </div>
            )}
        </Header>
    );
};

export default Categoty;
