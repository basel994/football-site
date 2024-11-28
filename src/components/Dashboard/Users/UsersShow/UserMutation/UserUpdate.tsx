"use client"
import { updateUser } from "@/apiFetching/users/updateUser";
import styles from "./userMutation.module.css";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import FileInput from "@/components/Form/FileInput/FileInput";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import TextInput from "@/components/Form/TextInput/TextInput";
import { UserType } from "@/types/userType";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserUpdate({userData}: {userData: UserType}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [ newName, setNewName ] = useState<string>(userData.name);
    const [ newLast, setNewLast ] = useState<string>(userData.last);
    const [ newPassword, setNewPassword ] = useState<string>(userData.password);
    const [ newRole, setNewRole ] = useState<string>(userData.role);
    const [ newImage, setNewImage ] = useState<File | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const type = [
        {key: "مستخدم عادي", value: "normal"}, 
        {key: "مستخدم رئيس", value: "admin"},
    ]
    const modalBody = <div className={styles.modalBody}>
        <TextInput label="أدخل اسم المستخدم" 
        type="text" 
        value={newName}
        setState={setNewName} />
        <TextInput label="أدخل الاسم الأخير للمستخدم" 
        type="text" 
        value={newLast}
        setState={setNewLast} />
        <TextInput label="أدخل كلمة المرور" 
        type="password" 
        value={newPassword}
        setState={setNewPassword} />
        <SelectInput label="اختر نوع المستخدم" 
        options={type} 
        value={newRole}
        setValue={setNewRole} />
        <FileInput label="تغييـر صورة الخبـر" 
        icon="/images/dashboard/championship/uploadpicture.ico" 
        setState={setNewImage}/>
    </div>
    const onOk = async () => {
        if(!newName || !newLast || !newPassword || !newRole) {
            setError("الرجـاء إدخـال جميع الحقول!");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("newName", newName);
            formData.append("newLast", newLast);
            formData.append("newPassword", newPassword);
            formData.append("newRole", newRole);
            if(newImage) {
                formData.append("newImage", newImage);
            }
            const callAddFun = await updateUser(userData.id, formData);
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
        setNewName(userData.name);
        setNewLast(userData.last);
        setNewPassword(userData.password);
        setNewRole(userData.role);
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
            title="تعديـل مستخدم" 
            body= {modalBody} 
            onOk={onOk} 
            okButtonName={loading ? "جـارِ التعديـل..." : "تعديـل"}
            message={message} 
            error={error} />
        </>
    );
}