import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import ChampionshipShow from "@/components/Dashboard/Championships/ChampionshipPage/ChampionshipShow";

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    return(
        <div className={styles.page}>
            <PageHeader title="إعـداد البطـولــة" />
            <ChampionshipShow id={intId} />
        </div>
    );
}