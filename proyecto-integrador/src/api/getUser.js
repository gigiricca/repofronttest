// getUser.js

// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUser = async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/usuarios/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario');
    }
    return response.json();
};
