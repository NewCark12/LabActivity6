import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Students from './pages/Students';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

// Helper component to redirect root path depending on auth state
function RootRedirect() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/students" replace /> : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Task 4.3: Root path redirects based on auth status */}
                <Route path="/" element={<RootRedirect />} />
                
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Route */}
                <Route 
                    path="/students" 
                    element={
                        <ProtectedRoute>
                            <Students />
                        </ProtectedRoute>
                    } 
                />
                
                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}