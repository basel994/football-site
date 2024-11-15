import { fetchChampionByName } from "@/apiFetching/championships/fetchChampionByName";
import { getCountryById } from "@/apiFetching/countries/getCountryById";
import { getGoalsByMatch } from "@/apiFetching/goals/getGoalsByMatch";
import { getPlayerById } from "@/apiFetching/players/getPlayerById";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import { getYellowCardsByMatch } from "@/apiFetching/yellowCards/getYellowCardsByMatch";
import { MatchType } from "@/types/matchType";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const headers = request.headers;
    headers.get("Content-Type");
    const id = (await params).id;
    const intId = parseInt(id);
        try {
            const getDatedMatchesQuery = await sql `
            SELECT * FROM matches WHERE id = ${intId} 
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
                        team_two_logo = "", 
                        goals:{team: string, player: string, minute: number}[], 
                        yellowCards: {team: string, player: string, minute: number}[], 
                        redCards: {team: string, player: string, minute: number}[];
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
                                    goals = await Promise.all(fetchGoals.map(async(goal) => {
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
                                        return {team: team, player: player, minute: goal.minute}
                                    }));
                            }
                            else{
                                goals = [];
                            }
                            const getYellows = await getYellowCardsByMatch(match.id);
                            if(getYellows.data) {
                                const fetchYellows = getYellows.data;
                                    yellowCards = await Promise.all(fetchYellows.map(async(goal) => {
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
                                        return {team: team, player: player, minute: goal.minute}
                                    }));
                            }
                            else{
                                yellowCards = [];
                            }
                            const getReds = await getYellowCardsByMatch(match.id);
                            if(getReds.data) {
                                const fetchReds = getReds.data;
                                    redCards = await Promise.all(fetchReds.map(async(goal) => {
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
                                        return {team: team, player: player, minute: goal.minute}
                                    }));
                            }
                            else{
                                redCards = [];
                            }
                        return {championship: match.championship, team_one: team_one, team_one_logo: team_one_logo, team_two: team_two, team_two_logo: team_two_logo, match_date: match.match_date, status: match.status, goals: goals, yellowCards: yellowCards, redCards: redCards};
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
            return NextResponse.json({error: "حدث خطأ! حـاول مجددا"})
        }
}
