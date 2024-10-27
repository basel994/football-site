"use client"
import { createContext, useContext, useState } from "react";

type NavContextType = {
    show: boolean;
    setShow: (show: boolean) => void;
}
const initialContext = {
    show: false,
    setShow: (show: boolean) => {},
}
const NavContext = createContext<NavContextType>(initialContext);
export const NavProvider = ({children}: {children: React.ReactNode}) => {
    const [show, setShow] = useState<boolean>(false);
    return(
        <NavContext.Provider value={{show, setShow}}>
            {children}
        </NavContext.Provider>
    );
}
export const useNavContext = (): NavContextType => {
    const context = useContext(NavContext);
    if (!context) {  
        throw new Error('useNavContext must be used within a NavProvider');  
    } 
    return context;
}