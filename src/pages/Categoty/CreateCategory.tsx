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

    console.log(errors);

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
                            id='floatingInput'
                            placeholder='Nome'
                        />
                        <label htmlFor='floatingInput' className='text-gray-700'>
                            Nome
                        </label>
                    </div>
                </div>

                <div className='my-4 sm:flex '>
                    <div className='w-full sm:mr-2'>
                        {!loading ? (
                            <button
                                type='submit'
                                className='mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                            >
                                {state ? 'Atualizar' : 'Salvar'}
                            </button>
                        ) : (
                            <button
                                type='submit'
                                className='inline-block mx-2 w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out pointer-events-none opacity-60'
                                disabled
                            >
                                {state ? 'Atualizar' : 'Salvar'}
                            </button>
                        )}
                    </div>
                    <div className='w-full sm:ml-2'>
                        <Link to={'/categorias'}>
                            <button
                                type='submit'
                                className='inline-block w-full px-6 py-2 text-xs font-medium leading-normal text-blue-600 uppercase transition duration-150 ease-in-out border-2 border-blue-600 rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0'
                            >
                                Cancelar
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </Header>
    );
};

export default CreateCategory;
