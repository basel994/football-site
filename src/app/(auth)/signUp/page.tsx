import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import SignUp from "@/components/Auth/SignUp/SignUp";

export default function Page() {
    return(
        <div className={styles.container}>
            <PageHeader title="التسجيل" />
            <SignUp />
        </div>
    );
}