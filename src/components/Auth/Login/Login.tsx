"use client"
import TextInput from "@/components/Form/TextInput/TextInput";
import styles from "./login.module.css";
import { useState } from "react";
import CustomButton from "@/components/CustomButton/CustomButton";
import Image from "next/image";

export default function Login() {
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    return(
        <div className={styles.container}>
            <form className={styles.form}>
               <Image src="/images/auth/login.ico" 
               alt="" 
               width={40} 
               height={40} />
                <TextInput label="أدخل الاســم" type="text" setState={setName} value={name} />
                <TextInput label="أدخل كلمـة المرور" type="password" setState={setPassword} value={password} />
                <CustomButton title="دخـول" bg="rgb(155, 236, 130)" />
            </form>
        </div>
    );
}