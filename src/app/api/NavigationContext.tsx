"use client"
import React, { createContext, useState, ReactNode } from 'react';

interface NavigationContextType {
    walletAddress: string | null;
    setWalletAddress: (address: string | null) => void;
}

const defaultValues: NavigationContextType = {
    walletAddress: "",
    setWalletAddress: () => { } // Placeholder function
};

const NavigationContext = createContext<NavigationContextType>(defaultValues);

interface NavigationProviderProps {
    children: ReactNode;
}

const NavigationProvider = ({ children }: NavigationProviderProps) => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    return (
        <NavigationContext.Provider value={{ walletAddress, setWalletAddress }}>
            {children}
        </NavigationContext.Provider>
    );
};

export { NavigationContext, NavigationProvider };
