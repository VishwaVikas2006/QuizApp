import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuiz } from '../context/QuizContext';
import { questions } from '../data/questions';
import { FaUserShield, FaSignOutAlt } from 'react-icons/fa';

function Homepage() {
    const { setUsername, setTopic } = useQuiz();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [authData, setAuthData] = useState({ username: '', password: '' });
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);
            setUsername(user.username);
        }
    }, [setUsername]);

    const handleInputChange = (e) => {
        setAuthData({ ...authData, [e.target.name]: e.target.value });
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

        try {
            const res = await axios.post(endpoint, authData);
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setCurrentUser(res.data.user);
                setUsername(res.data.user.username);
            }
        } catch (err) {
            console.error("Auth Error:", err);
            let msg = 'Authentication failed';
            if (err.response) {
                // Server responded with a status code outside 2xx
                if (err.response.data && err.response.data.message) {
                    msg = err.response.data.message;
                } else {
                    msg = `Server Error (${err.response.status})`;
                }
            } else if (err.request) {
                // Request was made but no response received
                msg = 'Network Error: No response from server. Check your connection.';
            } else {
                msg = err.message;
            }
            setError(msg);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser(null);
        setUsername('');
        setAuthData({ username: '', password: '' });
    };

    const handleStart = async (selectedTopic) => {
        if (!currentUser) return;

        try {
            const response = await axios.post('/api/check-user', {
                username: currentUser.username,
            });

            if (response.data.taken) {
                alert(response.data.message);
                return;
            }

            setTopic(selectedTopic);
            navigate('/quiz');
        } catch (error) {
            console.error("Error checking user:", error);
            alert("Network error. Please try again.");
        }
    };

    return (
        <div className="homepage">
            <div className="admin-btn-container" style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px' }}>
                {currentUser && (
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: '#dc3545' }}>
                        <FaSignOutAlt /> Logout
                    </button>
                )}
                <button onClick={() => navigate('/admin/login')} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaUserShield /> Admin Login
                </button>
            </div>

            <h1>Welcome to the Quiz App</h1>

            {!currentUser ? (
                <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h2>{isLogin ? 'Login' : 'Register'}</h2>
                    {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={authData.username}
                            onChange={handleInputChange}
                            className="input-field"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={authData.password}
                            onChange={handleInputChange}
                            className="input-field"
                            required
                        />
                        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                    </form>
                    <p style={{ marginTop: '15px' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span
                            onClick={() => { setIsLogin(!isLogin); setError(''); }}
                            style={{ color: '#646cff', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            {isLogin ? 'Register' : 'Login'}
                        </span>
                    </p>
                </div>
            ) : (
                <>
                    <h2>Hello, {currentUser.username}!</h2>
                    <p>Select a topic to start the quiz.</p>
                    <div className="topics-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
                        {Object.keys(questions).map((topicKey) => (
                            <div
                                key={topicKey}
                                className="card"
                                onClick={() => handleStart(topicKey)}
                            >
                                <h3>{topicKey}</h3>
                                <p>Test your knowledge in {topicKey}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Homepage;
