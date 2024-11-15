import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import MatchPage from "@/components/Matches/MatchPage/MatchPage";

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    return(
        <div className={styles.page}>
            <PageHeader title="صفحـة المباراة" icon="/images/matches/match.ico" />
            <MatchPage id={intId} />
        </div>
    );
}