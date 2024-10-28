import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const API_URL = 'https://back-loco.vercel.app/api/login'; // URL de la API

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Añadir clase de fondo al cargar el componente
        document.body.classList.add('login-background');
        return () => {
            // Remover clase de fondo al desmontar el componente
            document.body.classList.remove('login-background');
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setError(''); // Limpiar el mensaje de error previo

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Enviar credenciales como JSON
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar token y rol en localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);

                // Redirigir según el rol
                if (data.role === 'admin') {
                    navigate('/admin/dashboard'); // Verifica que esta ruta sea correcta
                } else {
                    navigate('/user');
                }
            } else {
                // Establecer mensaje de error si la respuesta no es ok
                setError(data.msg || 'Error de autenticación.'); 
            }
        } catch (err) {
            console.error('Error:', err); // Mostrar error en la consola
            setError('Error en la conexión al servidor.'); // Mensaje de error para el usuario
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Correo</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Actualizar estado del email
                            required // Campo requerido
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Actualizar estado de la contraseña
                            required // Campo requerido
                        />
                    </div>
                    <button type="submit">Ingresar</button>
                </form>
                {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error si existe */}
                <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
            </div>
        </div>
    );
}

export default Login;