import { ChampionshipType } from "@/types/championshipType";
import styles from "./championshipsShow.module.css";
import Link from "next/link";
import CustomButton from "@/components/CustomButton/CustomButton";

export default function ChampionshipsTable({championshipData}: {championshipData: ChampionshipType[]}) {
    return(
        <table className={styles.table}>
            <tbody>
                {
                    championshipData.map((championshipObject, index) => {
                        return(
                            <tr key={championshipObject.id}>
                                <td><p>{index + 1}</p></td>
                                <td><p>{championshipObject.name}</p></td>
                                <td>
                                    <Link href={`/dashboard/championships/${championshipObject.id}`}>
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