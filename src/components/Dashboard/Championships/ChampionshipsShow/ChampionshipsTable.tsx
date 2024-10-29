import { ChampionshipType } from "@/types/championshipType";
import styles from "./championshipsShow.module.css";
import Image from "next/image";

export default function ChampionshipsTable({championshipData}: {championshipData: ChampionshipType[]}) {
    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th><p>التسلسل</p></th>
                    <th><p>البطولــة</p></th>
                    <th><p>الشعــار</p></th>
                </tr>
            </thead>
            <tbody>
                {
                    championshipData.map((championshipObject, index) => {
                        return(
                            <tr key={championshipObject.id}>
                                <td><p>{index + 1}</p></td>
                                <td><p>{championshipObject.name}</p></td>
                                <td>
                                    <Image src={championshipObject.logo} 
                                    alt="" 
                                    width={30} 
                                    height={30} />
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}