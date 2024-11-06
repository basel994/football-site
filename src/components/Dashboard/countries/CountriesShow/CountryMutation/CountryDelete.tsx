"use client"
import { deleteCountry } from "@/apiFetching/countries/deleteCountry";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CountryDelete({id, name}: {id: number; name: string}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const modalBody = <div>
        <h3>
            {`هل تريـد بالتأكيـد حـذف المنتخـب: ${name} ؟`}
        </h3>
    </div>
    const onOk = async () => {
        const callDelete = await deleteCountry(id);
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
            bg="red" 
            color="white" 
            clicked={deleteClicked}/>
            <CustomModal visible={visible} 
            setVisible={setVisible} 
            warning 
            title="حــذف منتخـب" 
            body= {modalBody} 
            onOk={onOk} 
            message={message} 
            error={error} />
        </>
    );
}