import Link from "next/link";
import CustomButton from "../CustomButton/CustomButton";
import styles from "./headerStyles/userAuth.module.css";
import User from "./User";

export default function UserAuth() {
    return(
        <div className={styles.auth}>
            <Link href="/signUp" >
            <CustomButton title="التسجيل" 
            color="orangered" 
            icon="/images/navbar/signUp.ico" />
            </Link>
            <Link href="/login">
            <CustomButton title="تسجيل الـدخول" 
            color="orangered" 
            icon="/images/navbar/login.ico" />
            </Link>
            <User />
        </div>
    );
}