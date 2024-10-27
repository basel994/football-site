"use client"
import { useNavContext } from "@/context/navContext/navContext";
import styles from "./headerStyles/toggle.module.css";

export default function Toggle() {
    const {show, setShow} = useNavContext();
    const toogleClicked = () => {
        setShow(!show);
    }
    return(
        <div className={`${styles.toggle} ${show ? styles.toggled : null}`} onClick={toogleClicked}>
            <span></span>
        </div>
    );
}