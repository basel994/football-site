import ControlLink from "./ControlLink";
import styles from "./home.module.css";

export default function Home() {
    return(
        <div className={styles.container}>
            <ControlLink href="/dashboard/news" 
            title="الأخبــار" 
            icon="/images/news/news.ico" />
            <ControlLink href="/dashboard/users" 
            title="المستخدمـون" 
            icon="/images/dashboard/users/users.ico" />
            <ControlLink href="/dashboard/championships" 
            title="البطـولات" 
            icon="/images/dashboard/championship/champion.ico" />
            <ControlLink href="/dashboard/countries" 
            title="المنتخبـات" 
            icon="/images/dashboard/countries/countries.ico" />
            <ControlLink href="/dashboard/teams" 
            title="الفـرق" 
            icon="/images/dashboard/teams/teams.ico" />
            <ControlLink href="/dashboard/players" 
            title="اللاعبــون" 
            icon="/images/dashboard/players/players.ico" />
            <ControlLink href="/dashboard/matches" 
            title="المباريــات" 
            icon="/images/dashboard/matches/matches.ico" />
        </div>
    );
}