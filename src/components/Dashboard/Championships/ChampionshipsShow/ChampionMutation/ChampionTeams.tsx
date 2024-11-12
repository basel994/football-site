import { getParticipants } from "@/apiFetching/participants/getParticipants";
import styles from "./championMutation.module.css";
import AddParticipant from "./AddParticipant";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
export default async function ChampionTeams({champion}: {champion: string;}) {
    const fetchParticipants = await getParticipants();
    const getTeamName = async(id: number) => {
        const getTeam = await teamsFetchById(id);
        if(getTeam.data) {
            return getTeam.data.name;
        }
        else return null;
    }
    return(
        <div>
            <div><p>المشاركون في هذه البطولـة: </p></div>
            {
                !fetchParticipants.data ? 
                <p className={styles.error}>{fetchParticipants.error}</p> : 
                <table>
                    <tr>
                        <td colSpan={2}>
                            <AddParticipant champion={champion} />
                        </td>
                    </tr>
                    {
                fetchParticipants.data.map(async (participant) => {
                    if(participant.champion === champion) {
                        return(
                            <tr key={participant.id}>
                                <td>{await getTeamName(participant.team_id)}</td>
                                <td>delete</td>
                            </tr>
                        );
                    }
                })
            }
                </table>
            }
        </div>
    );
}