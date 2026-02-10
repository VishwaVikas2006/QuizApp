import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import QuizPage from './pages/QuizPage';
import Dashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { QuizProvider } from './context/QuizContext';
import './App.css';

function App() {
    return (
        <QuizProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </QuizProvider>
    );
}

export default App;
