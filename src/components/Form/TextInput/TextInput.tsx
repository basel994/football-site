import styles from "./input.module.css";

export default function TextInput({ 
    label, 
    type, 
    setState, 
    value,
}: { 
    label: string; 
    type: "text" | "password" | "email"; 
    setState: (state: string) => void; 
    value: string;
}) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    }
    return(
        <div className={styles.container}>
            <input type={type} placeholder=" " 
            value={value} 
            onChange={onChange}/>
            <label>{label}</label>
        </div>
    );
}