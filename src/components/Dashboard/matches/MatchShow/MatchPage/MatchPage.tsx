import syles from "./matchesShow.module.css";
import MatchDetails from "./MatchDetails";
import { matchFetcById } from "@/apiFetching/matches/fetchMatchById";

export default async function MatchPage({id}: {id: number}) {
    const getMatch = await matchFetcById(id);
    return(
        <div className={syles.container}>
            {
                !getMatch.data ? 
                <p className={syles.error}>{getMatch.error}</p> : 
                <MatchDetails matchData={getMatch.data} />
            }
        </div>
    );
}