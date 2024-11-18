"use client"
import Link from "next/link";
import CustomButton from "../CustomButton/CustomButton";
import { useUser } from "@/context/userContext/userContext";

export default function LoginBtn() {
    const { user } = useUser();
    return(
        <>
          {
            !user && <Link href="/login" >
                <CustomButton title="تسجيل الدخـول" 
                color="orangered" 
                icon="/images/navbar/login.ico" />
            </Link>
            
          }  
        </>
    );
}