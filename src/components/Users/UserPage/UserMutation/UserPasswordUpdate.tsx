"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./userMutation.module.css";
import { useUser } from "@/context/userContext/userContext";
import TextInput from "@/components/Form/TextInput/TextInput";
import { userPasswordupdate } from "@/apiFetching/users/userPasswordUpdate";

export default function UserPasswordUpdate({id}: {id: number}) {
    const [newPassword, setNewPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const router = useRouter();
    const modalBody = <div className={styles.modalBody}>
        <TextInput label="أدخل كلمة المرور الجديدة" 
        type="password"
        value={newPassword} 
        setState={setNewPassword} /> 
    </div>
    const editClicked = () => {
        setVisible(true);
    }
    const {setUser} = useUser();
    const onOk = async() => {
        if(!newPassword) {
            setVisible(false);
        }
        else {
            setLoading(true);
            const callFun = await userPasswordupdate(id, newPassword);
            if(callFun.error) {
                setLoading(false);
                setMessage("");
                setError(callFun.error);
            }
            else if(callFun.data) {
                setLoading(false);
                setError("");
                setMessage("تم تعديل كلمة المرور بنجـاح");
                setUser(callFun.data);
                router.refresh();
            }
        }
    }
    return(
        <>
            <CustomButton icon="/images/controlIcons/edit.ico" clicked={editClicked}/>
            <CustomModal visible={visible} 
            setVisible={setVisible} 
            title="تعديل الحساب " 
            body={modalBody} 
            onOk={onOk} 
            okButtonName={loading ? "جارِ التعديل" : "تعديل"} 
            message={message} 
            error={error} />
        </>
    );
}