import styles from "./textArea.module.css";

export default function TextAreaInput({ 
    label, 
    rows, 
    cols, 
    setState, 
    value,
}: { 
    label: string; 
    rows: number; 
    cols: number;
    setState: (state: string) => void; 
    value: string;
}) {
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState(e.target.value);
    }
    return(
        <div className={styles.container}>
             <label><p>{label}</p></label>
            <textarea 
            value={value} 
            onChange={onChange}
            rows={rows} 
            cols={cols}/>
        </div>
    );
}