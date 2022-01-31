
import { Navigate } from "react-router-dom";
import { useAuth } from '../../context/auth';

type IProps = {
    children: React.ReactNode
}

const ProtectedRoute = ( {children}: IProps ) => {

    const auth = useAuth()

    return (
        auth.user ? children : <Navigate to={'/login'} />
    )
}

export default ProtectedRoute