import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import UsersShow from "@/components/Dashboard/Users/UsersShow/UsersShow";

export default function Page() {
    return(
        <div className={styles.page}>
            <PageHeader title="المستخدمون" />
            <UsersShow />
        </div>
    );
}