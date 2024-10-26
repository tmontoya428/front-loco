import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import './App.css'; // Archivo de estilos generales

function App() {
    // Verifica si el usuario está logueado
    const isLoggedIn = () => {
        return !!localStorage.getItem('token'); // Devuelve true si el token existe
    };

    // Verifica si el usuario es administrador
    const isAdmin = () => {
        return localStorage.getItem('role') === 'admin'; // Chequea si el rol es 'admin'
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Ruta de inicio que redirige según el estado de login */}
                    <Route 
                        path="/" 
                        element={isLoggedIn() ? (isAdmin() ? <Navigate to="/admin" /> : <Navigate to="/user" />) : <Login />} 
                    />
                    
                    {/* Ruta para el registro de usuarios */}
                    <Route path="/register" element={<Register />} />
                    
                    {/* Ruta protegida para el dashboard del usuario */}
                    <Route path="/user" 
                        element={<UserDashboard/>} 
                    />
                    
                    {/* Ruta protegida para el dashboard del administrador */}
                    <Route 
                        path="/admin" 
                        element={ <AdminDashboard />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
