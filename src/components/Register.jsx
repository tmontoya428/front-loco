import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const API_URL = 'http://localhost:5000/api/register'; // URL de la API

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

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('register-background');
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
        if (!formData.email || !formData.password || !formData.name || !formData.idCard) {
            setMessage('Por favor, completa todos los campos obligatorios');
            return;
        }

        try {
            const response = await fetch(API_URL, {
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
            {message && <p className="message">{message}</p>} 

            <button className="back-button" onClick={() => navigate('/')}>←</button>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required // Campo requerido
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
                    required // Campo requerido
                />

                <label htmlFor="email">Correo</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required // Campo requerido
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
                    required // Campo requerido
                />

                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
