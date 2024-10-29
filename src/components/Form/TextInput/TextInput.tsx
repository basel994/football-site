import styles from "./input.module.css";

export default function TextInput({ 
    label, 
    type, 
    setState,
}: { 
    label: string; 
    type: "text" | "password" | "email"; 
    setState: (state: string | undefined) => void;
}) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    }
    return(
        <div className={styles.container}>
            <input type={type} placeholder=" " 
            onChange={onChange}/>
            <label><p>{label}</p></label>
        </div>
    );
}