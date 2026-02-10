import { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [topic, setTopic] = useState('');
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const resetQuiz = () => {
        setTopic('');
        setScore(0);
        setCurrentQuestionIndex(0);
        setQuizFinished(false);
    };

    const value = {
        username,
        setUsername,
        topic,
        setTopic,
        score,
        setScore,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        quizFinished,
        setQuizFinished,
        resetQuiz,
    };

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
