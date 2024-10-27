"use client"
import { createContext, useContext, useState } from "react";

type NavContextType = {
    show: boolean;
    setShow: (show: boolean) => void;
}
const initialContext = {
    show: false,
    setShow: () => {},
}
const NavContext = createContext<NavContextType>(initialContext);
export const NavProvider = ({children}: {children: React.ReactNode}) => {
    const [show, setShow] = useState<boolean>(initialContext.show);
    return(
        <NavContext.Provider value={{show, setShow}}>
            {children}
        </NavContext.Provider>
    );
}
export const useNavContext = (): NavContextType => {
    const context = useContext(NavContext);
    return context;
}