import { FaStoreAlt } from "react-icons/fa"
import { MdMiscellaneousServices } from "react-icons/md"
import { AiFillHome } from 'react-icons/ai'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { BiCategory } from 'react-icons/bi'
import { Link } from "react-router-dom"
import { useAuth } from '../../context/auth'

type ParamsId = {
    id: string
}

type IProps = {
    children: React.ReactNode
}


const Header = ( { children }: IProps ) => {

    const  auth = useAuth()

    const openStore = () => {
        window.open(`/public-poducts/${auth.user.id}`)
    }

    return (
        <div className="h-screen drawer">
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
        </div>
    )
}

export default Header