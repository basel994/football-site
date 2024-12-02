import { getCountryById } from "@/apiFetching/countries/getCountryById";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import { PlayerType } from "@/types/playerType";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const headers = request.headers;
    headers.get("Content-Type");
        try{
            const getPlayersQuery = await sql `
            SELECT * FROM players 
            `;
            const players: PlayerType[] = getPlayersQuery.rows.map(player => ({
                id: player.id, 
                name: player.name, 
                age: player.age, 
                country: player.country, 
                team: player.team, 
                role: player.role, 
                image: player.image, 
            }))
            if(getPlayersQuery.rows.length > 0) {
                const getFrontInfo = async () => {
                    const result = await Promise.all(players.map(async(player) => {
                        let country: string, team: string = "";
                        const getCountry = await getCountryById(player.country);
                        if(getCountry.data) {
                            country = getCountry.data.name;
                        }
                        else country = "";
                        const getTeam = await teamsFetchById(player.team);
                        if(getTeam.data) {
                            team = getTeam.data.name;
                        }
                        else team = "";
                        return {id: player.id, name: player.name, age: player.age, country: country, team: team, role: player.role, image: player.image}
                    }));
                    return result;
                }
                const result = await getFrontInfo();
                return NextResponse.json({data: result});
                
            }
            else {
                return NextResponse.json({data: []});
            }
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: "فشل تحميل اللاعبون"});
        }
}