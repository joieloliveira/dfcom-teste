import React, { createContext } from 'react';
import { AuthProvider } from './AuthContext';

const ContextAuth = createContext();

function AllContextProvider({ children }) {

    return (
        <ContextAuth.Provider value={{

        }}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ContextAuth.Provider>

    );
}

export { ContextAuth, AllContextProvider };