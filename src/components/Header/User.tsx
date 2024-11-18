"use client"
import { useUser } from "@/context/userContext/userContext";

export default function User() {
    const {user} = useUser();
    return(
        <>
        {
            user && <p>{user.name} {user.last}</p>
        }
        </>
    );
}