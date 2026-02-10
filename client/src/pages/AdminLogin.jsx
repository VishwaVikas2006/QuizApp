import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // In a real app, use environment variable for API URL
            const response = await axios.post('/api/admin/login', {
                email,
                password,
            });

            if (response.data.success) {
                // Simple auth check for demo - store flag
                localStorage.setItem('isAdmin', 'true');
                navigate('/admin/dashboard');
            }
        } catch (err) {
            alert('Invalid Credentials');
        }
    };

    return (
        <div className="login-page">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '0 auto' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
                Back to Home
            </button>
        </div>
    );
}

export default AdminLogin;
