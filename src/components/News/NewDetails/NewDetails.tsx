import { NewType } from "@/types/newType";
import styles from "./newDetails.module.css";
import Image from "next/image";
import { dateForm } from "@/functions/dateForm";

export default function NewDetails({newObject}: {newObject: NewType}) {
    const getStringDate = dateForm(newObject.created_at);
    return(
        <div className={styles.container}>
            <h3>{newObject.title}</h3>
            <div className={styles.date}>
                <Image src="/images/news/date.ico" 
                alt="" 
                width={20} 
                height={20} />
                <p>{`${getStringDate.stringDate} - ${getStringDate.stringTime}`}</p>
            </div>
            <div className={styles.details}>
                <Image src={newObject.image} 
                alt="" 
                width={300} 
                height={300} />
                <p className={styles.content}>{newObject.content}</p>
            </div>
        </div>
    );
}