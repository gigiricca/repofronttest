import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCateringStates } from '../Components/utils/globalContext';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/UserPanel.css';
import '../Styles/Favorites.css';

const Favorites = () => {
    const { state, dispatch } = useCateringStates();
    const { favs, userData } = state;
    const [isEditing, setIsEditing] = useState(false);
    const [favoritos, setFavoritos] = useState([])
    const navigate = useNavigate()
    // Función para obtener las iniciales del usuario
    const getInitials = (nombre, apellido) => {
        return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
    };
    useEffect(() => {
        axios.get(`http://localhost:3000/api/favoritos/${userData.id}`)
            .then(response => {
                setFavoritos(response.data);
                console.log(response.data);
                dispatch({type: "ADD_FAVORITES", payload: favoritos})
            })
            .catch(error => console.error("Error al obtener favoritos:", error));
        }, [userData.id]);
        

    const handleEditClick = (userId) => {
        console.log(`Edit user with ID: ${userId}`);
    };

    const toggleFavorito = (productoId) => {
        console.log("Datos enviados a la API:", { usuarioId: state.userData.id, productoId });
        axios.post(`http://localhost:3000/api/favoritos`, { usuarioId: state.userData.id, productoId })
            .then(response => {
            console.log(response);
            if(response.status === 200){
                axios.get(`http://localhost:3000/api/favoritos/${userData.id}`)
                    .then(response => {
                        setFavoritos(response.data);
                        console.log(response.data);
                        dispatch({type: "ADD_FAVORITES", payload: favoritos})
                    })
            }
            })
            .catch(error => console.error("Error al eliminar favorito:", error));
        };

    return (
        <div className='user-panel'>
            <section className='left-side'>
                <div className='user-avatar'>
                    {userData ? getInitials(userData.nombre, userData.apellido) : 'U'}
                </div>
                <p className='name'>
                    {userData ? `${userData.nombre} ${userData.apellido}` : 'Usuario'}
                </p>
                <p className='email'>{userData ? userData.email : ''}</p>
                {!isEditing && (
                    <button className='edit-button' onClick={() => handleEditClick(userData?.id)}>
                        Editar
                    </button>
                )}
            </section>
            <section className="favorites">
                <h2>Mis Favoritos</h2>
                <div className="favorites-list">
                    {favoritos.length === 0 ? (
                        <p>No hay ningún elemento favorito</p>
                    ) : (
                        favoritos.map((product, index) => (
                            <div key={index} className="favorite-card">
                                {/* Acceder a la primera imagen del array */}
                                <img 
                                    src={product.imagenes.length > 0 ? product.imagenes[0].url : 'default-image.jpg'} 
                                    alt={`favorite-${index}`} 
                                />
                                <div className="favorite-info">
                                    <h3>{product.nombre}</h3>
                                    <p>{product.descripcion}</p>
                                    <div className="favorite-buttons">
                                        <button className="delete-button" onClick={() => toggleFavorito(product.id)}>Eliminar</button>
                                        <Link to={`/detail/${product.id}`} className="detail-button">
                                            Ver detalle
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Favorites;
