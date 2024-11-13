import { fetchChampionByName } from "@/apiFetching/championships/fetchChampionByName";
import { getCountryById } from "@/apiFetching/countries/getCountryById";
import { getGoalsByMatch } from "@/apiFetching/goals/getGoalsByMatch";
import { getPlayerById } from "@/apiFetching/players/getPlayerById";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import { GoalType } from "@/types/goalType";
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
            if(getDatedMatchesQuery.rows.length > 0) {
                let finalResult: {team_one: string, team_two: string, goals: {}[]}[]=[];
                const fetchResult = async () => {
                    getDatedMatchesQuery.rows.map(async(match) => {
                        let team_one = "", team_two = "", goals;
                        const getChampion = await fetchChampionByName(match.champion);
                        if(getChampion.data) {
                            if(getChampion.data.type === "teams") {
                                const getTeamName_one = await teamsFetchById(match.team_one);
                                const getTeamName_two = await teamsFetchById(match.team_two);
                                if(getTeamName_one.data && getTeamName_two.data) {
                                    team_one = "getTeamName_one.data.name";
                                    team_two = "getTeamName_two.data.name";
                                }
                            }
                            else {
                                const getTeamName_one = await getCountryById(match.team_one);
                                const getTeamName_two = await getCountryById(match.team_two);
                                if(getTeamName_one.data && getTeamName_two.data) {
                                    team_one = "getTeamName_one.data.name";
                                    team_two = "getTeamName_two.data.name";
                                }
                            }
                        }
                        else {
                            team_one ="not found1";
                            team_two = "not found2";
                        }
                            const getGoals = await getGoalsByMatch(match.id);
                            if(getGoals.data) {
                                const fetchGoals = getGoals.data;
                                const goalsArray = fetchGoals.map(async(goal) => {
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
                                    return {team: "team", player: "player", minute: goal.minute}
                                });
                                goals = goalsArray;
                            }
                            else{
                                goals = [{team: "not found", player: "not found", minute: "6"}]
                            }
                        finalResult.push({
                            team_one: team_one,
                            team_two: team_two,
                            goals: goals,
                        })
                    });
                };
                await fetchResult();
                return NextResponse.json({data: finalResult});
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
