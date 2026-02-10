import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuiz } from '../context/QuizContext';
import { questions } from '../data/questions';
import { FaUserShield } from 'react-icons/fa';

function Homepage() {
    const { setUsername, setTopic } = useQuiz();
    const [nameInput, setNameInput] = useState('');
    const navigate = useNavigate();

    const handleStart = async (selectedTopic) => {
        if (!nameInput.trim()) {
            alert('Please enter your username first!');
            return;
        }

        try {
            const response = await axios.post('/api/check-user', {
                username: nameInput.trim(),
            });

            if (response.data.taken) {
                alert(response.data.message);
                return;
            }

            setUsername(nameInput);
            setTopic(selectedTopic);
            navigate('/quiz');
        } catch (error) {
            console.error("Error checking user:", error);
            alert("Network error. Please try again.");
        }
    };

    return (
        <div className="homepage">
            <div className="admin-btn-container" style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <button onClick={() => navigate('/admin/login')} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaUserShield /> Admin Login
                </button>
            </div>

            <h1>Welcome to the Quiz App</h1>

            <div className="user-input">
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="input-field"
                    style={{ maxWidth: '300px' }}
                />
            </div>

            <h2>Select a Topic</h2>
            <div className="topics-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
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
        </div>
    );
}

export default Homepage;
