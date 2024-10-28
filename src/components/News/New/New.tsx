import { NewType } from "@/types/newType";
import styles from "./new.module.css";
import Image from "next/image";

export default function New( {newObject}: {newObject: NewType} ) {
    return(
        <div className={styles.new}>
            <div>
                <Image src={newObject.image} 
                alt="" 
                width={75} 
                height={75} />
            </div>
            <div className={styles.details}>
                <p>{new Date(newObject.created_at).toDateString()}</p>
                <h3>{newObject.title}</h3>
                <p>{newObject.content}</p>
            </div>
        </div>
    );
}