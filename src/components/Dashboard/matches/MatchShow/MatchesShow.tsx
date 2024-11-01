import syles from "./matchesShow.module.css";
import AddTeam from "../AddMatch/AddMatch";
import MatchesTable from "./MatchesTable";
import { matchesFetch } from "@/apiFetching/matches/fetchMatches";

export default async function MatchesShow() {
    const getMatches = await matchesFetch();
    return(
        <div className={syles.container}>
            <AddTeam />
            {
                !getMatches.data ? 
                <p className={syles.error}>{getMatches.error}</p> : 
                <MatchesTable teamsData={getMatches.data} />
            }
        </div>
    );
}