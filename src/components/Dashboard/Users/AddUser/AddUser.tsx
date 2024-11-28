"use client"
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./addUser.module.css";
import { useState } from "react";
import FileInput from "@/components/Form/FileInput/FileInput";
import { useRouter } from "next/navigation";
import { addUser } from "@/apiFetching/users/addUser";
import TextInput from "@/components/Form/TextInput/TextInput";
import SelectInput from "@/components/Form/SelectInput/SelectInput";

export default function AddUser() {
    const router = useRouter();
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ name, setName ] = useState<string>("");
    const [ last, setLast ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ role, setRole ] = useState<string>("");
    const [ image, setImage ] = useState<File | null>();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");
    const type = [
        {key: "مستخدم عادي", value: "normal"}, 
        {key: "مستخدم رئيس", value: "admin"}
    ]
    const onAddClicked = () => {
        setVisible(true);
        setError("");
        setMessage("");
        setName("");
        setLast("");
        setPassword("");
        setImage(null);
    }
    const onOk = async () => {
        if(!name || !last || !password || !role || !image) {
            setError("جميـع الحقـول مطلوبـة");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("last", last);
            formData.append("password", password);
            formData.append("role", role);
            formData.append("image", image);
            const callAddFun = await addUser(formData);
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
        <TextInput label="أدخـل الاسم الأول" 
        type="text"
        value={name}
        setState={setName}/>
        <TextInput label="أدخـل الاسم الأخير" 
        type="text"
        value={last}
        setState={setLast}/>
        <TextInput label="أدخـل كلمة المرور" 
        type="password"
        value={password}
        setState={setPassword}/>
        <SelectInput label="اختر نوع المستخدم" 
        options={type} 
        setValue={setRole} />
        <FileInput label="تحميـل صورة" 
        icon="/images/dashboard/championship/uploadpicture.ico" 
        setState={setImage}/>
    </div>
    return(
        <>
            <div className={styles.container}>
                <div className={styles.add} title="إضافة مستخدم جديـد" onClick={onAddClicked}>
                    <span></span>
                </div>
            </div>
            <CustomModal visible={visible} setVisible={setVisible} 
            title="إضافـة مستخدم جديـد" 
            body={modalBody} 
            onOk={onOk} 
            message={message} 
            error={error} 
            okButtonName={loading ? "جـارِ الإضافــة..." : "إضافــة"}/>
        </>
    );
}