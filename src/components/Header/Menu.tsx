"use client"
import Link from "next/link";
import styles from "./headerStyles/menu.module.css";
import { useNavContext } from "@/context/navContext/navContext";
export default function Menu() {
    const {show} = useNavContext();
    return(
        <div className={`${styles.menu} ${show?styles.smallScreenShow:styles.smallScreenHide}`}>
            <Link href="/"> <p> الرئيسية </p> </Link>
            <Link href="/"> <p> مبـاريـات </p> </Link>
            <Link href="/"> <p> فـرق </p> </Link>
            <Link href="/"> <p> لاعبـون </p> </Link>
        </div>
    );
}