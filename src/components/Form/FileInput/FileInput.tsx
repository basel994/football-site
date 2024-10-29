import Image from "next/image";
import styles from "./fileInput.module.css";

export default function FileInput({ 
    label, 
    icon, 
    setState, 
}: {
    label?: string; 
    icon?: string;
    setState: (state: File) => void;
}) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            setState(file)
        }
    }
    return(
        <label className={styles.container}>
            <input type="file" 
            onChange={onChange}/>
            <div className={styles.label}>
                {
                    label && <p>{label}</p>
                }
                {
                    icon && <Image src={icon} 
                    alt="" 
                    width={30} 
                    height={30} />
                }
            </div>
        </label>
    );
}