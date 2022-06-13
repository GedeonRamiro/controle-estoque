import Header from 'components/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from 'context/auth';
import { supabase } from 'services/supabase';
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ButtonFormAction from 'components/ButtonFormAction/ButtonFormAction';

type LocationState = {
    created_at: string;
    id: number;
    name: string;
    user_id: string;
};

type Inputs = {
    name: string;
};

const schema = yup
    .object({
        name: yup.string().required('Campo obrigatório'),
    })
    .required();

const CreateCategory = () => {
    const { addToast } = useToasts();
    const navigate = useNavigate();

    const location = useLocation();
    const state = location.state as LocationState;

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

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(state ? state.name : '');

    const createCategory: SubmitHandler<Inputs> = async (name: Inputs) => {
        setLoading(true);

        const { error } = await supabase
            .from('category')
            .insert({ name: name.name, user_id: id })
            .single();

        if (error) {
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        } else {
            addToast('Categoria criada com sucesso!', { appearance: 'success', autoDismiss: true });
            reset({ name: '' });
            navigate('/categorias');
        }
        setLoading(false);
    };

    const editCategory: SubmitHandler<Inputs> = async (name: Inputs) => {
        setLoading(true);

        const { error } = await supabase
            .from('category')
            .update({ name: name.name })
            .eq(`name`, state.name);

        if (error) {
            return addToast(error.message, { appearance: 'error', autoDismiss: true });
        } else {
            addToast('Categoria atualizada com sucesso!', {
                appearance: 'success',
                autoDismiss: true,
            });
            reset({ name: '' });
            navigate('/categorias');
        }
        setLoading(false);
    };

    return (
        <Header>
            {errors.name?.message && (
                <p className='absolute mx-2 mt-10 text-sm text-red-500 '>
                    * {errors.name?.message}
                </p>
            )}
            <form
                onSubmit={handleSubmit(state ? editCategory : createCategory)}
                className='mx-2 mt-4 sm:mt-10'
            >
                <label className='text-center label'>
                    <span className='font-bold uppercase mb-7'>
                        {' '}
                        {state ? 'Editar' : 'Nova'} Categoria{' '}
                    </span>
                </label>
                <div>
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
                </div>

                <ButtonFormAction link={'/categorias'} state={state} loading={loading} />
            </form>
        </Header>
    );
};

export default CreateCategory;
