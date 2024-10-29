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
    const [ name, setName ] = useState<string>("");
    const [ logo, setLogo ] = useState<File | null>();
    const [ error, setError ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");
    const onAddClicked = () => {
        setVisible(true);
        setError("");
        setMessage("");
        setName("");
        setLogo(null);
    }
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
                setMessage("");
                setError(callAddFun.error);
            }
            else if(callAddFun.message) {
                setError("");
                setMessage(callAddFun.message);
                router.refresh();
            }
        }
    }
    const modalBody = <div className={styles.modalBody}>
        <TextInput label="أدخـل اسم البطولــة" 
        type="text" 
        value={name}
        setState={setName}/>
        <FileInput label="تحميـل الشعـار" 
        icon="/images/dashboard/championship/uploadpicture.ico" 
        setState={setLogo}/>
    </div>
    return(
        <>
            <div className={styles.container}>
                <div className={styles.add} title="إضافة بطولـة جديـدة" onClick={onAddClicked}>
                    <span></span>
                </div>
            </div>
            <CustomModal visible={visible} setVisible={setVisible} 
            title="إضافـة بطولــة جديـدة" 
            body={modalBody} 
            onOk={onOk} 
            message={message} 
            error={error}/>
        </>
    );
}