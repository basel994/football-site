import styles from "./newShow.module.css";
import Image from "next/image";
import NewDelete from "../NewsShow/NewMutation/NewDelete";
import NewUpdate from "../NewsShow/NewMutation/NewUpdate";
import { NewType } from "@/types/newType";

export default function NewPage({newData}: {newData: NewType}) {
    return(
        <>
        <table className={styles.table}>
            <tbody>
               <tr><td colSpan={2}><p className={styles.title}>{newData.title}</p></td></tr>
                <tr>
                    <td colSpan={2}>
                        <div className={styles.control}>
                        <NewUpdate newData={newData} />
                        <NewDelete id={newData.id} name=""/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Image src={newData.image} 
                        alt="" 
                        width={100} 
                        height={100} />
                    </td>
                    </tr>
                    <tr>
                        <td>
                            <p>
                                {newData.content}
                            </p>
                        </td>
                    </tr>
            </tbody>
        </table>
        </>
    );
}