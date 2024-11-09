"use client"
import { deletePlayer } from "@/apiFetching/players/deletePlayer";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlayerDelete({id}: {id: number;}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const modalBody = <div>
        <h3>
            {`هل تريـد بالتأكيـد حـذف اللاعب ؟`}
        </h3>
    </div>
    const onOk = async () => {
        const callDelete = await deletePlayer(id);
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
            title="حــذف لاعب" 
            body= {modalBody} 
            onOk={onOk} 
            message={message} 
            error={error} />
        </>
    );
}