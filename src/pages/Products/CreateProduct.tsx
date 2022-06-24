import Header from 'components/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router';
import { useAuth } from 'context/auth';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from 'services/supabase';
import { FaUpload } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import ButtonFormAction from 'components/ButtonFormAction/ButtonFormAction';
import { Category } from 'types/types';

type LocationState = {
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

type Inputs = {
    id: string;
    img_url: {};
    name: string;
    description: string;
    amount: number;
    price: number;
    category_id: number;
};

const schema = yup
    .object({
        //img_url: yup.string().required('Campo foto obrigatório'),
        name: yup.string().required('Campo nome obrigatório'),
        description: yup.string().required('Campo descrição obrigatório'),
        amount: yup.number().typeError('Campo quantidade obrigatório'),
        price: yup.number().typeError('Campo preço obrigatório'),
        category_id: yup.number().typeError('Campo categoria obrigatório'),
    })
    .required();

const CreateProduct = () => {
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;
    const CurrencyFormat = require('react-currency-format');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const {
        user: { id },
    } = useAuth();

    const auth = useAuth();

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [name, setName] = useState(state ? state.name : '');
    const [description, setDescription] = useState(state ? state.description : '');
    const [amount, setAmount] = useState(state ? state.amount : '');
    const [price, setPrice] = useState(state ? state.price : '');
    const [categoryId, setCategoryId] = useState(state ? state.category_id : '');
    const [file, setFile] = useState<File>({} as File);
    const [imageURL, setImageURL] = useState<string | ''>('');

    const getCategories = async () => {
        const { data, error } = await supabase
            .from('category')
            .select('*')
            .eq('user_id', auth.user.id);

        if (error) {
            addToast(error.message, { appearance: 'error', autoDismiss: true });
        }

        setCategories(data);
    };

    const up = (e: any) => {
        setFile(e.target.files[0]);
    };

    const createProduct = async (dataForm: Inputs) => {
        setLoading(true);

        const fileName = uuidv4();
        const { data } = await supabase.storage.from('products').upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

        setImageURL(String(data?.Key));

        const { publicURL } = supabase.storage.from('products').getPublicUrl(imageURL);

        const { error } = await supabase
            .from('product')
            .insert({ ...dataForm, price, user_id: id, img_url: publicURL + `${fileName}` })
            .single();

        if (error) {
            setLoading(false);
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        } else {
            addToast('Produto criado com sucesso!', { appearance: 'success', autoDismiss: true });
            reset({ name: '' });
            navigate('/produtos');
        }
        setLoading(false);
    };

    const editProduct: SubmitHandler<Inputs> = async (dataEdit: Inputs) => {
        setLoading(true);

        const { error } = await supabase
            .from('product')
            .update({ ...dataEdit, price })
            .eq('id', state.id);

        if (error) {
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        } else {
            addToast('Produto atualizado com sucesso!', {
                appearance: 'success',
                autoDismiss: true,
            });
            navigate('/produtos');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (auth.user.id) {
            getCategories();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (
        <Header>
            <form
                onSubmit={handleSubmit(state ? editProduct : createProduct)}
                className='mx-2 mt-4 form-control sm:mt-10'
            >
                <label className='text-center label'>
                    <span className='font-bold uppercase mb-7'>
                        {' '}
                        {state ? 'Editar' : 'Novo'} Produto{' '}
                    </span>
                </label>
                {state ? (
                    <img
                        src={state.img_url}
                        alt={state.name}
                        className='w-full mb-10 rounded-lg shadow-2xl'
                    />
                ) : (
                    <>
                        <div className='flex items-center justify-center my-4 bg-grey-lighter'>
                            <label className='flex flex-col items-center w-full px-4 py-6 tracking-widest text-gray-500 uppercase bg-gray-100 border rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white'>
                                <FaUpload size={24} />
                                <span className='mt-2 text-sm leading-normal'>carregar imagem</span>
                                <input
                                    accept='image/png, image/jpeg'
                                    type='file'
                                    name='image'
                                    className='hidden'
                                    onChange={up}
                                />
                            </label>
                        </div>
                        {file.name && (
                            <img
                                className='w-full mb-10 rounded-lg shadow-2xl'
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                            />
                        )}
                    </>
                )}

                <label className='flex label'>
                    {errors.name?.message && (
                        <p className='text-sm text-red-500 '>* {errors.name?.message}</p>
                    )}
                </label>
                <div className='mb-3 form-floating '>
                    <input
                        type='text'
                        {...register('name')}
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                        className='
                                form-control block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        id='floatingInput'
                        placeholder='Nome'
                    />
                    <label htmlFor='floatingInput' className='text-gray-700'>
                        Nome
                    </label>
                </div>

                <label className='label'>
                    {errors.description?.message && (
                        <p className='text-sm text-red-500 '>* {errors.description?.message}</p>
                    )}
                </label>

                <div className='mb-3 form-floating '>
                    <textarea
                        {...register('description')}
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                        className=' block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        rows={3}
                        placeholder='Descrição do Produto'
                    ></textarea>
                </div>

                <label className='flex label'>
                    {errors.amount?.message && (
                        <p className='text-sm text-red-500 '>* {errors.amount?.message}</p>
                    )}
                </label>
                <div className='mb-3 form-floating '>
                    <input
                        type='text'
                        {...register('amount')}
                        onChange={(event) => setAmount(event.target.value)}
                        value={amount}
                        className='
                                form-control block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        id='floatingInput'
                        placeholder='Quantidade'
                    />
                    <label htmlFor='floatingInput' className='text-gray-700'>
                        Quantidade
                    </label>
                </div>

                <label className='flex label'>
                    {errors.price?.message && (
                        <p className='text-sm text-red-500 '>* {errors.price?.message}</p>
                    )}
                </label>
                <div className='mb-3 form-floating '>
                    <CurrencyFormat
                        className='
                                form-control block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        id='floatingInput'
                        onValueChange={(values: any) => {
                            const { formattedValue, floatValue, value } = values;
                            Number(setPrice(floatValue));
                        }}
                        thousandSeparator={true}
                        prefix={'R$ '}
                        value={price ? price : ''}
                        placeholder='Preço'
                    />
                    <label htmlFor='floatingInput' className='text-gray-700'>
                        Preço
                    </label>
                </div>

                {categories?.length !== 0 && categories !== null && (
                    <>
                        <label className='label'>
                            <span className='label-text'>Selecione a categoria</span>
                        </label>

                        <div className='flex justify-center'>
                            <div className='w-full mb-3'>
                                <select
                                    {...register('category_id')}
                                    onChange={(event) => setCategoryId(event.target.value)}
                                    value={categoryId}
                                    className='block w-full px-3 py-4 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white bg-no-repeat border border-gray-300 border-solid rounded appearance-none form-select bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                    aria-label='Default select example'
                                >
                                    {categories &&
                                        categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <ButtonFormAction link={'/produtos'} state={state} loading={loading} />
                    </>
                )}
                {categories?.length === 0 && (
                    <>
                        <h3 className='my-4 font-semibold text-center'>
                            Nenhuma Categoria Cadastrada
                        </h3>
                        <Link to={'/adicionar-categoria'}>
                            <button className='mb-2 mr-6 btn-block btn btn-sm'>
                                Criar Categoria
                            </button>
                        </Link>
                    </>
                )}
            </form>
        </Header>
    );
};

export default CreateProduct;
