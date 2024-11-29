"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./userMutation.module.css";
import { useUser } from "@/context/userContext/userContext";
import TextInput from "@/components/Form/TextInput/TextInput";
import { userNameupdate } from "@/apiFetching/users/userNameUpdate";

export default function UserNameUpdate({id}: {id: number}) {
    const [newName, setNewName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const router = useRouter();
    const modalBody = <div className={styles.modalBody}>
        <TextInput label="أدخل الاسم الجديد" 
        type="text"
        value={newName} 
        setState={setNewName} /> 
    </div>
    const editClicked = () => {
        setVisible(true);
    }
    const {setUser} = useUser();
    const onOk = async() => {
        if(!newName) {
            setVisible(false);
        }
        else {
            setLoading(true);
            const callFun = await userNameupdate(id, newName);
            if(callFun.error) {
                setLoading(false);
                setMessage("");
                setError(callFun.error);
            }
            else if(callFun.data) {
                setLoading(false);
                setError("");
                setMessage("تم تعديل الاسم بنجـاح");
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