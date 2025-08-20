import type { ReactNode } from "react";
import { AuthProvider } from "./authProvider";

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
    <AuthProvider>
        {children}
    </AuthProvider>
);