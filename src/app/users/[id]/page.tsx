import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import UserPage from "@/components/Users/UserPage/UserPage";
export default async function Page({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    return(
        <div className={styles.container}>
            <PageHeader title="إعـداد الحســاب" />
            <UserPage id={parseInt(id)} />
        </div>
    );

}