import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token, logout } = useAuth();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/students', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch students');
                }

                setStudents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [token]);

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem' }}>Loading students...</div>;
    }

    if (error) {
        return <div className="error-message" style={{ margin: '2rem auto', maxWidth: '400px' }}>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>Student Directory</h2>
                <button 
                    onClick={logout} 
                    className="auth-button" 
                    style={{ width: 'auto', padding: '0.5rem 1rem', margin: 0, backgroundColor: '#dc2626' }}
                >
                    Logout
                </button>
            </div>

            {students.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>No students found in the database.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {students.map((student) => (
                        <li 
                            key={student._id || student.id} 
                            style={{ 
                                background: 'white', 
                                padding: '1rem', 
                                marginBottom: '0.75rem', 
                                borderRadius: '6px', 
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div>
                                <strong style={{ fontSize: '1.05rem', color: '#333' }}>{student.name}</strong>
                                <div style={{ color: '#666', fontSize: '0.9rem' }}>{student.email}</div>
                            </div>
                            <span style={{ fontSize: '0.85rem', background: '#e0e7ff', color: '#3730a3', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                Age: {student.age}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}