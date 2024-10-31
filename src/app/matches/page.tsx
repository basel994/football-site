import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";

export default async function Page() {
    return(
        <div className={styles.page}>
            <PageHeader title="المبــاريــات" icon="/images/matches/match.ico" />
        </div>
    );
}