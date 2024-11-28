"use client"
import { deleteNew } from "@/apiFetching/news/deleteNew";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChampionDelete({id, name}: {id: number; name: string}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const modalBody = <div>
        <h3>
            {`هل تريـد بالتأكيـد حـذف الخبـر: ${name} ؟`}
        </h3>
    </div>
    const onOk = async () => {
        const callDelete = await deleteNew(id);
        if(callDelete.error) {
            setMessage("");
            setError(callDelete.error);
        }
        else if(callDelete.message) {
            setError("");
            setMessage(callDelete.message);
            router.push("/dashboard/news");
        }
    }
    const deleteClicked = () => {
        setVisible(true);
    }
    return(
        <>
            <CustomButton title="حــذف" 
            bg="red" 
            color="white" 
            clicked={deleteClicked}/>
            <CustomModal visible={visible} 
            setVisible={setVisible} 
            warning 
            title="حــذف خبـر" 
            body= {modalBody} 
            onOk={onOk} 
            message={message} 
            error={error} />
        </>
    );
}