import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import Login from "@/components/Auth/Login/Login";

export default function Page() {
    return(
        <div className={styles.container}>
            <PageHeader title="تسجيل الدخـول" />
            <Login />
        </div>
    );
}