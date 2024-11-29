import { userById } from "@/apiFetching/users/userById";
import styles from "./userPage.module.css";
import UserDetails from "./UserDetails/UserDetails";
export default async function UserPage({id}: {id: number}) {
    const getUser = await userById(id);
    return(
        <div className={styles.container}>
            {
                !getUser.data ? <p className={styles.error}>{getUser.error}</p> : 
                <UserDetails userData={getUser.data} />
            }
        </div>
    );
}