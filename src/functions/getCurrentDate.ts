export function getCurrentDateFormatted(): string {  
    const today = new Date();  

    const year = today.getFullYear(); // الحصول على آخر رقمين من السنة  
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // الحصول على الشهر مع إضافة صفر بادئًا  
    const day = today.getDate().toString().padStart(2, '0'); // الحصول على اليوم مع إضافة صفر بادئًا  

    return `${year}-${month}-${day}`;  
} 