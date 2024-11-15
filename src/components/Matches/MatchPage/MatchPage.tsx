import styles from "./matches.module.css";
import MatchDetails from "./MatchDetails/MatchDetails";
import { fetchFrontendMatchById } from "@/apiFetching/matches/fetchFrontendMatchById";

export default async function MatchPage({id}: {id: number}) {
    const getMatch = await fetchFrontendMatchById(id);
    return(
        <div className={styles.container}>

            {
                !getMatch.data ? <p className={styles.error}>{getMatch.error}</p> :
                getMatch.data.map((match) => {
                    return(
                        <div className={styles.championContainer} key={match.id}>
                            <div className={styles.champion}><p>{match.championship}</p></div>
                                        <MatchDetails matchObject={match} />
                        </div>
                    );
                })
            }
        </div>
    );
}