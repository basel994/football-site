"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileInput from "@/components/Form/FileInput/FileInput";
import { userImageupdate } from "@/apiFetching/users/userImageUpdate";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import { useUser } from "@/context/userContext/userContext";

export default function UserImageUpdate({id}: {id: number}) {
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const router = useRouter();
    const modalBody = <div>
        <FileInput label="تحديد صـورة" setState={setImage} />
    </div>
    const editClicked = () => {
        setVisible(true);
    }
    const {setUser} = useUser();
    const onOk = async() => {
        if(!image) {
            setVisible(false);
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("image", image);
            const callFun = await userImageupdate(id, formData);
            if(callFun.error) {
                setLoading(false);
                setMessage("");
                setError(callFun.error);
            }
            else if(callFun.data) {
                setLoading(false);
                setError("");
                setMessage("تم تعديل الصورة بنجـاح");
                setUser(callFun.data);
                router.refresh();
            }
        }
    }
    return(
        <>
            <CustomButton icon="/images/controlIcons/image-editing.png" clicked={editClicked}/>
            <CustomModal visible={visible} 
            setVisible={setVisible} 
            title="تعديل صورة الملف الشخصي" 
            body={modalBody} 
            onOk={onOk} 
            okButtonName={loading ? "جارِ التعديل" : "تعديل"} 
            message={message} 
            error={error} />
        </>
    );
}