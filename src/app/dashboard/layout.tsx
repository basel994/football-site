import DashboardSidebar from "@/components/Dashboard/Sidebar/DashboardSidebar";
import styles from "./dashboard.module.css";
export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <div className={styles.dashboard}>
            <DashboardSidebar />
            {children}
        </div>
    );
}