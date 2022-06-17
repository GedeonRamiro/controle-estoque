import Header from 'components/Header';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useAuth } from 'context/auth';
import { useToasts } from 'react-toast-notifications';
import { supabase } from 'services/supabase';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const dataDoughnut = {
    labels: ['Camisa', 'Sapato', 'Bermuda', 'Calça Jeans'],
    datasets: [
        {
            label: 'My First Dataset',
            data: [300, 50, 100, 34],
            backgroundColor: [
                'rgb(133, 105, 1)',
                'rgb(164, 101, 2)',
                'rgb(101, 143, 3)',
                'rgb(177, 34, 90)',
            ],
            hoverOffset: 4,
        },
    ],
};

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = [
    'Camisa',
    'Sapato',
    'Bermuda',
    'Calça Jeans',
    'Camisa',
    'Sapato',
    'Bermuda',
    'Calça Jeans',
];

export const dataBar = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [120, 65, 80, 70, 120, 65, 80, 70],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [67, 23.5, 67, 12, 120, 65, 80, 70],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

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

type Category = {
    created_at: Date;
    id: number;
    name: string;
    user_id: string;
};

const Home = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [loading, setLoading] = useState(false);

    const auth = useAuth();
    const { addToast } = useToasts();

    const resultProducts = products?.map((product) => product.category_id);
    console.log('resultProducts:', resultProducts);

    const resultCategories = categories?.map((category) => {
        const result = {
            category: category.name,
            id: category.id,
        };

        return result;
    });

    console.log('resultCategories:', resultCategories);

    const resultCharts = resultCategories?.map((resultC) => {
        const result = {
            category: resultC.category,
            quantidadeproduto: resultProducts?.map((product) => product === resultC.id),
        };

        return result;
    });

    console.log('resultCharts:', resultCharts);

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

    console.log(categories);

    useEffect(() => {
        if (auth.user.id) {
            getProducts();
            getCategories();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (
        <Header>
            <div className='pb-6 bg-gray-100'>
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

                <div className='max-w-6xl p-6 mx-auto mt-0 bg-white rounded-lg shadow-lg sm:mt-10'>
                    <h5 className='py-3 mb-2 text-xl font-medium leading-tight text-center text-gray-900 uppercase border-b border-gray-300'>
                        categorias/Produtos
                    </h5>
                    <Doughnut data={dataDoughnut} />
                </div>

                <div className='max-w-6xl p-6 mx-auto mt-2 bg-white rounded-lg shadow-lg sm:mt-10 '>
                    <h5 className='py-3 mb-2 text-xl font-medium leading-tight text-center text-gray-900 uppercase border-b border-gray-300'>
                        Barato/Caro
                    </h5>
                    <Bar options={options} data={dataBar} />
                </div>
            </div>
        </Header>
    );
};

export default Home;
