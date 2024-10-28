import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Login from './components/Login';
import Register from './components/Register';
import RegisterAdmin from './components/RegisterAdmin';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
    const isLoggedIn = () => {
        return !!localStorage.getItem('token');
    };

    const isAdmin = () => {
        return localStorage.getItem('role') === 'admin';
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route 
                        path="/" 
                        element={isLoggedIn() ? (isAdmin() ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user" />) : <Login />} 
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register-admin" element={ <RegisterAdmin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard /> } />
                    <Route path="/user" element={<UserDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
