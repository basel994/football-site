import { userById } from "@/apiFetching/users/userById";
import styles from "./userPage.module.css";
export default async function UserPage({id}: {id: number}) {
    const getUser = await userById(id);
    return(
        <div className={styles.container}>
            {
                !getUser.data ? <p>{getUser.error}</p> : 
                <div><p>{getUser.data.name}</p></div>
            }
        </div>
    );
}