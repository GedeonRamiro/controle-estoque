import { Link } from 'react-router-dom';

type Props = {
    loading: boolean;
    state?: {} | null;
    link: string;
};

const ButtonFormAction = ({ link, state, loading }: Props) => {
    return (
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
                        className='inline-block mb-2 w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out pointer-events-none opacity-60'
                        disabled
                    >
                        {state ? 'Atualizar' : 'Salvar'}
                    </button>
                )}
            </div>
            <div className='w-full sm:ml-2'>
                <Link to={link}>
                    <button
                        type='submit'
                        className='inline-block w-full px-6 py-2 text-xs font-medium leading-normal text-blue-600 uppercase transition duration-150 ease-in-out border-2 border-blue-600 rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0'
                    >
                        Cancelar
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ButtonFormAction;
