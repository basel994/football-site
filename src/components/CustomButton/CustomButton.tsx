import Image from "next/image";
import styles from "./customButton.module.css";

export default function CustomButton({
    title, 
    bg, 
    color, 
    radius, 
    icon,
    iconSize, 
    clicked, 
    className, 
}: {
    title?: string, 
    bg?: string, 
    color?: string, 
    radius?: number, 
    icon?: string,
    iconSize?: number, 
    clicked?: () => void;
    className?: string | undefined;
}) {
    return(
        <button style={{ backgroundColor: bg, color: color, borderRadius: `${radius ? radius : 10}px`}} 
        className={`${styles.customButton} ${className}`} 
        onClick={clicked}>
            <p>{title}</p>
            {
                icon && <Image src={icon} 
                alt="" 
                width={iconSize ? iconSize : 20} 
                height={iconSize ? iconSize : 20} />
            }
        </button>
    );
}