import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import NewShow from "@/components/Dashboard/News/NewPage/NewShow";

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    return(
        <div className={styles.page}>
            <PageHeader title="إعـداد الخبـر" />
            <NewShow id={intId} />
        </div>
    );
}