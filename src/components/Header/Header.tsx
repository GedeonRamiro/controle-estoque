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

    console.log(auth.user.user_metadata.name);

    const openStore = () => {
        window.open(`/public-poducts/${auth.user.id}`);
    };

    return (
        /*  <div className="h-screen drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="flex flex-col drawer-content">
                <div className="w-full navbar bg-neutral">
                    <div className='container mx-auto'>
                        <div className="flex-none text-white md:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                            </label>
                        </div> 
                        <div className="flex-1">
                            <div className="items-stretch hidden text-white md:flex">
                                <Link to={'/'}>
                                    <a className="btn btn-ghost btn-sm rounded-btn no-animation">Home</a> 
                                </Link>
                                <Link to={'/produtos'}>
                                    <a className="btn btn-ghost btn-sm rounded-btn no-animation">Produtos</a>              
                                </Link>
                                <Link to={'/categorias'}>
                                    <a className="btn btn-ghost btn-sm rounded-btn no-animation">Categorias</a>              
                                </Link>
                                <button onClick={openStore} className="btn btn-ghost btn-sm rounded-btn no-animation">
                                     Minha Loja 
                                    <FaStoreAlt className='ml-2' /> 
                                </button>
                                <Link to={'/configuracoes'} className='flex items-center'>
                                    <a className="btn btn-ghost btn-sm rounded-btn no-animation">
                                        Configurações
                                        <MdMiscellaneousServices className='ml-2 text-xl'  />              
                                    </a>
                                </Link>    
                              
                            </div>
                        </div> 

                        <div className="flex-none text-white">
                            <button onClick={auth.logout} className="btn btn-ghost btn-sm rounded-btn no-animation">Sair</button>      
                        </div>
                    </div>
                </div>
                <div className='container mx-auto'>
                    <div className='mx-6 md:mx-0'>
                        {children}
                    </div>
                </div>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
                <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
                <li>
                    <Link to={'/'}>
                        <a className="btn btn-ghost btn-sm rounded-btn no-animation">
                            <AiFillHome className='mr-2 text-xl' />              
                            Home
                        </a> 
                    </Link>
                </li> 
                <li>
                    <Link to={'/produtos'}>
                        <a className="btn btn-ghost btn-sm rounded-btn no-animation">
                            <MdProductionQuantityLimits className='mr-2 text-xl' /> 
                            Produtos
                        </a>              
                    </Link>
                </li>
                <li>
                    <Link to={'/categorias'}>
                        <a className="btn btn-ghost btn-sm rounded-btn no-animation">
                            <BiCategory className='mr-2 text-xl' /> 
                            Categorias
                        </a>              
                    </Link>
                </li>
                <li>
                    <button onClick={openStore} className="btn btn-ghost btn-sm rounded-btn no-animation">
                        <FaStoreAlt className='mr-2' /> 
                        Minha Loja 
                    </button>
                </li>
                <li>
                    <Link to={'/configuracoes'} className='flex items-center'>
                        <a className="btn btn-ghost btn-sm rounded-btn no-animation">
                            <MdMiscellaneousServices className='mr-2 text-xl'  />              
                            Configurações
                        </a>
                    </Link>    
                </li>
                </ul>
            </div>
        </div> */

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
                                        <a className='underline transition duration-300 ease-in-out decoration-transparent hover:decoration-inherit'>
                                            Dashboard
                                        </a>
                                    </Link>
                                </li>
                                <li className='p-2 nav-item'>
                                    <Link to={'/produtos'}>
                                        <a className='underline transition duration-300 ease-in-out decoration-transparent hover:decoration-inherit'>
                                            Produtos
                                        </a>
                                    </Link>
                                </li>
                                <li className='p-2 nav-item'>
                                    <Link to={'/categorias'}>
                                        <a className='underline transition duration-300 ease-in-out decoration-transparent hover:decoration-inherit'>
                                            Categorias
                                        </a>
                                    </Link>
                                </li>
                                <li className='p-2 nav-item'>
                                    <a
                                        onClick={openStore}
                                        className='underline transition duration-300 ease-in-out cursor-pointer decoration-transparent hover:decoration-inherit'
                                    >
                                        Minha Loja
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className='relative dropdown'>
                            <a
                                className='flex items-center dropdown-toggle hidden-arrow'
                                href='#'
                                id='dropdownMenuButton2'
                                role='button'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                            >
                                <p className='mr-2'>Olá, {auth.user.user_metadata.name}</p>

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
                                className='absolute z-50 hidden float-left py-2 m-0 mt-1 text-base text-left list-none bg-white border-none rounded-lg shadow-lg dropdown-menu min-w-max bg-clip-padding'
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
            </nav>
            <div className='container mx-auto'>{children}</div>
        </>
    );
};

export default Header;
