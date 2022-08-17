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
import Spinner from 'components/Spinner';
import ButtonFormAction from 'components/ButtonFormAction/ButtonFormAction';

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
        setLoading(false);

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
        setLoading(true);
    };

    const editConfig: SubmitHandler<Inputs> = async (editConfig: Inputs) => {
        setLoading(false);

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
        setLoading(true);
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
                    className='mx-2 mt-4 sm:mt-10'
                >
                    <label className='text-center label'>
                        <span className='font-bold uppercase mb-7'> Configurações da Loja </span>
                    </label>
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

                    <div className='mb-3 form-floating '>
                        <CurrencyFormat
                            className='form-control block
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
                            value={phone}
                            onValueChange={(values: any) => {
                                const { formattedValue, floatValue, value } = values;
                                String(setPhone(value));
                            }}
                            format='(##) #####-####'
                            mask='_'
                            id='floatingInput'
                            placeholder='Telefone'
                        />

                        <label htmlFor='floatingInput' className='text-gray-700'>
                            Telefone
                        </label>
                    </div>

                    <ButtonFormAction link={'/'} state={configDB} loading={!loading} />
                </form>
            )}
            {!loading && (
                <>
                    <Spinner />
                </>
            )}
        </Header>
    );
};

export default ConfigStore;
