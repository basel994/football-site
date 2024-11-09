import styles from "./playersShow.module.css";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import PlayerDelete from "./PlayerMutation/PlayerDelete";
import { getCountryById } from "@/apiFetching/countries/getCountryById";
import { PlayerType } from "@/types/playerType";
import Image from "next/image";
import PlayerUpdate from "./PlayerMutation/PlayerUpdate";

export default function PlayersTable({playersData}: {playersData: PlayerType[]}) {
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
    interface CountryGroup {  
        country: string;  
        players: PlayerType[];  
    }  
    const groupPlayersByCountry = (players: PlayerType[]): CountryGroup[] => {  
        const countryMap: { [key: string]: PlayerType[] } = {};  
    
        players.forEach(player => {  
            if (!countryMap[player.country]) {  
                countryMap[player.country] = [];  
            }  
            countryMap[player.country].push(player);  
        });  
    
        return Object.keys(countryMap).map(country => ({  
            country,  
            players: countryMap[country]  
        }));  
    }; 
    return(
        <div className={styles.matchesShow}>
                {
                    groupPlayersByCountry(playersData).map(async(plyerObject, index) => {
                        return(
                            <table className={styles.table} key={index}>
                                <tbody>
                                    <tr className={styles.tableHeader}>
                                        <td colSpan={5}>
                                            <p>{await getCountryNameById(parseInt(plyerObject.country))}</p>
                                        </td>
                                    </tr>
                                    {plyerObject.players.map(async(plyerObject) => {
                                        return(
                                            <>
                                            <tr className={styles.match}>
                                            <td><p>{plyerObject.name}</p></td>
                                            <td><p>{getTeamName(plyerObject.team)}</p></td>
                                            <td><p>{plyerObject.age}</p></td>
                                            <td><p>{plyerObject.role}</p></td>
                                            <td><Image src={plyerObject.image} 
                                            alt="" 
                                            width={40} 
                                            height={40} /></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}>
                                                <div className={styles.control} >
                                                    <PlayerUpdate playerObject={plyerObject} />
                                                    <PlayerDelete id={plyerObject.id}/>
                                                </div>
                                            </td>
                                        </tr>
                                        </>
                                        );
                                    })}

                                </tbody>
                            </table>

                        );
                    })
                }
        </div>
    );
}