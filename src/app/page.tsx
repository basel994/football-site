import News from "@/components/News/News";
import styles from "./page.module.css";
import PageHeader from "@/components/PageHeader/PageHeader";

export default function Home() {
  return (
    <div className={styles.page}>
      <PageHeader title=" آخــر الأخبـــار" icon="/images/news/news.ico" />
      <News />
    </div>
  );
}
