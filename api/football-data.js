import axios from "axios"
const AUTH_TOKEN = ""
const TOKEN_HEADER = { headers: { "X-Auth-Token": AUTH_TOKEN } }
const BASE_URL = "https://api.football-data.org/v2"

export async function retrieveTeams(dateFrom, dateTo) {
  try {
    const res = await axios.get(
      `${BASE_URL}/competitions/2021/teams?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      TOKEN_HEADER
    )

    return res.data.teams.map(({ id, name, address, venue }) => {
      return {
        teamId: id,
        teamName: name,
        stadiumAddress: address,
        stadiumName: venue,
      }
    })
  } catch (e) {
    return e.response.data.error
  }
}

export async function retrieveTeam(id) {
  try {
    const res = await axios.get(`${BASE_URL}/teams/${id}`, TOKEN_HEADER)

    return res.data
  } catch (e) {
    return e.response.data.error
  }
}
