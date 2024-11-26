"use client"
import CustomButton from "@/components/CustomButton/CustomButton";
import styles from "./sidebar.module.css";
import { useState } from "react";
import Link from "next/link";

export default function DashboardSidebar() {
    const [show, setShow] = useState<boolean>(false);
    const showToggle = () => {
        setShow(!show);
    }
    return(
        <div className={styles.sidebar}>
            <CustomButton icon="/images/arrows/arrow-right.ico" clicked={showToggle} className={show ? styles.toggle : undefined} />
            <div className={`${styles.menu} ${show ? styles.showMenu : null}`}>
                <div className={styles.links}>
                    <Link href="/dashboard/news"><p>الأخبـار</p></Link>
                    <Link href="/dashboard/countries"><p>المنتخبـات</p></Link>
                    <Link href="/dashboard/teams"><p>الفـرق</p></Link>
                    <Link href="/dashboard/championships"><p>البطـولات</p></Link>
                    <Link href="/dashboard/players"><p>اللاعبـون</p></Link>
                    <Link href="/dashboard/matches"><p>المباريـات</p></Link>
                    <Link href="/dashboard/users"><p>المستخدمـون</p></Link>
                </div>
            </div>
        </div>
    );
}