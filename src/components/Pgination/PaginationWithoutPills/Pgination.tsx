import CustomButton from "@/components/CustomButton/CustomButton";
import styles from "./pagination.module.css";

export default function Pagination(
    {
        items, 
        limit, 
        currentPage, 
        setPage,
    }: {
        items: number; 
        limit: number; 
        currentPage: number;
        setPage: (page: number) => void;
    }
) {
    const pages = Math.ceil(items/limit);
    const nextPage = () => {
        if(currentPage < pages) {
            setPage(currentPage + 1);
        }
    }
    const previousPage = () => {
        if(currentPage !== 1) {
            setPage(currentPage - 1);
        }
    }
    return(
        <div className={styles.container}>
            {
                currentPage < pages && 
                <CustomButton 
                icon="/images/arrows/arrow-right.ico" 
                clicked={nextPage} />
            }
            {
                currentPage > 1 && 
                <CustomButton 
                icon="/images/arrows/angle-arrow-down.ico" 
                clicked={previousPage} />
            }
        </div>
    );
}