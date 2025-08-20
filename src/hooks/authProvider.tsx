import { type ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { AuthContext } from "./authContext";

export interface IUser {
    id: number;
    name: string;
    email: string;
    roles: string;
    status: boolean;
}

interface ISignInData {
    email: string;
    password: string;
}

export interface IAuthContext {
    user: IUser;
    signIn: (data: ISignInData) => Promise<void>;
    signOut: () => void;
}

interface AuthProviderProps {
    children: ReactNode
}

interface AuthProps {
    token: string;
    user: IUser;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const [data, setData] = useState(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }
        delete api.defaults.headers.Authorization;

        return {} as AuthProps;

    });
    const signIn = async ({ email, password }: ISignInData) => {
        const response = await api.post('/auth/login', {
            email,
            password
        });
        const user = response.data.user;
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user || {}));

        setData({ token, user });
        api.defaults.headers.Authorization = `Bearer ${token}`;
        navigate('/');
    };

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setData({} as AuthProps);
        navigate('/login');
    };


    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
