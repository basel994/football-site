import Image from "next/image";
import styles from "./pageHeader.module.css";

export default function PageHeader( {
    title,
    icon,
}: {
    title: string;
    icon?: string;
} ) {
    return( 
        <div className={styles.pageHeader}>
            <h2> {title} </h2>
            {
                icon && <Image src={icon} 
                alt="" 
                width={30} 
                height={30} />
            }
        </div>
     );
}