"use client"
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./addNew.module.css";
import { useState } from "react";
import FileInput from "@/components/Form/FileInput/FileInput";
import { useRouter } from "next/navigation";
import { addNew } from "@/apiFetching/news/addNew";
import TextAreaInput from "@/components/Form/TextAreaInput/TextAreaInput";

export default function AddNew() {
    const router = useRouter();
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ title, setTitle ] = useState<string>("");
    const [ content, setContent ] = useState<string>("");
    const [ image, setImage ] = useState<File | null>();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");
    const onAddClicked = () => {
        setVisible(true);
        setError("");
        setMessage("");
        setTitle("");
        setContent("");
        setImage(null);
    }
    const onOk = async () => {
        if(!title || !content || !image) {
            setError("جميـع الحقـول مطلوبـة");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("image", image);
            const callAddFun = await addNew(formData);
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
    const modalBody = <div className={styles.modalBody}>
        <TextAreaInput label="أدخـل عنـوان الخبـر" 
        rows={1} 
        cols={20}
        value={title}
        setState={setTitle}/>
        <TextAreaInput label="أدخـل تفاصيل الخبـر" 
        rows={5} 
        cols={20}
        value={content}
        setState={setContent}/>
        <FileInput label="تحميـل صورة" 
        icon="/images/dashboard/championship/uploadpicture.ico" 
        setState={setImage}/>
    </div>
    return(
        <>
            <div className={styles.container}>
                <div className={styles.add} title="إضافة خبـر جديـد" onClick={onAddClicked}>
                    <span></span>
                </div>
            </div>
            <CustomModal visible={visible} setVisible={setVisible} 
            title="إضافـة خبـر جديـد" 
            body={modalBody} 
            onOk={onOk} 
            message={message} 
            error={error} 
            okButtonName={loading ? "جـارِ الإضافــة..." : "إضافــة"}/>
        </>
    );
}