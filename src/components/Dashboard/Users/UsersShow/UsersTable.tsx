import styles from "./usersShow.module.css";
import Link from "next/link";
import CustomButton from "@/components/CustomButton/CustomButton";
import { UserType } from "@/types/userType";

export default function UsersTable({usersData}: {usersData: UserType[]}) {
    return(
        <table className={styles.table}>
            <tbody>
                {
                    usersData.map((userObject, index) => {
                        return(
                            <tr key={userObject.id}>
                                <td><p>{index + 1}</p></td>
                                <td><p>{userObject.name}</p></td>
                                <td><p>{userObject.last}</p></td>
                                <td>
                                    <Link href={`/dashboard/users/${userObject.id}`}>
                                    <CustomButton title="إعـداد" 
                                    bg="rgb(124, 247, 161)"/>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}