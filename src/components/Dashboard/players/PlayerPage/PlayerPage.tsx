import styles from "./playerShow.module.css";
import Image from "next/image";
import PlayerDelete from "../PlayersShow/PlayerMutation/PlayerDelete";
import PlayerUpdate from "../PlayersShow/PlayerMutation/PlayerUpdate";
import { PlayerType } from "@/types/playerType";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import { getCountryById } from "@/apiFetching/countries/getCountryById";

export default async function PlayerPage({playerData}: {playerData: PlayerType}) {
    const getTeamName = async (id: number) => {
        const get_team = await teamsFetchById(id);
        let team;
        if(get_team.data) {
            team = get_team.data.name;
        }
        else {
            team= "";
        }
        return team;
    }
    const getCountryNameById = async (id: number) => {
        const get_country = await getCountryById(id);
        let country;
        if(get_country.data) {
            country = get_country.data.name;
        }
        else {
            country= "";
        }
        return country;
    }
    return(
        <>
        <table className={styles.table}>
            <tbody>
               <tr><td colSpan={5}><p className={styles.title}>{playerData.name}</p></td></tr>
                <tr>
                    <td colSpan={5}>
                        <div className={styles.control}>
                        <PlayerUpdate playerObject={playerData} />
                        <PlayerDelete id={playerData.id} />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={5}>
                        <Image src={playerData.image} 
                        alt="" 
                        width={100} 
                        height={100} />
                    </td>
                    </tr>
                    <tr className={styles.infoHeader}>
                        <td><p>الاسم</p></td>
                        <td><p>البلد</p></td>
                        <td><p>الفريق</p></td>
                        <td><p>العمر</p></td>
                        <td><p>المركز</p></td>
                    </tr>
                    <tr className={styles.info}>
                    <td>
                            <p>
                                {playerData.name}
                            </p>
                        </td>
                        <td>
                            <p>
                                {await getCountryNameById(playerData.country)}
                            </p>
                        </td>
                        <td>
                            <p>
                                {await getTeamName(playerData.team)}
                            </p>
                        </td>
                        <td>
                            <p>
                                {playerData.age}
                            </p>
                        </td>
                        <td>
                            <p>
                                {playerData.role}
                            </p>
                        </td>
                    </tr>
            </tbody>
        </table>
        </>
    );
}