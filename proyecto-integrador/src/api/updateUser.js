// updateUser.js

// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateUser = async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
    }

    return response.json();
};



