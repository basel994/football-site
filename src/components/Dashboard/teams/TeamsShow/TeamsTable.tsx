import styles from "./teamsShow.module.css";
import Image from "next/image";
import TeamUpdate from "./TeamMutation/TeamUpdate";
import { TeamType } from "@/types/teamType";
import TeamDelete from "./TeamMutation/TeamDelete";
import { getCountryById } from "@/apiFetching/countries/getCountryById";

export default function TeamsTable({teamsData}: {teamsData: TeamType[]}) {
    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th><p>التسلسل</p></th>
                    <th><p>الاسم</p></th>
                    <th><p>البلد</p></th>
                    <th><p>سنـة التأسيس</p></th>
                    <th><p>المدرب</p></th>
                    <th><p>الشعــار</p></th>
                    <th><p>تعـديل</p></th>
                    <th><p>حــذف</p></th>
                </tr>
            </thead>
            <tbody>
                {
                    teamsData.map(async(teamObject, index) => {
                        const getCountryName = await getCountryById(teamObject.country);
                        let countryName = "";
                        if(getCountryName.data) {
                            countryName = getCountryName.data.name;
                        }
                        return(
                            <tr key={teamObject.id}>
                                <td><p>{index + 1}</p></td>
                                <td><p>{teamObject.name}</p></td>
                                <td><p>{countryName}</p></td>
                                <td><p>{teamObject.founded_at}</p></td>
                                <td><p>{teamObject.coach}</p></td>
                                <td>
                                    <Image src={teamObject.logo} 
                                    alt="" 
                                    width={30} 
                                    height={30} />
                                </td>
                                <td>
                                    <TeamUpdate teamObject={teamObject} />
                                </td>
                                <td>
                                    <TeamDelete id={teamObject.id} name={teamObject.name}/>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}