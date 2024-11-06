import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import CountriesShow from "@/components/Dashboard/countries/CountriesShow/CountriesShow";

export default function Page() {
    return(
        <div className={styles.page}>
            <PageHeader title="المنتخبـات" />
            <CountriesShow />
        </div>
    );
}