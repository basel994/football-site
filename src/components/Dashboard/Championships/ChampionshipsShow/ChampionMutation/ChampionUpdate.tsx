"use client"
import styles from "./championMutation.module.css";
import { updateChampionship } from "@/apiFetching/championships/updateChampionship";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import FileInput from "@/components/Form/FileInput/FileInput";
import TextInput from "@/components/Form/TextInput/TextInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChampionUpdate({id, name}: {id: string; name: string}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [ newName, setNewName ] = useState<string>(name);
    const [ newLogo, setNewLogo ] = useState<File | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const modalBody = <div className={styles.modalBody}>
        <TextInput label="أدخـل اسم البطولــة الجـديد" 
        type="text" 
        value={newName}
        setState={setNewName}/>
        <FileInput label="تغييـر الشعـار" 
        icon="/images/dashboard/championship/uploadpicture.ico" 
        setState={setNewLogo}/>
    </div>
    const onOk = async () => {
        if(!newName) {
            setError("الرجـاء إدخـال اسم جديـد للبطـولـة!");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("newName", newName);
            if(newLogo) {
                formData.append("newLogo", newLogo);
            }
            const callAddFun = await updateChampionship(id, formData);
            if(callAddFun.error) {
                setLoading(false);
                setMessage("");
                setError(callAddFun.error);
            }
            else if(callAddFun.message) {
                setLoading(false);
                setError("");
                setMessage(callAddFun.message);
                router.refresh();
            }
        }
    }
    const updateClicked = () => {
        setVisible(true);
        setNewName(name);
        setNewLogo(null);
        setError("");
        setMessage("");
    }
    return(
        <>
            <CustomButton title="تعديـل" 
            bg="rgb(8, 92, 92)" 
            color="white" 
            clicked={updateClicked}/>
            <CustomModal visible={visible} 
            setVisible={setVisible}  
            title="تعديـل بطولــة" 
            body= {modalBody} 
            onOk={onOk} 
            okButtonName={loading ? "جـارِ التعديـل..." : "تعديـل"}
            message={message} 
            error={error} />
        </>
    );
}