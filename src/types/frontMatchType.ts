export type FrontMatchType = {
    id: number;
    championship: string;
    team_one: string;
    team_one_logo: string;
    team_two: string;
    team_two_logo: string;
    match_date: string;
    status: "لـم تبدأ بعـد" | "الشوط الأول" | "استراحـة" | "الشوط الثـاني" | "شوط إضافي أول" | "شوط إضافي ثاني" | "ركلات الترجيح" | "انتهـت" | "تأجلت" | "ألغيت";
    events: {
            id: number, 
            team: string;
            player: string;
            minute: number;
            type: "goal" | "yellow" | "red";
        }[],
}