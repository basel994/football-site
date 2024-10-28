import { NewType } from "@/types/newType";
import styles from "./new.module.css";
import Image from "next/image";
import { dateForm } from "@/functions/dateForm";
import { truncateText } from "@/functions/truncateText";
import CustomButton from "@/components/CustomButton/CustomButton";
import Link from "next/link";

export default function New( {newObject}: {newObject: NewType} ) {
    const getStringDate = dateForm(newObject.created_at);
    const getTruncatedText = truncateText(newObject.content, 15);
    return(
        <div className={styles.new}>
            <div>
                <Image src={newObject.image} 
                alt="" 
                width={150} 
                height={150} />
            </div>
            <div className={styles.details}>
                <div className={styles.date}>
                    <p>{getStringDate.stringDate}</p>
                    <p>{getStringDate.stringTime}</p>
                </div>
                <h3>{newObject.title}</h3>
                <p>{getTruncatedText}</p>
                <div className={styles.more}>
                    <Link href={`/news/${newObject.id}`}>
                    <CustomButton title="التفــاصيل" 
                    bg="black" 
                    color="white" />
                    </Link>
                </div>
            </div>
        </div>
    );
}