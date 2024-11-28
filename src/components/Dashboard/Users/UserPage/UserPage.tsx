import styles from "./userShow.module.css";
import Image from "next/image";
import UserDelete from "../UsersShow/UserMutation/UserDelete";
import UserUpdate from "../UsersShow/UserMutation/UserUpdate";
import { UserType } from "@/types/userType";

export default function UserPage({userData}: {userData: UserType}) {
    return(
        <>
        <table className={styles.table}>
            <tbody>
               <tr><td colSpan={4}><p className={styles.title}>{userData.name} {userData.last}</p></td></tr>
                <tr>
                    <td colSpan={4}>
                        <div className={styles.control}>
                        <UserUpdate userData={userData} />
                        <UserDelete id={userData.id} name={userData.name}/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={4}>
                        <Image src={userData.image} 
                        alt="" 
                        width={100} 
                        height={100} />
                    </td>
                    </tr>
                    <tr>
                        <td><p>الاسم الأول</p></td>
                        <td><p>الاسم الأخير</p></td>
                        <td><p>كلمة المرور</p></td>
                        <td><p>صلاحية المستخدم</p></td>
                    </tr>
                    <tr>
                        <td>
                            <p>
                                {userData.name}
                            </p>
                        </td>
                        <td>
                            <p>
                                {userData.last}
                            </p>
                        </td>
                        <td>
                            <p>
                                {userData.password}
                            </p>
                        </td>
                        <td>
                            <p>
                                {userData.role}
                            </p>
                        </td>
                    </tr>
            </tbody>
        </table>
        </>
    );
}