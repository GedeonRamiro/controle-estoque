import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useState } from 'react';
import { supabase } from 'services/supabase';
import Account from 'components/Account';

type Inputs = {
    email: string;
    password: string;
};

export type User = {
    id: string;
    email: string;
    user_metadata: {
        name: string;
    };
};

const schema = yup
    .object({
        email: yup.string().email('E-mail inválido').required('O email é obrigatório'),
        password: yup
            .string()
            .min(8, 'Senha deve ter pelo menos 8 caracteres')
            .required('O passoword é obrigatório'),
    })
    .required();

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { addToast } = useToasts();

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

        const { error } = await supabase.auth.signIn(data);

        if (error) {
            addToast(error.message, { appearance: 'error', autoDismiss: true });
        } else {
            addToast('Login feito com sucesso!', {
                appearance: 'success',
                autoDismiss: true,
            });
            reset({ email: '', password: '' });
            navigate('/');
        }

        setLoading(false);
    };

    return (
        <Account
            buttonAccountPage='Criar Conta'
            textAccountPage='Não tem uma conta?'
            linkAccountPage='/create-account'
            textFrom='Por favor entre na sua conta'
        >
            <form onSubmit={handleSubmit(onSubmit)} className=''>
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
                            <span>Entrar</span>
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

export default Login;
