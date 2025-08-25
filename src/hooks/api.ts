import axios, { AxiosError } from "axios";

// export const baseURL = import.meta.env.VITE_REACT_APP_ENDPOINT;
const baseURL = "http://localhost:8080/api";
const headers = () => {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-Custom-Header": "foobar",
    };
};

const api = axios.create({
    baseURL,
    timeout: 500000,
    headers: headers(),
});

export default api;

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            if (window.location.pathname !== "/login") {
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
);