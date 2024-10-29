"use client"
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./addChampion.module.css";
import { useState } from "react";
import TextInput from "@/components/Form/TextInput/TextInput";
import FileInput from "@/components/Form/FileInput/FileInput";
import { addNewChampionship } from "@/apiFetching/championships/addNewChampionship";
import { useRouter } from "next/navigation";

export default function AddChampion() {
    const router = useRouter();
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ name, setName ] = useState<string | undefined >(undefined);
    const [ logo, setLogo ] = useState<File | undefined>(undefined);
    const [ error, setError ] = useState<string | undefined>(undefined);
    const [ message, setMessage ] = useState<string | undefined>(undefined);
    const onOk = async () => {
        if(!name || !logo) {
            setError("جميـع الحقـول مطلوبـة");
        }
        else {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("logo", logo);
            const callAddFun = await addNewChampionship(formData);
            if(callAddFun.error) {
                setMessage(undefined);
                setError(callAddFun.error);
                setVisible(false);
            }
            else if(callAddFun.message) {
                setError(undefined);
                setMessage(callAddFun.message);
                setVisible(false);
                router.refresh();
            }
        }
    }
    const hide = () => {
        setError(undefined);
        setMessage(undefined);
    }
    const modalBody = <div className={styles.modalBody}>
        <TextInput label="أدخـل اسم البطولــة" 
        type="text" 
        setState={setName}/>
        <FileInput label="تحميـل الشعـار" 
        icon="/images/dashboard/championship/uploadpicture.ico" 
        setState={setLogo}/>
    </div>
    return(
        <>
            <div className={styles.container} title="إضافة بطولـة جديـدة" onClick={()=>setVisible(!visible)}>
                <span className={styles.add}></span>
            </div>
            <CustomModal visible={visible} setVisible={setVisible} 
            title="إضافـة بطولــة جديـدة" 
            body={modalBody} 
            onOk={onOk}/>
            {
                error || message && 
                <div className={styles.response}>
                    {
                        error ? 
                        <p className={styles.error}>{error}</p> : 
                        <p className={styles.success}>{message}</p>
                    }
                    <div className={styles.close} onClick={hide}>
                        <span></span>
                    </div>
                </div>
            }
        </>
    );
}