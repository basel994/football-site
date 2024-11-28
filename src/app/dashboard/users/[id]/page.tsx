import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import UserShow from "@/components/Dashboard/Users/UserPage/UserShow";

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    return(
        <div className={styles.page}>
            <PageHeader title="إعـداد المستخدم" />
            <UserShow id={intId} />
        </div>
    );
}