import { Navigate } from 'react-router-dom';
import { useToken } from '../../Context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user } = useToken();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
} 