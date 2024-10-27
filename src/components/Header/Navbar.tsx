import Image from "next/image";
import styles from "./headerStyles/navbar.module.css";
import Menu from "./Menu";
import UserAuth from "./UserAuth";
import { NavProvider } from "@/context/navContext/navContext";
import Toggle from "./Toggle";
export default function Navbar() {
    return(
        <NavProvider>
            <div className={styles.navbar}>
                <div className={styles.brand}>
                    <Image src="/images/logo.ico" 
                    alt="" 
                    width={50}
                    height={50} />
                </div>
                <Menu />
                <UserAuth />
                <Toggle />
            </div>
        </NavProvider>
    );
}