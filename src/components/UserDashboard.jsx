/*import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import { useState } from 'react';
import './UserDashboard.css';

function UserDashboard() {
    const [qrCode, setQrCode] = useState('');
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const navigate = useNavigate(); // Hook para redirigir

    // Maneja el registro del código QR
    const handleRegisterCode = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/register-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de enviar el token
                },
                body: JSON.stringify({ qrCode }),  // Enviar el código QR al servidor
            });

            const data = await response.json();
            setMessage(data.msg);  // Mostrar mensaje de éxito o error

            // Si el código se registró correctamente, actualizar el historial
            if (response.status === 200) {
                setHistory((prevHistory) => [
                    ...prevHistory,
                    { qrCode, date: new Date().toLocaleString() },
                ]);
            }
        } catch (err) {
            console.error('Error:', err);
            setMessage('Error al registrar el código.'); // Mensaje de error en caso de fallo
        }
    };

    // Maneja el cierre de sesión
    const handleLogout = () => {
        // Eliminar el token y el rol del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
        // Redirigir al login
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <h2>Registro de Código QR</h2>
            <input
                type="text"
                placeholder="Código QR (000-999)"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
            />
            <button onClick={handleRegisterCode}>Registrar Código</button>

            {message && <p>{message}</p>}

            <h3>Historial de Códigos Registrados</h3>
            <table className="history-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Código QR</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.qrCode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Botón para salir *//*}
            <button className="logout-btn" onClick={handleLogout}>Salir</button>
        </div>
    );
}

export default UserDashboard;
*/
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './UserDashboard.css';

function UserDashboard() {
    const [qrCode, setQrCode] = useState('');
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    const handleRegisterCode = async () => {
        if (!/^\d{3}$/.test(qrCode)) {
            setMessage('Código inválido. Debe estar en el rango 000-999.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/register-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ qrCode }),
            });

            const data = await response.json();
            setMessage(data.msg);

            // Actualizar el historial en cada intento, independientemente del resultado
            setHistory((prevHistory) => [
                ...prevHistory,
                { qrCode, date: new Date().toLocaleString(), result: data.msg },
            ]);
        } catch (err) {
            console.error('Error:', err);
            setMessage('Error al registrar el código.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <h2>Registro de Código QR</h2>
            <input
                type="text"
                placeholder="Código QR (000-999)"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
            />
            <button onClick={handleRegisterCode}>Registrar Código</button>

            {message && <p>{message}</p>}

            <h3>Historial de Códigos Registrados</h3>
            <table className="history-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Código QR</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.qrCode}</td>
                            <td>{item.result}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="logout-btn" onClick={handleLogout}>Salir</button>
        </div>
    );
}

export default UserDashboard;
