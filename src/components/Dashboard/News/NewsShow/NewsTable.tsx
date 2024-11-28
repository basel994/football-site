import styles from "./newsShow.module.css";
import Link from "next/link";
import CustomButton from "@/components/CustomButton/CustomButton";
import { NewType } from "@/types/newType";

export default function NewsTable({newsData}: {newsData: NewType[]}) {
    return(
        <table className={styles.table}>
            <tbody>
                {
                    newsData.map((newObject, index) => {
                        return(
                            <tr key={newObject.id}>
                                <td><p>{index + 1}</p></td>
                                <td><p>{newObject.title}</p></td>
                                <td>
                                    <Link href={`/dashboard/news/${newObject.id}`}>
                                    <CustomButton title="إعـداد" 
                                    bg="rgb(124, 247, 161)"/>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}