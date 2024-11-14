import { showErrorToast } from '@/kernel/sweet-alert/sweet-alert';
import AxiosClient from './axios';
import router from '@/router';
import { AxiosRequestConfig } from 'axios';
AxiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

AxiosClient.interceptors.response.use(
    (response) => {
        return Promise.resolve(response);
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            const errorMessage = data.message;
            switch (status) {
                case 400:
                    switch (errorMessage) {
                        case 'TOKEN_EXPIRED':
                            showErrorToast('Código expirado', 'Solicita un nuevo código de recuperación de contraseña');
                            break;
                        case 'INVALID_IMAGE':
                            showErrorToast('Imagen inválida');
                            break;
                        case 'MISSING_DESCRIPTION':
                            showErrorToast('La descripción es requerida');
                            break;
                        case 'EVENT_TYPE_NOT_FOUND':
                            showErrorToast('Tipo de evento no encontrado');
                            break;
                        case 'MISSING_NAME':
                            showErrorToast('El nombre es requerido');
                            break;
                        default:
                            showErrorToast('Error en la solicitud');
                            break;
                    }
                    break;
                case 401:
                    switch (errorMessage) {
                        case 'USER_BLOCKED':
                            showErrorToast('Usuario bloqueado', 'Contáctate con tu administrador');
                            break;
                        case 'BAD_CREDENTIALS':
                            showErrorToast('Credenciales incorrectas');
                            break;
                        default:
                            localStorage.removeItem('token');
                            if (router.currentRoute.name !== 'login') router.push({ name: 'login' });
                            showErrorToast('Sesión expirada', 'Es necesario iniciar sesión nuevamente');
                            break;
                    }
                    break;
                case 403:
                    showErrorToast('Acceso denegado');
                    break;
                case 404:
                    switch (errorMessage) {
                        // TODO: corregir error en backend
                        case 'USER_NOT_FOUND':
                            showErrorToast('Usuario no encontrado');
                            break;
                        default:
                            showErrorToast('Recurso no encontrado');
                            break;
                    }
                    break;
                case 409:
                    switch (errorMessage) {
                        case 'USER_ALREADY_EXISTS':
                            showErrorToast('Usuario duplicado');
                            break;
                        case 'EMAIL_ALREADY_EXISTS':
                            showErrorToast('Correo electrónico duplicado');
                            break;
                        case 'SUPPLIER_ALREADY_EXISTS':
                            showErrorToast('Proveedor duplicado');
                            break;
                        case 'EVENT_TYPE_ALREADY_EXISTS':
                            showErrorToast('El tipo de evento ya existe');
                            break;
                        default:
                            showErrorToast('Información duplicada');
                            break;
                    }
                    break;
                case 500:
                    switch (errorMessage) {
                        case 'IMAGE_UPLOAD_FAILED':
                            showErrorToast('Error al subir imagen');
                            break;
                        default:
                            showErrorToast('Error en el servidor');
                            break;
                    }
                default:
                    showErrorToast('Error inesperado');
                    break;
            }
        } else {
            showErrorToast('No se pudo conectar con el servidor');
        }
        return Promise.reject(error);
    }
);

export default {
    get(endpoint: string) {
        return AxiosClient.get(endpoint);
    },
    post(endpoint: string, payload: any, config?: AxiosRequestConfig) {
        return AxiosClient.post(endpoint, payload, config);
    },
    postBlob(endpoint: string, payload: any) {
        return AxiosClient.post(endpoint, payload, { responseType: 'blob' });
    },
    put(endpoint: string, payload: any) {
        return AxiosClient.put(endpoint, payload);
    },
    patch(endpoint: string, payload: any) {
        return AxiosClient.patch(endpoint, payload);
    },
}