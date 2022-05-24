import Header from 'components/Header';
import { FiLogOut } from 'react-icons/fi';

const Home = () => {
    return (
        <Header>
            <div
                id='carouselExampleCaptions'
                className='relative my-4 lg:my-10 carousel slide'
                data-bs-ride='carousel'
            >
                <div className='absolute bottom-0 left-0 right-0 flex justify-center p-0 mb-4 carousel-indicators'>
                    <button
                        type='button'
                        data-bs-target='#carouselExampleCaptions'
                        data-bs-slide-to='0'
                        className='active'
                        aria-current='true'
                        aria-label='Slide 1'
                    ></button>
                    <button
                        type='button'
                        data-bs-target='#carouselExampleCaptions'
                        data-bs-slide-to='1'
                        aria-label='Slide 2'
                    ></button>
                    <button
                        type='button'
                        data-bs-target='#carouselExampleCaptions'
                        data-bs-slide-to='2'
                        aria-label='Slide 3'
                    ></button>
                </div>
                <div className='relative w-full overflow-hidden carousel-inner'>
                    <div className='relative float-left w-full carousel-item active'>
                        <img
                            src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg'
                            className='block w-full'
                            alt='...'
                        />
                        <div className='absolute hidden text-center carousel-caption md:block'>
                            <h5 className='text-xl'>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div className='relative float-left w-full carousel-item'>
                        <img
                            src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg'
                            className='block w-full'
                            alt='...'
                        />
                        <div className='absolute hidden text-center carousel-caption md:block'>
                            <h5 className='text-xl'>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div className='relative float-left w-full carousel-item'>
                        <img
                            src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg'
                            className='block w-full'
                            alt='...'
                        />
                        <div className='absolute hidden text-center carousel-caption md:block'>
                            <h5 className='text-xl'>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                    </div>
                </div>
                <button
                    className='absolute top-0 bottom-0 left-0 flex items-center justify-center p-0 text-center border-0 carousel-control-prev hover:outline-none hover:no-underline focus:outline-none focus:no-underline'
                    type='button'
                    data-bs-target='#carouselExampleCaptions'
                    data-bs-slide='prev'
                >
                    <span
                        className='inline-block bg-no-repeat carousel-control-prev-icon'
                        aria-hidden='true'
                    ></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button
                    className='absolute top-0 bottom-0 right-0 flex items-center justify-center p-0 text-center border-0 carousel-control-next hover:outline-none hover:no-underline focus:outline-none focus:no-underline'
                    type='button'
                    data-bs-target='#carouselExampleCaptions'
                    data-bs-slide='next'
                >
                    <span
                        className='inline-block bg-no-repeat carousel-control-next-icon'
                        aria-hidden='true'
                    ></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>
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

            <div className='flex flex-col'>
                <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                        <div className='overflow-hidden'>
                            <table className='min-w-full'>
                                <thead className='bg-white border-b'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                                        >
                                            #
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                                        >
                                            First
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                                        >
                                            Last
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                                        >
                                            Handle
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                                        >
                                            First
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-6 py-4 text-sm font-medium text-left text-gray-900'
                                        >
                                            Last
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='bg-gray-100 border-b'>
                                        <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                                            1
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            Mark
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            Otto
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            @mdo
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            @mdo
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            @mdo
                                        </td>
                                    </tr>
                                    <tr className='bg-white border-b'>
                                        <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                                            2
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            Jacob
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            Thornton
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            @fat
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            Thornton
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            @fat
                                        </td>
                                    </tr>
                                    <tr className='bg-white border-b'>
                                        <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                                            2
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            Jacob
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            Thornton
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            @fat
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            Thornton
                                        </td>
                                        <td className='px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap'>
                                            @fat
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
};

export default Home;
