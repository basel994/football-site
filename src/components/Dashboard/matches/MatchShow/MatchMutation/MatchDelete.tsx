"use client"
import { deleteMatch } from "@/apiFetching/matches/deleteMatch";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MatchDelete({id}: {id: string;}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const modalBody = <div>
        <h3>
            {`هل تريـد بالتأكيـد حـذف المباراة ؟`}
        </h3>
    </div>
    const onOk = async () => {
        const callDelete = await deleteMatch(id);
        if(callDelete.error) {
            setMessage("");
            setError(callDelete.error);
        }
        else if(callDelete.message) {
            setError("");
            setMessage(callDelete.message);
            router.refresh();
        }
    }
    const deleteClicked = () => {
        setVisible(true);
    }
    return(
        <>
            <CustomButton title="حــذف" 
            bg="rgb(230, 174, 174)" 
            clicked={deleteClicked}/>
            <CustomModal visible={visible} 
            setVisible={setVisible} 
            warning 
            title="حــذف مباراة" 
            body= {modalBody} 
            onOk={onOk} 
            message={message} 
            error={error} />
        </>
    );
}