"use client"
import styles from "./newMutation.module.css";
import { updateNew } from "@/apiFetching/news/updateNew";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import FileInput from "@/components/Form/FileInput/FileInput";
import TextAreaInput from "@/components/Form/TextAreaInput/TextAreaInput";
import { NewType } from "@/types/newType";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChampionUpdate({newData}: {newData: NewType}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [ newTitle, setNewTitle ] = useState<string>(newData.title);
    const [ newContent, setNewContent ] = useState<string>(newData.content);
    const [ newImage, setNewImage ] = useState<File | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const modalBody = <div className={styles.modalBody}>
        <TextAreaInput label="أدخل عنوان الخبـر" 
        rows={1} 
        cols={30} 
        value={newTitle} 
        setState={setNewTitle} />
        <TextAreaInput label="أدخل تفاصيل الخبـر" 
        rows={5} 
        cols={30}
        value={newContent} 
        setState={setNewContent} />
        <FileInput label="تغييـر صورة الخبـر" 
        icon="/images/dashboard/championship/uploadpicture.ico" 
        setState={setNewImage}/>
    </div>
    const onOk = async () => {
        if(!newTitle || !newContent) {
            setError("الرجـاء إدخـال جميع الحقول!");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("newTitle", newTitle);
            formData.append("newContent", newContent);
            if(newImage) {
                formData.append("newImage", newImage);
            }
            const callAddFun = await updateNew(newData.id, formData);
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
        setNewTitle(newData.title);
        setNewContent(newData.content);
        setNewImage(null);
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
            title="تعديـل خبر" 
            body= {modalBody} 
            onOk={onOk} 
            okButtonName={loading ? "جـارِ التعديـل..." : "تعديـل"}
            message={message} 
            error={error} />
        </>
    );
}