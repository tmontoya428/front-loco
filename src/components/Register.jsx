import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        birthdate: '',
        idCard: '',
        email: '',
        phone: '',
        city: '',
        password: ''
    });

    const [message, setMessage] = useState('');  // Para mostrar mensajes de éxito o error
    const navigate = useNavigate();  // Para redirigir al login después del registro exitoso

    useEffect(() => {
        // Cambia la clase del body cuando el componente se monta
        document.body.classList.add('register-background');

        // Limpia la clase cuando el componente se desmonta
        return () => {
            document.body.classList.remove('register-background');
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validaciones básicas
        if (!formData.email || !formData.password || !formData.name || !formData.idCard) {
            setMessage('Por favor, completa todos los campos obligatorios');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Registro exitoso. Redirigiendo a inicio de sesión...');
                setTimeout(() => {
                    navigate('/'); // Redirige a la página de login después de 2 segundos
                }, 2000);
            } else {
                setMessage(data.msg || 'Error en el registro');
            }
        } catch (err) {
            console.error('Error:', err);
            setMessage('Error en la conexión con el servidor');
        }
    };

    return (
        <div className="register-container">
            <h2>Registro</h2>
            {message && <p className="message">{message}</p>} {/* Muestra el mensaje */}

            {/* Botón para regresar al inicio de sesión */}
            <button className="back-button" onClick={() => navigate('/')}>←</button>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <label htmlFor="birthdate">Fecha de Nacimiento</label>
                <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                />

                <label htmlFor="idCard">Cédula</label>
                <input
                    type="text"
                    id="idCard"
                    name="idCard"
                    value={formData.idCard}
                    onChange={handleChange}
                />

                <label htmlFor="email">Correo</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <label htmlFor="phone">Celular</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <label htmlFor="city">Ciudad</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />

                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
