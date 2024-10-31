import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import { getCurrentDateFormatted } from "@/functions/getCurrentDate";
import { matchesFetch } from "@/apiFetching/matches/fetchMatches";

export default async function Page() {
    return(
        <div className={styles.page}>
            <PageHeader title="المبــاريــات" icon="/images/matches/match.ico" />
        </div>
    );
}