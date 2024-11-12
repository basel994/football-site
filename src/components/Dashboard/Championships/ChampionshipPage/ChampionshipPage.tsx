import { ChampionshipType } from "@/types/championshipType";
import styles from "./championshipsShow.module.css";
import Image from "next/image";
import ChampionDelete from "./../ChampionshipsShow/ChampionMutation/ChampionDelete";
import ChampionUpdate from "./../ChampionshipsShow/ChampionMutation/ChampionUpdate";
import ChampionTeams from "../ChampionshipsShow/ChampionMutation/ChampionTeams";

export default function ChampionshipPage({championshipData}: {championshipData: ChampionshipType}) {
    return(
        <>
        <table className={styles.table}>
            <tbody>
                <tr>
                    <td colSpan={2}>
                        <div className={styles.control}>
                        <ChampionUpdate id={String(championshipData.id)} name={championshipData.name} />
                        <ChampionDelete id={String(championshipData.id)} name={championshipData.name}/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <Image src={championshipData.logo} 
                        alt="" 
                        width={100} 
                        height={100} />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}><p>{championshipData.name}</p></td>
                </tr>
            </tbody>
        </table>
        <ChampionTeams champion={championshipData.name} />
        </>
    );
}