/*import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import './AdminDashboard.css';

function AdminDashboard() {
    const [winners, setWinners] = useState([]);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/winners');
                const data = await response.json();
                setWinners(data);
            } catch (err) {
                console.error('Error:', err);
            }
        };

        fetchWinners(); // Llamada a la función para obtener los ganadores
    }, []); // El array vacío asegura que el efecto solo se ejecute una vez al montar el componente

    const handleLogout = () => {
        // Eliminar token y rol del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
        // Redirigir al login
        navigate('/');
    };

    return (
        <div className="admin-dashboard-container">
            <h2>Ganadores</h2>
            <table className="winners-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Ciudad</th>
                        <th>Teléfono</th>
                        <th>Código QR</th>
                        <th>Premio</th>
                    </tr>
                </thead>
                <tbody>
                    {winners.length > 0 ? (
                        winners.map((winner, index) => (
                            <tr key={index}>
                                <td>{winner.date}</td>
                                <td>{winner.user}</td>
                                <td>{winner.city}</td>
                                <td>{winner.phone}</td>
                                <td>{winner.qrCode}</td>
                                <td>{winner.prize}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay ganadores disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button className="logout-btn" onClick={handleLogout}>Salir</button>
        </div>
    );
}

export default AdminDashboard;*/

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import './AdminDashboard.css';

function AdminDashboard() {
    const [winners, setWinners] = useState([]);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/winners');
                const data = await response.json();
                setWinners(data);
            } catch (err) {
                console.error('Error:', err);
            }
        };

        fetchWinners(); // Llamada a la función para obtener los ganadores
    }, []); // El array vacío asegura que el efecto solo se ejecute una vez al montar el componente

    const handleLogout = () => {
        // Eliminar token y rol del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
        // Redirigir al login
        navigate('/');
    };

    return (
        <div className="admin-dashboard-container">
            <h2>Ganadores</h2>
            <table className="winners-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Ciudad</th>
                        <th>Teléfono</th>
                        <th>Código QR</th>
                        <th>Premio</th>
                    </tr>
                </thead>
                <tbody>
                    {winners.length > 0 ? (
                        winners.map((winner, index) => (
                            <tr key={index}>
                                <td>{winner.date}</td> {/* Mostrar la fecha del código */}
                                <td>{winner.user || 'N/A'}</td> {/* Mostrar el nombre del usuario */}
                                <td>{winner.city || 'N/A'}</td> {/* Mostrar la ciudad del usuario */}
                                <td>{winner.phone || 'N/A'}</td> {/* Mostrar el teléfono del usuario */}
                                <td>{winner.qrCode}</td> {/* Mostrar el código QR */}
                                <td>{winner.prize}</td> {/* Mostrar el premio */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay ganadores disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button className="logout-btn" onClick={handleLogout}>Salir</button>
        </div>
    );
}

export default AdminDashboard;

