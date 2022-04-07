

import { Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home/Home'
import CreateAccount from './pages/CreateAccount'
import Login from "./pages/Login";
import Products from './pages/Products'
import PublicProduct from './pages/Products/PublicProduct'
import CreateProduct from './pages/Products/CreateProduct'
import Categoty from './pages/Categoty'
import CreateCategory from './pages/Categoty/CreateCategory'
import { AuthProvider } from './context/auth'
import ProtectedRoute from './components/ProtectedRoute'


const MainRoutes = () => {
    return ( 
        <AuthProvider>
            <Routes>
                <Route index element={<ProtectedRoute> <Home /> </ProtectedRoute>} /> 
                <Route path={'/login'} element={<Login />} />
                <Route path={'/create-account'} element={<CreateAccount />} />
                <Route path={'/public-poducts'} element={<PublicProduct />} />
                <Route path={'/'} element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
                <Route path={'/produtos'} element={<ProtectedRoute> <Products /> </ProtectedRoute>} />
                <Route path={'/categorias'} element={<ProtectedRoute> <Categoty /> </ProtectedRoute>} />
                <Route path={'/adicionar-categoria'} element={<ProtectedRoute> <CreateCategory /> </ProtectedRoute>} />
                <Route path={'/adicionar-produto'} element={<ProtectedRoute> <CreateProduct /> </ProtectedRoute>} />
            </Routes>        
        </AuthProvider>
    )
}

export default MainRoutes