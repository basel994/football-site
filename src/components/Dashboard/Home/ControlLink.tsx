import Link from "next/link";
import styles from "./home.module.css";
import Image from "next/image";

export default function ControlLink({href, icon, title}: {href: string; icon: string; title: string;}) {
    return(
        <div className={styles.linkContainer}>
            <Link href={href} className={styles.link}>
            <Image src={icon} 
            alt="" 
            width={75} 
            height={75} />
            <p>{title}</p>
            </Link>
        </div>
    );
}