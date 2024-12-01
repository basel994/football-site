import styles from "./playersShow.module.css";
import { getCountryById } from "@/apiFetching/countries/getCountryById";
import { PlayerType } from "@/types/playerType";
import Image from "next/image";
import CustomButton from "@/components/CustomButton/CustomButton";
import Link from "next/link";

export default function PlayersTable({playersData}: {playersData: PlayerType[]}) {

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
            if (!countryMap[String(player.country)]) {  
                countryMap[String(player.country)] = [];  
            }  
            countryMap[String(player.country)].push(player);  
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
                                            <tr>
                                            <td><p>{plyerObject.name}</p></td>
                                            <td><Image src={plyerObject.image} 
                                            alt="" 
                                            width={40} 
                                            height={40} /></td>
                                            <td><Link href={`/dashboard/players/${plyerObject.id}`}><CustomButton title="إعـداد" /></Link></td>
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