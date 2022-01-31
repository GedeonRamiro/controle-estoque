import { Link } from "react-router-dom"
import { useAuth } from '../../context/auth'

type IProps = {
    children: React.ReactNode
}


const Header = ( { children }: IProps ) => {

    const  auth = useAuth()

    return (
        <div className="h-screen drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="flex flex-col drawer-content">
                <div className="w-full navbar bg-neutral">
                    <div className='container mx-auto'>
                        <div className="flex-none text-white md:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
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
                    <a>Item 1</a>
                </li> 
                <li>
                    <a>Item 2</a>
                </li>
                </ul>
            </div>
        </div>
    )
}

export default Header