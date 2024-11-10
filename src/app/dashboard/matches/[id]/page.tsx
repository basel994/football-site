import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import MatchPage from "@/components/Dashboard/matches/MatchShow/MatchPage/MatchPage";

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    return(
        <div className={styles.page}>
            <PageHeader title="صفحـة المبـاراة" icon="/images/matches/match.ico" />
            <MatchPage id={parseInt(id)}/>
        </div>
    );
}