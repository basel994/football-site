import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import { getCurrentDateFormatted } from "@/functions/getCurrentDate";
import { matchesFetch } from "@/apiFetching/matches/fetchMatches";

export default async function Page() {
    const today = getCurrentDateFormatted();
    console.log(today);
    const getMatches = await matchesFetch(today);

    return(
        <div className={styles.page}>
            <PageHeader title="المبــاريــات" icon="/images/matches/match.ico" />
            <div>
                {
                    getMatches.data ? getMatches.data.map((match)=>{
                        return(
                            <p>{match.team_one_score}</p>
                        );
                    }) : <p>{getMatches.error}</p>
                }
            </div>
        </div>
    );
}