import Header from 'components/Header';
import { useAuth } from 'context/auth';
import { supabase } from 'services/supabase';
import { useToasts } from 'react-toast-notifications';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { config } from 'process';
import { Link, useNavigate } from 'react-router-dom';

type Inputs = {
    name: string;
    phone: string;
};

type Config = {
    created_at: Date;
    id: number;
    name: string;
    phone: string;
    user_id: string;
};

const schema = yup
    .object({
        name: yup.string().required('Campo obrigatório'),
        //phone: yup.number().required('Campo obrigatório'),
    })
    .required();

const ConfigStore = () => {
    const { addToast } = useToasts();
    const auth = useAuth();
    const navigate = useNavigate();
    const CurrencyFormat = require('react-currency-format');

    const {
        user: { id },
    } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const [configDB, setconfigDB] = useState<Config[] | null>(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const getConfig = async () => {
        const { data, error } = await supabase
            .from('config')
            .select('*')
            .eq('user_id', auth.user.id);

        if (error) {
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        }

        data?.map((config) => {
            setName(config?.name);
            setPhone(config?.phone);
        });

        setconfigDB(data);
        setLoading(true);
    };

    const createConfig: SubmitHandler<Inputs> = async (dataConfig: Inputs) => {
        const { error } = await supabase
            .from('config')
            .insert({ ...dataConfig, phone, user_id: id })
            .single();

        if (error) {
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        } else {
            addToast('Configuração salva com sucesso!', {
                appearance: 'success',
                autoDismiss: true,
            });
            navigate('/');
        }
    };

    const editConfig: SubmitHandler<Inputs> = async (editConfig: Inputs) => {
        const { error } = await supabase
            .from('config')
            .update({ ...editConfig, phone })
            .eq(
                'id',
                configDB?.map((idConfig) => idConfig.id)
            );

        if (error) {
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        } else {
            addToast('Configuração atualizada com sucesso!', {
                appearance: 'success',
                autoDismiss: true,
            });
            navigate('/');
        }
    };

    useEffect(() => {
        if (auth.user.id) {
            getConfig();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (
        <Header>
            {loading && (
                <form
                    onSubmit={handleSubmit(configDB?.length ? editConfig : createConfig)}
                    className='form-control'
                >
                    <label className='text-center label'>
                        <span className='font-bold uppercase mb-7'> Configurações da Loja </span>
                    </label>
                    <label className='flex label'>
                        <span className='label-text'>Nome</span>
                        {errors.name?.message && (
                            <p className='text-sm text-red-500 '>* {errors.name?.message}</p>
                        )}
                    </label>
                    <input
                        type='text'
                        placeholder='nome'
                        className='mb-2 input input-bordered'
                        {...register('name')}
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                    />
                    <label className='mt-2 label'>
                        <span className='label-text'>Telefone</span>
                        {errors.phone?.message && (
                            <p className='absolute mt-10 text-sm text-red-500'>
                                * {errors.phone?.message}
                            </p>
                        )}
                    </label>
                    {/*  <input 
                    type="text" 
                    placeholder='Telefone'
                    className="input input-bordered" {...register('phone')}
                    onChange={event => setPhone(event.target.value)}
                    value={phone}
                /> */}
                    <CurrencyFormat
                        placeholder='Telefone'
                        className='input input-bordered'
                        value={phone}
                        onValueChange={(values: any) => {
                            const { formattedValue, floatValue, value } = values;
                            String(setPhone(value));
                        }}
                        format='(##) #####-####'
                        mask='_'
                    />
                    <div className='my-4 sm:flex'>
                        {loading ? (
                            <button
                                type='submit'
                                className='mb-2 mr-6 btn-block btn sm:btn-wide btn-sm'
                            >
                                {configDB?.length ? 'Atualizar' : 'Salvar'}
                            </button>
                        ) : (
                            <button
                                type='submit'
                                className='mb-2 mr-6 btn-block btn sm:btn-wide btn-sm loading disabled'
                            ></button>
                        )}
                        <Link to={'/'}>
                            <button
                                type='submit'
                                className='mr-6 btn-block btn btn-outline sm:btn-wide btn-sm'
                            >
                                Cancelar
                            </button>
                        </Link>
                    </div>
                </form>
            )}
            {!loading && (
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <button className='btn btn-sm btn-ghost loading'>loading</button>
                </div>
            )}
        </Header>
    );
};

export default ConfigStore;
