import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useState } from 'react';
import { supabase } from 'services/supabase';

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
            addToast('Login feito com sucesso!', { appearance: 'success', autoDismiss: true });
            reset({ email: '', password: '' });
            navigate('/');
        }

        setLoading(false);
    };

    return (
        <div className='min-h-screen hero bg-base-200'>
            <div className='flex-col justify-center hero-content lg:flex-row'>
                <div className='text-center lg:text-left'>
                    <h1 className='mb-5 text-3xl font-bold md:text-5xl '>Controle de estoque</h1>
                    <p className='mb-5'>
                        O controle de estoque PB ou controlo de stockPE é uma área muito importante
                        de uma empresa, grande ou pequena.
                    </p>
                </div>
                <div className='flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100'>
                    <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Email</span>
                                {errors.email?.message && (
                                    <p className='text-sm text-red-500'>
                                        * {errors.email?.message}
                                    </p>
                                )}
                            </label>
                            <input
                                type='text'
                                placeholder='Nome'
                                className='input input-bordered'
                                {...register('email')}
                            />
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Senha</span>
                                {errors.password?.message && (
                                    <p className='text-sm text-red-500'>
                                        * {errors.password?.message}
                                    </p>
                                )}
                            </label>
                            <input
                                type='password'
                                placeholder='Senha'
                                className='input input-bordered'
                                {...register('password')}
                            />
                            <label className='label'>
                                <a href='#' className='label-text-alt'>
                                    Esqueceu a senha?
                                </a>
                            </label>
                        </div>
                        <div className='mt-6 form-control'>
                            {!loading ? (
                                <button type='submit' className='btn btn-accent '>
                                    Login
                                </button>
                            ) : (
                                <button
                                    type='submit'
                                    className='btn btn-accent loading disabled'
                                ></button>
                            )}
                            <Link to={'/create-account'} className='pt-4 text-center'>
                                <span className='link link-accent'>
                                    Ainda não tem conta? Criar Conta
                                </span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
