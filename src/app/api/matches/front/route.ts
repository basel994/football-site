import { fetchChampionByName } from "@/apiFetching/championships/fetchChampionByName";
import { getCountryById } from "@/apiFetching/countries/getCountryById";
import { getGoalsByMatch } from "@/apiFetching/goals/getGoalsByMatch";
import { getPlayerById } from "@/apiFetching/players/getPlayerById";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import { getYellowCardsByMatch } from "@/apiFetching/yellowCards/getYellowCardsByMatch";
import { MatchType } from "@/types/matchType";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");
    if(date) {
        try {
            const getDatedMatchesQuery = await sql `
            SELECT * FROM matches WHERE match_date::date = ${date} 
            `;
            const matches: MatchType[] = getDatedMatchesQuery.rows.map(row => ({
                id: row.id,
                team_one: row.team_one,
                team_two: row.team_two,
                championship: row.championship,
                match_date: row.match_date,
                status: row.status,
            }))
            if(getDatedMatchesQuery.rows.length > 0) {
                const fetchResult = async () => {
                    const result = await Promise.all(matches.map(async(match) => {
                        let team_one = "", 
                        team_two = "", 
                        team_one_logo = "", 
                        team_two_logo = "";
                        const events: {id: number, team: string, player: string, minute: number, type: string}[] = [];
                        const getChampion = await fetchChampionByName(match.championship);
                        if(getChampion.data) {
                            if(getChampion.data.type === "teams") {
                                const getTeamName_one = await teamsFetchById(match.team_one);
                                const getTeamName_two = await teamsFetchById(match.team_two);
                                if(getTeamName_one.data && getTeamName_two.data) {
                                    team_one = getTeamName_one.data.name;
                                    team_two = getTeamName_two.data.name;
                                    team_one_logo = getTeamName_one.data.logo;
                                    team_two_logo = getTeamName_two.data.logo;
                                }
                            }
                            else {
                                const getTeamName_one = await getCountryById(match.team_one);
                                const getTeamName_two = await getCountryById(match.team_two);
                                if(getTeamName_one.data && getTeamName_two.data) {
                                    team_one = getTeamName_one.data.name;
                                    team_two = getTeamName_two.data.name;
                                    team_one_logo = getTeamName_one.data.logo;
                                    team_two_logo = getTeamName_two.data.logo;
                                }
                            }
                        }
                        else {
                            team_one ="غير معروف";
                            team_two = "غير معروف";
                        }
                            const getGoals = await getGoalsByMatch(match.id);
                            if(getGoals.data) {
                                const fetchGoals = getGoals.data;
                                    await Promise.all(fetchGoals.map(async(goal) => {
                                        let team ="", player="";
                                        const champion = await fetchChampionByName(goal.champion);
                                        if(champion.data) {
                                            if(champion.data.type === "teams") {
                                                const fetchTeam = await teamsFetchById(goal.team_id);
                                                if(fetchTeam.data) {
                                                    team = fetchTeam.data.name;
                                                }
                                            }
                                            else {
                                                const fetchTeam = await getCountryById(goal.team_id);
                                                if(fetchTeam.data) {
                                                    team = fetchTeam.data.name;
                                                }
                                            }
                                        }
                                        const getPlayer = await getPlayerById(goal.player_id);
                                        if(getPlayer.data) {
                                            player = getPlayer.data.name;
                                        }
                                        events.push({id: goal.id, team: team, player: player, minute: goal.minute, type: "goal"})
                                    }));
                            }
                            const getYellows = await getYellowCardsByMatch(match.id);
                            if(getYellows.data) {
                                const fetchYellows = getYellows.data;
                                    await Promise.all(fetchYellows.map(async(goal) => {
                                        let team ="", player="";
                                        const champion = await fetchChampionByName(goal.champion);
                                        if(champion.data) {
                                            if(champion.data.type === "teams") {
                                                const fetchTeam = await teamsFetchById(goal.team_id);
                                                if(fetchTeam.data) {
                                                    team = fetchTeam.data.name;
                                                }
                                            }
                                            else {
                                                const fetchTeam = await getCountryById(goal.team_id);
                                                if(fetchTeam.data) {
                                                    team = fetchTeam.data.name;
                                                }
                                            }
                                        }
                                        const getPlayer = await getPlayerById(goal.player_id);
                                        if(getPlayer.data) {
                                            player = getPlayer.data.name;
                                        }
                                        events.push({id: goal.id, team: team, player: player, minute: goal.minute, type: "yellow"})
                                    }));
                            }
                            const getReds = await getYellowCardsByMatch(match.id);
                            if(getReds.data) {
                                const fetchReds = getReds.data;
                                    await Promise.all(fetchReds.map(async(goal) => {
                                        let team ="", player="";
                                        const champion = await fetchChampionByName(goal.champion);
                                        if(champion.data) {
                                            if(champion.data.type === "teams") {
                                                const fetchTeam = await teamsFetchById(goal.team_id);
                                                if(fetchTeam.data) {
                                                    team = fetchTeam.data.name;
                                                }
                                            }
                                            else {
                                                const fetchTeam = await getCountryById(goal.team_id);
                                                if(fetchTeam.data) {
                                                    team = fetchTeam.data.name;
                                                }
                                            }
                                        }
                                        const getPlayer = await getPlayerById(goal.player_id);
                                        if(getPlayer.data) {
                                            player = getPlayer.data.name;
                                        }
                                        events.push({id: goal.id, team: team, player: player, minute: goal.minute, type: "red"})
                                    }));
                            }
                        return {id: match.id, championship: match.championship, team_one: team_one, team_one_logo: team_one_logo, team_two: team_two, team_two_logo: team_two_logo, match_date: match.match_date, status: match.status, events: events};
                    }));
                    return result;
                };
                const result = await fetchResult();
                return NextResponse.json({data: result});
            }
            else {
                return NextResponse.json({data: []}); 
            }
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: "حدث خطأ في التاريخ! حـاول مجددا"})
        }
    }
    else {
        try {
            const getMatchesQuery = await sql `
            SELECT * FROM matches 
            `;
            return NextResponse.json({data: getMatchesQuery.rows});
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: "حدث خطأ! حـاول مجددا"})
        }
    }
}
