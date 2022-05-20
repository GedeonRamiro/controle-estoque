import { Link } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
    buttonAccountPage: string;
    textAccountPage: string;
    linkAccountPage: string;
    textFrom: string;
};

const Account = ({
    children,
    buttonAccountPage,
    textAccountPage,
    linkAccountPage,
    textFrom,
}: Props) => {
    return (
        <section className='flex justify-center h-full lg:bg-gray-200 gradient-form md:h-screen'>
            <div className='container h-full px-4 py-12'>
                <div className='flex flex-wrap items-center justify-center h-full text-gray-800 g-6'>
                    <div className='xl:w-10/12'>
                        <div className='block bg-white rounded-lg lg:shadow-lg'>
                            <div className='lg:flex lg:flex-wrap g-0'>
                                <div className='px-4 lg:w-6/12 md:px-0'>
                                    <div className='md:p-12 md:mx-6'>
                                        <div className='text-center'>
                                            <img
                                                className='w-48 mx-auto'
                                                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp'
                                                alt='logo'
                                            />
                                            <h4 className='pb-1 mt-1 mb-12 text-xl font-semibold'>
                                                Minha Loja Virtual
                                            </h4>
                                        </div>

                                        <p className='mb-4'>{textFrom}</p>

                                        {children}

                                        <div className='flex justify-center'></div>

                                        <div className='flex items-center justify-between pb-6'>
                                            <p className='mb-0 mr-2'>{textAccountPage}</p>
                                            <Link to={linkAccountPage}>
                                                <button
                                                    type='button'
                                                    className='inline-block px-6 py-2 text-xs font-medium leading-tight text-red-600 uppercase transition duration-150 ease-in-out border-2 border-red-600 rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0'
                                                    data-mdb-ripple='true'
                                                    data-mdb-ripple-color='light'
                                                >
                                                    {buttonAccountPage}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none'
                                    style={{
                                        background:
                                            'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                                    }}
                                >
                                    <div className='px-4 py-6 text-white md:p-12 md:mx-6'>
                                        <h4 className='mb-6 text-xl font-semibold'>
                                            Vantagens de uma loja virtual
                                        </h4>
                                        <p className='text-sm'>
                                            Com a loja virtual, a sua empresa alcançará um grande
                                            número de pessoas, de qualquer lugar do mundo. Afinal,
                                            todos que tem acesso à internet poderão navegar sem
                                            nenhuma dificuldade. Além disso, essa é uma grande
                                            oportunidade para inserir o seu produto no mercado,
                                            ampliando os potenciais compradores.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Account;
