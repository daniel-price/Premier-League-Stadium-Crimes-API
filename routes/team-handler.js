import { retrieveTeam } from "../api/football-data.js"

export async function retrieveTeamInfo(id) {
  return await retrieveTeam(id)
}
