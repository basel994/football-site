export function truncateText(text: string, wordCount: number) {   
    const words = text.split(' ');  
    const truncatedWords = words.slice(0, wordCount);  
    return truncatedWords.join(' ') + (words.length > wordCount ? '...' : '');  
} 