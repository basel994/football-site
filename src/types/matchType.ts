export type MatchType = {
    id: number;
    team_one: number;
    team_two: number;
    championship: string;
    match_date: string;
    status: "لـم تبدأ بعـد" | 
    "الشوط الأول" | 
    "استراحـة" | 
    "الشوط الثـاني" | 
    "شوط إضافي أول" | 
    "شوط إضافي ثاني" | 
    "ركلات الترجيح" | 
    "انتهـت" |
    "تأجلت" |
    "ألغيت";
}