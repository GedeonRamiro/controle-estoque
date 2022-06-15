import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useState } from 'react';
import { supabase } from '../../services/supabase';
import { useNavigate } from 'react-router-dom';
import Account from 'components/Account';

type Inputs = {
    name: string;
    email: string;
    password: string;
};

const schema = yup
    .object({
        name: yup.string().required('O nome é obrigatório'),
        email: yup.string().email('E-mail inválido').required('O email é obrigatório'),
        password: yup
            .string()
            .min(8, 'Senha no mímino 8 caracteres')
            .required('O passoword é obrigatório'),
    })
    .required();

const CreateAccount = () => {
    const navigate = useNavigate();

    const { addToast } = useToasts();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        setLoading(true);

        const { error } = await supabase.auth.signUp(
            {
                email: data.email,
                password: data.password,
            },
            {
                data: {
                    name: data.name,
                },
            }
        );

        if (error) {
            addToast(error?.message, { appearance: 'error', autoDismiss: true });
        } else {
            await supabase.auth.signOut();
            addToast('Usuário cadastrado com sucesso!', {
                appearance: 'success',
                autoDismiss: true,
            });
            reset({ name: '', email: '', password: '' });
            navigate('/login');
        }

        setLoading(false);
    };

    return (
        <Account
            buttonAccountPage='Entar'
            textAccountPage='Já tem conta? Entar agora'
            linkAccountPage='/login'
            textFrom='Crie sua conta agora mesmo'
        >
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                <div className='mb-4'>
                    {errors.name?.message && (
                        <p className='text-sm text-red-500 '>* {errors.name?.message}</p>
                    )}
                    <input
                        type='text'
                        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none'
                        id='exampleFormControlInput1'
                        placeholder='nome'
                        {...register('name')}
                    />
                </div>
                <div className='mb-4'>
                    {errors.email?.message && (
                        <p className='text-sm text-red-500 '>* {errors.email?.message}</p>
                    )}
                    <input
                        type='text'
                        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none'
                        id='exampleFormControlInput1'
                        placeholder='email'
                        {...register('email')}
                    />
                </div>

                {errors.password?.message && (
                    <p className='text-sm text-red-500'>* {errors.password?.message}</p>
                )}
                <div className='mb-4'>
                    <input
                        type='password'
                        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none'
                        id='exampleFormControlInput1'
                        placeholder='senha'
                        {...register('password')}
                    />
                </div>
                <div className='pt-1 pb-1 mb-12 text-center'>
                    <button
                        className='inline-block px-6 py-2.5 disabled:opacity-75 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                        type='submit'
                        data-mdb-ripple='true'
                        data-mdb-ripple-color='light'
                        style={{
                            background:
                                'linear-gradient(to right, #68b4ee, #4a92eb, #2275da, #0d5ab8)',
                        }}
                        disabled={loading}
                    >
                        {!loading ? (
                            <span>Criar Conta</span>
                        ) : (
                            <>
                                <span>Carregando...</span>
                                <div
                                    className='absolute inline-block w-4 h-4 rounded-full border-1 spinner-border animate-spin'
                                    role='status'
                                ></div>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Account>
    );
};

export default CreateAccount;
