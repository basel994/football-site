import styles from "./match.module.css";
import Image from "next/image";
import { FrontMatchType } from "@/types/frontMatchType";

export default async function Match({matchObject}: {matchObject: FrontMatchType;}) {
    return(
            <div className={styles.match}>
                <div className={styles.team}>
                        <div className={styles.teamDetails}>
                            <Image src={matchObject.team_one_logo} 
                            alt="" 
                            width={40} 
                            height={40} />
                            <p>{matchObject.team_one}</p>
                        </div>
                    <p></p>
                </div>
                <div className={styles.status}><p>{matchObject.status}</p></div>
                <div className={styles.team}>
                        <div className={styles.teamDetails}>
                            <Image src={matchObject.team_two_logo} 
                            alt="" 
                            width={40} 
                            height={40} />
                            <p>{matchObject.team_two}</p>
                        </div>
                    <p></p>
                </div>
            </div>
    );
}