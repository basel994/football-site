"use client"
import { useUser } from "@/context/userContext/userContext";
import styles from "./headerStyles/user.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function User() {
    const {user, setUser} = useUser();
    const [show, setShow] = useState<boolean>(false);
    const router = useRouter();
    const arrowClicked = () => {
        setShow(!show);
    }
    const logoutClicked = () => {
        setUser(null);
        router.push("/");
    }
    return(
        <div className={styles.user}>
        {
            user && <div className={styles.details}>
                <Image src={user.image ? user.image : "/images/auth/user.ico"} 
                alt="" 
                width={15} 
                height={15} />
                <p>{user.name} {user.last}</p>
                <div className={styles.arrow} onClick={arrowClicked}>
                    <Image src="/images/arrows/angle-arrow-down.ico" 
                    alt="" 
                    width={10} 
                    height={10}
                    />
                </div>
            </div>
        }
            <div className={`${styles.options} ${show ? styles.showOptions : null}`}>
                <p>إعـدادات</p>
                <div className={styles.logout} onClick={logoutClicked}><p>تسجيل الخروج</p></div>
            </div>
        </div>
    );
}