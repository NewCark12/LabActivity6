import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    // Throws an error if used outside of <AuthProvider>
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;
};