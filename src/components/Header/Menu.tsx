"use client"
import Link from "next/link";
import styles from "./headerStyles/menu.module.css";
import { useNavContext } from "@/context/navContext/navContext";
import { useUser } from "@/context/userContext/userContext";
export default function Menu() {
    const {show} = useNavContext();
    const {user} = useUser();
    return(
        <div className={`${styles.menu} ${show?styles.smallScreenShow:styles.smallScreenHide}`}>
            <Link href="/"> <p> الرئيسية </p> </Link>
            <Link href="/matches"> <p> مبـاريـات </p> </Link>
            <Link href="/"> <p> فـرق </p> </Link>
            <Link href="/players"> <p> لاعبـون </p> </Link>
            {user && user.role === "admin" ? <Link href="/dashboard"><p>لوحة التحكـم</p> </Link> : null}
        </div>
    );
}