type StringDateType = {
    stringDate: string;
    stringTime: string;
}
export function dateForm(date: Date): StringDateType {
    const toDate = new Date(date);
    const hours = toDate.getHours();  
    const minutes = toDate.getMinutes();   
    const hoursForm = hours < 10 ? '0' + hours : hours;  
    const minutesForm = minutes < 10 ? '0' + minutes : minutes;  
    const stringTime = `
    ${minutesForm} : 
    ${hoursForm} 
    ${hours < 12 ? "ص" : "م"}
    `;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if(toDate.toDateString() === today.toDateString()) {
        return {
            stringDate: "اليـوم", 
            stringTime: stringTime, 
        };
    }
    else if(toDate.toDateString() === yesterday.toDateString()) {
        return {
            stringDate: "أمس", 
            stringTime: stringTime, 
        };
    }
    else if(toDate.toDateString() === tomorrow.toDateString()) {
        return {
            stringDate: "غـداً", 
            stringTime: stringTime, 
        };
    }
    else {
        return {
            stringDate: `${toDate.getDate()} / ${toDate.getMonth()+1} / ${toDate.getFullYear()}`, 
            stringTime: stringTime, 
        };
    }
}