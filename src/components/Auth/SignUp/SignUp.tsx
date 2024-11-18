"use client"
import TextInput from "@/components/Form/TextInput/TextInput";
import styles from "./signUp.module.css";
import { useState } from "react";
import CustomButton from "@/components/CustomButton/CustomButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signUpUser } from "@/apiFetching/users/signUpUser";
import { useUser } from "@/context/userContext/userContext";

export default function SignUp() {
    const {setUser} = useUser();
    const [name, setName] = useState<string>("");
    const [last, setLast] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const signUpClicked = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!name || !last || !password) {
            setError("الرجاء ادخال كل الحقـول!");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("last", last);
            formData.append("password", password);
            const callFun = await signUpUser(formData);
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
            <form className={styles.form} onSubmit={signUpClicked}>
               <Image src="/images/auth/signUp.ico" 
               alt="" 
               width={40} 
               height={40} />
                <TextInput label=" أدخل الاسم الأول" type="text" setState={setName} value={name} />
                <TextInput label="أدخل الاسم الأخير" type="text" setState={setLast} value={last} />
                <TextInput label="أدخل كلمـة المرور" type="password" setState={setPassword} value={password} />
                <p className={styles.error}>{error}</p>
                <CustomButton title={loading? "جـارِ التحقـق ..." : "تسجيل"} 
                bg="rgb(155, 236, 130)" />
            </form>
        </div>
    );
}