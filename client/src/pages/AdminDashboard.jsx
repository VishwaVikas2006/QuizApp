import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [results, setResults] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
    const navigate = useNavigate();

    useEffect(() => {
        // Basic auth check
        if (!localStorage.getItem('isAdmin')) {
            navigate('/admin/login');
            return;
        }
        fetchResults();
    }, [navigate]);

    const fetchResults = async () => {
        try {
            // In real app use env var
            const response = await axios.get('/api/results');
            if (response.data.success) {
                setResults(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    const handleSort = (order) => {
        setSortOrder(order);
        const sorted = [...results].sort((a, b) => {
            if (order === 'asc') return a.score - b.score;
            return b.score - a.score;
        });
        setResults(sorted);
    };

    return (
        <div className="dashboard">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Admin Dashboard</h2>
                <button onClick={() => {
                    localStorage.removeItem('isAdmin');
                    navigate('/');
                }}>Logout</button>
            </div>

            <div className="controls" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <label>Sort by Score: </label>
                <button onClick={() => handleSort('asc')} style={{ marginRight: '10px', backgroundColor: sortOrder === 'asc' ? '#646cff' : '' }}>Ascending</button>
                <button onClick={() => handleSort('desc')} style={{ backgroundColor: sortOrder === 'desc' ? '#646cff' : '' }}>Descending</button>
            </div>

            <table className="result-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Topic</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <tr key={result._id}>
                            <td>{result.username}</td>
                            <td>{result.topic}</td>
                            <td>{result.score} / {result.totalQuestions}</td>
                            <td>{new Date(result.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
