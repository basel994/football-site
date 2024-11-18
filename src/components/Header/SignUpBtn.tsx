"use client"
import Link from "next/link";
import CustomButton from "../CustomButton/CustomButton";
import { useUser } from "@/context/userContext/userContext";

export default function SignUpBtn() {
    const { user } = useUser();
    return(
        <>
          {
            !user && <Link href="/signUp" >
                <CustomButton title="التسجيل" 
                color="orangered" 
                icon="/images/navbar/signUp.ico" />
            </Link>
            
          }  
        </>
    );
}