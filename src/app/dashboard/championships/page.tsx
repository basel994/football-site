import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";

export default function Page() {
    return(
        <div className={styles.page}>
            <PageHeader title="البطــولات" />
            
        </div>
    );
}