"use client"
import { UserType } from "@/types/userType"
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    user: UserType | null; 
    setUser: (user: UserType) => void;
}
const UserContext = createContext<UserContextType | null>(null);
export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<UserType | null>(null);  
    useEffect(() => {   
        const storedUser = localStorage.getItem('user');  
        if (storedUser) {  
            setUser(JSON.parse(storedUser));  
        }  
    }, []);  
 
    useEffect(() => {  
        if (user) {  
            localStorage.setItem('user', JSON.stringify(user));  
        } else {  
            localStorage.removeItem('user'); 
        }  
    }, [user]); 
    return (  
        <UserContext.Provider value={{ user, setUser }}>  
            {children}  
        </UserContext.Provider>  
    );
}
export const useUser = (): UserContextType => {  
    const context = useContext(UserContext);  
    if (!context) {  
        throw new Error('useUser must be used within a UserProvider');  
    }  
    return context;  
};