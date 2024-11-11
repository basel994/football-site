import { ChampionshipType } from "@/types/championshipType";
import styles from "./championshipsShow.module.css";
import Image from "next/image";
import ChampionDelete from "./../ChampionshipsShow/ChampionMutation/ChampionDelete";
import ChampionUpdate from "./../ChampionshipsShow/ChampionMutation/ChampionUpdate";

export default function ChampionshipPage({championshipData}: {championshipData: ChampionshipType}) {
    return(
        <table className={styles.table}>
            <tbody>
                <tr>
                    <td>
                        <ChampionUpdate id={String(championshipData.id)} name={championshipData.name} />
                    </td>
                    <td>
                        <ChampionDelete id={String(championshipData.id)} name={championshipData.name}/>
                    </td>
                </tr>
                <tr>
                    <td><p>{championshipData.name}</p></td>
                    <td>
                        <Image src={championshipData.logo} 
                        alt="" 
                        width={30} 
                        height={30} />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}