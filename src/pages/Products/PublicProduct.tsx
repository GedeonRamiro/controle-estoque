import { Link, useParams } from 'react-router-dom';
import { supabase } from 'services/supabase';
import { useToasts } from 'react-toast-notifications';
import { useEffect, useState } from 'react';
import useDebounce from 'components/useDebounce';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import React from 'react';

type ParamsId = {
    id: string;
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

type Config = {
    name: string;
    phone: string;
};

const PublicProduct = () => {
    const { addToast } = useToasts();

    const { id } = useParams<ParamsId>();
    const NUMBER_SHOW_MORE = 8;

    const [products, setProducts] = useState<Product[] | null>(null);
    const [productsCategory, setProductsCategory] = useState<Product[] | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [buttonCategoryAction, setButtonCategoryAction] = useState('');
    const [config, setConfig] = useState<Config | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSerachTerm] = useState('');
    const [filterProducts, setFilterProducts] = useState<Product[] | null>(null);
    const [numberFinaly, setNumberFinaly] = useState(NUMBER_SHOW_MORE);

    const showMore = async () => {
        const result =
            numberFinaly >= Number(productsCategory?.length)
                ? NUMBER_SHOW_MORE
                : numberFinaly + NUMBER_SHOW_MORE;

        setNumberFinaly(result);
    };

    const debouncedSearchTerm = useDebounce(searchTerm);

    const openWhatsapp = (product: Product, phone: number) => {
        const url = window.location.href;
        window.open(`https://api.whatsapp.com/send?phone=${`+55${phone}`}
                    &text='Olá, fiquei interessado no produto: 
                    ${product.name} - 
                    ${formatReal(product.price)} - 
                    ${url}'`);
    };

    const formatReal = (money: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(money);
    };

    const handleChangeSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSerachTerm(event.target.value);
    };

    const getProducts = async () => {
        const { data, error } = await supabase.from('product').select('*').eq('user_id', id);

        if (error) {
            setLoading(true);
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        }

        setProducts(data);
        setProductsCategory(data);
        setFilterProducts(data);
        setLoading(true);
    };

    const getCategories = async () => {
        const { data, error } = await supabase.from('category').select('*').eq('user_id', id);

        if (error) {
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        }

        setCategories(data);
        setLoading(true);
    };

    const getConfig = async () => {
        const { data, error } = await supabase.from('config').select('*').eq('user_id', id);

        if (error) {
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        }

        const resultConfig = data?.reduce((acc, value) => {
            return {
                name: value.name,
                phone: value.phone,
            };
        }, {});

        setConfig(resultConfig);
        setLoading(true);
    };

    const categoryAction = (Idcategory: number, category: string) => {
        setButtonCategoryAction(category);

        if (Idcategory === 0) {
            return setProductsCategory(products);
        }

        const resultProducts: any = products?.filter(
            (product) => product.category_id === Idcategory
        );
        setProductsCategory(resultProducts);
    };

    useEffect(() => {
        if (id) {
            getConfig();
            getCategories();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (id) {
            getProducts();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, debouncedSearchTerm, setFilterProducts]);

    useEffect(() => {
        setButtonCategoryAction('All');
        const result =
            products &&
            products.filter((productFilter) =>
                productFilter.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

        setProductsCategory(result);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterProducts]);

    return (
        <div className='container mx-auto'>
            <h1 className='p-2 mt-6 text-3xl font-bold text-center sm:mt-20 sm:text-4xl'>
                {config?.name}
            </h1>
            <div className='justify-between flex-1 mx-4 mt-10 sm:mx-0 sm:flex'>
                <h1 className='text-2xl border-b-4 border-green-500 sm:text-4xl w-min'>Produtos</h1>
                <input
                    type='text'
                    placeholder='Pesquisar...'
                    className='w-full my-4 sm:w-max input input-bordered sm:my-0'
                    onChange={handleChangeSearchTerm}
                />
            </div>

            <div className='flex justify-end mx-4 sm:hidden'>
                <select
                    onChange={(event) =>
                        categoryAction(
                            Number(event.target.selectedOptions[0].id),
                            event.target.value
                        )
                    }
                    className='max-w-xs select select-bordered'
                >
                    <option disabled selected>
                        Categorias
                    </option>
                    <option selected id={`${0}`}>
                        All
                    </option>
                    {categories &&
                        categories.map((category) => (
                            <option key={category.id} id={`${category.id}`} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className='justify-center hidden my-10 sm:flex'>
                {categories && categories.length > 6 ? (
                    <>
                        <select
                            onChange={(event) =>
                                categoryAction(
                                    Number(event.target.selectedOptions[0].id),
                                    event.target.value
                                )
                            }
                            className='w-full max-w-xs select select-bordered'
                        >
                            <option disabled selected>
                                Categorias
                            </option>
                            <option selected id={`${0}`}>
                                All
                            </option>
                            {categories &&
                                categories.map((category) => (
                                    <option
                                        key={category.id}
                                        id={`${category.id}`}
                                        value={category.name}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                    </>
                ) : (
                    <>
                        {categories && (
                            <button
                                onClick={() => categoryAction(0, 'All')}
                                className={`tab tab-bordered ${
                                    buttonCategoryAction === 'All' || buttonCategoryAction === ''
                                        ? 'tab-active'
                                        : ''
                                }`}
                            >
                                All
                            </button>
                        )}
                        {categories &&
                            categories.map((category) => (
                                <div className='tabs' key={category.id}>
                                    <button
                                        onClick={() => categoryAction(category.id, category.name)}
                                        className={`tab tab-bordered ${
                                            buttonCategoryAction === category.name
                                                ? 'tab-active'
                                                : ''
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                </div>
                            ))}
                    </>
                )}
            </div>
            <div className='grid gap-10 my-4 lg:gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
                {productsCategory &&
                    productsCategory
                        .map((product) => (
                            <div key={product.id}>
                                <label htmlFor={`my-modal${product.id}`} className='cursor-pointer'>
                                    <div className='mx-4 shadow-xl sm:mx-0 card bg-base-100'>
                                        <div className='w-full h-80 avatar'>
                                            <img src={product.img_url} alt={product.name} />
                                        </div>
                                        <div className='text-center card-body'>
                                            <h2 className='card-title'>{product.name}</h2>
                                            <p className='font-semibold'>
                                                {' '}
                                                {formatReal(product.price)}
                                            </p>
                                        </div>
                                    </div>
                                </label>
                                <input
                                    type='checkbox'
                                    id={`my-modal${product.id}`}
                                    className='modal-toggle'
                                />
                                <div className='flex items-center px-4 modal'>
                                    <div className=' modal-box'>
                                        <img
                                            className='rounded-t-lg'
                                            src={product.img_url}
                                            alt={product.name}
                                        />
                                        <h3 className='mt-4 text-lg font-bold'>{product.name}</h3>
                                        <p className='py-4'>{product.description}</p>
                                        <p className='text-2xl font-semibold'>
                                            {' '}
                                            {formatReal(product.price)}{' '}
                                        </p>
                                        <div className='modal-action'>
                                            <a href={`#`}>
                                                <label
                                                    htmlFor={`my-modal${product.id}`}
                                                    className='btn-success btn btn-sm sm:btn btn-outline sm:btn-outline'
                                                >
                                                    Cancelar
                                                </label>
                                            </a>
                                            <button
                                                onClick={() =>
                                                    openWhatsapp(product, Number(config?.phone))
                                                }
                                                className='btn btn-active btn-accent btn-sm sm:btn'
                                            >
                                                <AiOutlineWhatsApp className='text-xl sm:text-2xl' />
                                                <p className='ml-2'>Fazer Pedido</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        .slice(0, numberFinaly)}
            </div>

            {productsCategory && (
                <div
                    className={`flex justify-center my-10 ${
                        productsCategory.length <= NUMBER_SHOW_MORE && 'hidden'
                    }`}
                >
                    <button onClick={showMore} className='btn btn-outline'>
                        {numberFinaly >= Number(productsCategory?.length)
                            ? ' Mostrar Menos'
                            : ' Ver mais produtos'}
                    </button>
                </div>
            )}

            {productsCategory?.length === 0 && loading && (
                <h4 className='mb-10 text-lg font-semibold text-center'>Lista vazia!</h4>
            )}
            {!loading && (
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <button className='btn btn-sm btn-ghost loading'>loading</button>
                </div>
            )}
        </div>
    );
};

export default PublicProduct;
