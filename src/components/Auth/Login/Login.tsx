"use client"
import TextInput from "@/components/Form/TextInput/TextInput";
import styles from "./login.module.css";
import { useState } from "react";
import CustomButton from "@/components/CustomButton/CustomButton";
import Image from "next/image";
import { checkUser } from "@/apiFetching/users/checkUser";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext/userContext";

export default function Login() {
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const {setUser} = useUser();
    const router = useRouter();
    const loginClicked = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!name || !password) {
            setError("الرجاء ادخال اسم المستخدم وكلمة المرور!");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("password", password);
            const callFun = await checkUser(formData);
            if(callFun.error) {
                setLoading(false);
                setError(callFun.error);
            }
            else if(callFun.data) {
                setUser(callFun.data);
                router.push("/");
            }
        }
    }
    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={loginClicked}>
               <Image src="/images/auth/login.ico" 
               alt="" 
               width={40} 
               height={40} />
                <TextInput label="أدخل الاســم" type="text" setState={setName} value={name} />
                <TextInput label="أدخل كلمـة المرور" type="password" setState={setPassword} value={password} />
                <p className={styles.error}>{error}</p>
                <CustomButton title={loading? "جـارِ التحقـق ..." : "دخـول"} 
                bg="rgb(155, 236, 130)" />
            </form>
        </div>
    );
}