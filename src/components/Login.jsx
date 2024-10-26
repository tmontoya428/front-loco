import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado para errores
    const navigate = useNavigate();

    useEffect(() => {
        // Cambia la clase del body cuando el componente se monta
        document.body.classList.add('login-background');

        // Limpia la clase cuando el componente se desmonta
        return () => {
            document.body.classList.remove('login-background');
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores anteriores
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Guarda el token y el rol en localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);

                // Verifica que el token y el rol se están guardando
                console.log('Token:', localStorage.getItem('token'));
                console.log('Role:', localStorage.getItem('role'));

                // Redirige basado en el rol del usuario
                navigate(data.role === 'admin' ? '/admin' : '/user');
            } else {
                console.error('Error de autenticación:', data.msg);
                setError(data.msg); // Muestra el mensaje de error
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Error en la conexión al servidor.'); // Mensaje de error genérico
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Ingresar</button>
                </form>
                {error && <p className="error-message">{error}</p>} {/* Mensaje de error */}
                <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
            </div>
        </div>
    );
}

export default Login;