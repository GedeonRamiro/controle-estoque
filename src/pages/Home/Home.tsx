import Header from 'components/Header';
import { useEffect, useState } from 'react';
import { useAuth } from 'context/auth';
import { useToasts } from 'react-toast-notifications';
import { supabase } from 'services/supabase';
import Spinner from 'components/Spinner';
import DoughnutComponent from 'components/Chart/DoughnutComponent';
import BarComponent from 'components/Chart/BarComponent';
import { Product, Category } from 'types/types';

const Home = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [loading, setLoading] = useState(false);

    const auth = useAuth();
    const { addToast } = useToasts();

    const resultProducts = products?.map((product) => {
        const result = {
            name: product.name,
            price: product.price,
            category: categories
                ?.filter((cat) => cat.id === product.category_id)
                .map((category) => category.name)
                .join('') as string,
        };

        return result;
    });

    const produtosAgrupadosProcategorias = resultProducts
        ?.map((product) => {
            const result = {
                category: product.category,
                price: resultProducts
                    .filter((category) => category.category === product.category)
                    .map((price) => price.price),
                quantidadDeProdutos: resultProducts.filter(
                    (category) => category.category === product.category
                ).length,
            };

            return result;
        })
        .filter(
            (produto, index, array) =>
                index === array.findIndex((item) => item.category === produto.category)
        );

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

    useEffect(() => {
        if (auth.user.id) {
            getProducts();
            getCategories();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (
        <Header>
            {products && categories && (
                <>
                    <div className=''>
                        <div className='pt-1 sm:pt-10 sm:flex sm:justify-evenly'>
                            <div className='block w-full p-6 mx-0 my-2 bg-white rounded-lg shadow-lg sm:mx-4 sm:my-0'>
                                <h5 className='py-3 mb-2 text-lg font-medium leading-tight text-gray-900 uppercase border-b border-gray-300 sm:text-xl'>
                                    Total de categorias
                                </h5>
                                <p className='mb-4 text-2xl text-gray-700 sm:text-3xl'>
                                    {categories?.length}
                                </p>
                            </div>

                            <div className='block w-full p-6 mx-0 my-2 bg-white rounded-lg shadow-lg sm:mx-4 sm:my-0'>
                                <h5 className='py-3 text-lg font-medium leading-tight text-gray-900 uppercase border-b border-gray-300 sm:text-xl'>
                                    Total de produtos
                                </h5>
                                <p className='mb-4 text-2xl text-gray-700 sm:text-3xl'>
                                    {products?.length}
                                </p>
                            </div>
                        </div>
                        {products.length > 0 && categories.length > 0 && (
                            <>
                                <div className='max-w-6xl p-6 mx-auto mt-0 bg-white rounded-lg shadow-lg sm:mt-10'>
                                    <h5 className='py-3 mb-2 text-xl font-medium leading-tight text-center text-gray-900 uppercase border-b border-gray-300'>
                                        Categorias/Produtos
                                    </h5>
                                    <DoughnutComponent dataChart={produtosAgrupadosProcategorias} />
                                </div>

                                <div className='max-w-6xl p-6 mx-auto mt-2 bg-white rounded-lg shadow-lg sm:mt-10 '>
                                    <h5 className='py-3 mb-2 text-xl font-medium leading-tight text-center text-gray-900 uppercase border-b border-gray-300'>
                                        Maior Preço x Menor Preço
                                    </h5>
                                    <BarComponent dataChart={produtosAgrupadosProcategorias} />
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
            {!loading && (
                <>
                    <Spinner />
                </>
            )}
        </Header>
    );
};

export default Home;
