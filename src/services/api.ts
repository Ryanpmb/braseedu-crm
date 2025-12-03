import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 10000,
});

// api.interceptors.response.use(
//   async (response: AxiosResponse): Promise<AxiosResponse> => {
//     return response;
//   },
//   async (error) => {
//     const pathname = window.location.pathname;
//     if (error.response && error.response.status === 403 && pathname !== '/login') {
//       localStorage.removeItem('token');
//       window.location.href = '/';
//     }

//     return Promise.reject(error);
//   }
// );

api.interceptors.request.use(async (request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers.Authorization = `Bearer ` + token;
    }

    return request;
});