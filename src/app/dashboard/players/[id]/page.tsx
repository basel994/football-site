import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import PlayerShow from "@/components/Dashboard/players/PlayerPage/PlayerShow";

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    return(
        <div className={styles.page}>
            <PageHeader title="إعـداد اللاعب" />
            <PlayerShow id={intId} />
        </div>
    );
}