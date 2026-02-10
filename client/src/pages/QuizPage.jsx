import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { questions } from '../data/questions';
import axios from 'axios';

function QuizPage() {
    const {
        username,
        topic,
        score,
        setScore,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        quizFinished,
        setQuizFinished,
        resetQuiz,
    } = useQuiz();

    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (!username || !topic) {
            navigate('/');
        }
    }, [username, topic, navigate]);

    const currentQuestions = questions[topic] || [];
    const currentQuestion = currentQuestions[currentQuestionIndex];

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleNext = async () => {
        if (selectedOption === currentQuestion.answer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex + 1 < currentQuestions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        } else {
            setQuizFinished(true);
            await submitResult();
        }
    };

    const submitResult = async () => {
        try {
            // Calculate final score including the last answer if correct
            let finalScore = score;
            if (selectedOption === currentQuestion.answer) {
                finalScore += 1;
                setScore(finalScore); // Update state for UI
            }

            await axios.post('/api/submit-result', {
                username,
                topic,
                score: finalScore,
                totalQuestions: currentQuestions.length,
            });
        } catch (error) {
            console.error('Error submitting result:', error);
        }
    };

    if (!currentQuestion) return <div>Loading...</div>;

    if (quizFinished) {
        return (
            <div className="result-container">
                <h2>Quiz Completed Successfully!</h2>
                <p>
                    {username}, you scored {score} out of {currentQuestions.length} in {topic}.
                </p>
                <button onClick={() => {
                    resetQuiz();
                    navigate('/');
                }}>Play Again</button>
            </div>
        );
    }

    return (
        <div className="quiz-page">
            <div className="header">
                <span>Topic: {topic}</span>
                <span>Question: {currentQuestionIndex + 1} / {currentQuestions.length}</span>
            </div>

            <div className="question-card" style={{ marginTop: '20px', padding: '20px', border: '1px solid #444', borderRadius: '10px' }}>
                <h3>{currentQuestion.question}</h3>
                {currentQuestion.image && (
                    <div className="image-container">
                        <img src={currentQuestion.image} alt="Question" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
                    </div>
                )}

                <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            style={{
                                backgroundColor: selectedOption === option ? '#646cff' : '#1a1a1a',
                                borderColor: selectedOption === option ? '#646cff' : 'transparent',
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="footer" style={{ marginTop: '20px' }}>
                <button onClick={handleNext} disabled={!selectedOption}>
                    {currentQuestionIndex + 1 === currentQuestions.length ? 'Submit' : 'Next'}
                </button>
            </div>
        </div>
    );
}

export default QuizPage;
