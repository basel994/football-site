import { getParticipants } from "@/apiFetching/participants/getParticipants";
import styles from "./championMutation.module.css";
import AddParticipant from "./AddParticipant";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import { getCountryById } from "@/apiFetching/countries/getCountryById";
import DeleteParticipant from "./deleteParticipant";
import { ChampionshipType } from "@/types/championshipType";
export default async function ChampionTeams({champion}: {champion: ChampionshipType;}) {
    const fetchParticipants = await getParticipants();
    const getTeamName = async(id: number) => {
        const getTeam = await teamsFetchById(id);
        if(getTeam.data) {
            return getTeam.data.name;
        }
        else return null;
    }
    const getCountryName = async(id: number) => {
        const getTeam = await getCountryById(id);
        if(getTeam.data) {
            return getTeam.data.name;
        }
        else return null;
    }
    return(
        <div className={styles.participant}>
            <div><p>المشاركون في هذه البطولـة: </p></div>
            {
                !fetchParticipants.data ? 
                <p className={styles.error}>{fetchParticipants.error}</p> : 
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td colSpan={3}>
                            <AddParticipant champion={champion} />
                            </td>
                        </tr>
                        {
                            fetchParticipants.data.map(async (participant, index) => {
                                if(participant.champion === champion.name) {
                                    return(
                                        <tr key={participant.id}>
                                            <td>{index + 1}</td>
                                           <td>{champion.type === "teams" ? 
                                           await getTeamName(participant.team_id) : 
                                           await getCountryName(participant.team_id)}</td>
                                           <td><DeleteParticipant id={participant.id} /></td>
                                        </tr>
                                    );
                                }
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    );
}