import Header from 'components/Header';
import { FiLogOut } from 'react-icons/fi';

const Home = () => {
    return (
        <Header>
            <div className='flex justify-center my-10'>
                <div className='block max-w-sm p-6 bg-white rounded-lg shadow-lg'>
                    <h5 className='mb-2 text-xl font-medium leading-tight text-gray-900'>
                        Card title
                    </h5>
                    <p className='mb-4 text-base text-gray-700'>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </p>
                    <button
                        type='button'
                        className=' inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                    >
                        Button
                    </button>
                </div>
            </div>
        </Header>
    );
};

export default Home;
