import syles from "./teamsShow.module.css";
import TeamsTable from "./TeamsTable";
import AddTeam from "../AddTeam/AddTeam";
import { teamsFetch } from "@/apiFetching/teams/teamsFetch";

export default async function TeamsShow() {
    const getTeams = await teamsFetch();
    return(
        <div className={syles.container}>
            <AddTeam />
            {
                !getTeams.data ? 
                <p className={syles.error}>{getTeams.error}</p> : 
                <TeamsTable teamsData={getTeams.data} />
            }
        </div>
    );
}