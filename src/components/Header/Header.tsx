import { FaStoreAlt } from 'react-icons/fa';
import { MdMiscellaneousServices } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { BsFillPersonFill } from 'react-icons/bs';

type ParamsId = {
    id: string;
};

type IProps = {
    children: React.ReactNode;
};

const Header = ({ children }: IProps) => {
    const auth = useAuth();

    const userName = auth.user?.user_metadata?.name;

    const openStore = () => {
        window.open(`/public-poducts/${auth.user.id}`);
    };

    return (
        <>
            <nav className='relative flex flex-wrap items-center justify-between w-full py-4 text-gray-500 bg-gray-100 shadow-lg hover:text-gray-700 focus:text-gray-700 navbar navbar-expand-lg navbar-light'>
                <div className='container mx-auto'>
                    <div className='flex flex-wrap items-center justify-between w-full px-6 container-fluid'>
                        <button
                            className='
                        navbar-toggler
                        text-gray-500
                        border-0
                        hover:shadow-none hover:no-underline
                        py-2
                        px-2.5
                        bg-transparent
                        focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
                        '
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#navbarSupportedContent'
                            aria-controls='navbarSupportedContent'
                            aria-expanded='false'
                            aria-label='Toggle navigation'
                        >
                            <svg
                                aria-hidden='true'
                                focusable='false'
                                data-prefix='fas'
                                data-icon='bars'
                                className='w-6'
                                role='img'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 448 512'
                            >
                                <path
                                    fill='currentColor'
                                    d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'
                                ></path>
                            </svg>
                        </button>

                        <div
                            className='items-center flex-grow collapse navbar-collapse'
                            id='navbarSupportedContent'
                        >
                            <ul className='flex flex-col pl-0 mr-auto navbar-nav list-style-none'>
                                <li className='p-2 nav-item'>
                                    <Link to={'/'}>
                                        <a className='flex items-center underline transition duration-300 ease-in-out decoration-transparent hover:decoration-inherit'>
                                            <AiFillHome />
                                            <span className='ml-1'>Dashboard</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className='p-2 nav-item'>
                                    <Link to={'/produtos'}>
                                        <a className='flex items-center underline transition duration-300 ease-in-out decoration-transparent hover:decoration-inherit'>
                                            <MdProductionQuantityLimits />
                                            <span className='ml-1'>Produtos</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className='p-2 nav-item'>
                                    <Link to={'/categorias'}>
                                        <a className='flex items-center underline transition duration-300 ease-in-out decoration-transparent hover:decoration-inherit'>
                                            <BiCategory />
                                            <span className='ml-1'>Categorias</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className='p-2 nav-item'>
                                    <a
                                        onClick={openStore}
                                        className='flex items-center underline transition duration-300 ease-in-out cursor-pointer decoration-transparent hover:decoration-inherit'
                                    >
                                        <FaStoreAlt />
                                        <span className='ml-1'>Minha Loja</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className='flex items-center'>
                            <p className='mr-2 text-sm font-semibold'>
                                Olá, {userName && userName}
                            </p>

                            <div className='dropdown dropend'>
                                <a
                                    className='flex items-center dropdown-toggle hidden-arrow'
                                    href='#'
                                    id='dropdownMenuButton2'
                                    role='button'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    <div className='flex justify-center space-x-2'>
                                        <button
                                            type='button'
                                            className='flex items-center justify-center leading-normal text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg w-9 h-9'
                                        >
                                            <BsFillPersonFill />
                                        </button>
                                    </div>
                                </a>
                                <ul
                                    className='absolute z-50 hidden float-left py-2 m-0 mt-1 text-base text-left list-none bg-white border-none rounded-lg shadow-lg lg:right-0 lg:left-auto min-w-max dropdown-menu bg-clip-padding'
                                    aria-labelledby='dropdownMenuButton2'
                                >
                                    <li>
                                        <Link to={'/configuracoes'}>
                                            <a
                                                className='block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100'
                                                href='#'
                                            >
                                                Configurações
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            onClick={auth.logout}
                                            className='block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100'
                                            href='#'
                                        >
                                            Sair
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='container mx-auto'>{children}</div>
        </>
    );
};

export default Header;
