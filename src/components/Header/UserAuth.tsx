import Link from "next/link";
import CustomButton from "../CustomButton/CustomButton";
import styles from "./headerStyles/userAuth.module.css";

export default function UserAuth() {
    return(
        <div className={styles.auth}>
            <Link href="/" >
            <CustomButton title="التسجيل" 
            color="orangered" 
            icon="/images/navbar/signUp.ico" />
            </Link>
            <Link href="/">
            <CustomButton title="تسجيل الـدخول" 
            color="orangered" 
            icon="/images/navbar/login.ico" />
            </Link>
        </div>
    );
}