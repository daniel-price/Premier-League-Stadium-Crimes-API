import { retrieveTeams } from "../api/football-data.js"
import { retrieveCrimes } from "../api/police.js"
import { retrieveArea } from "../api/postcodes.js"

export async function retrieveStadiumCrimes(year, month) {
  const teams = await retrieveTeamsForMonth(year, month)

  const stadiumCrimes = []
  for (const team of teams) {
    const stadiumPostcode = extractPostcodeFromAddress(team.stadiumAddress)
    const { latitude, longitude } = await retrieveArea(stadiumPostcode)
    const crimes = await retrieveCrimes(formatMonth(month), latitude, longitude)

    const crimesWithTeams = crimes.map(
      ({ category, context, outcome_status, month, persistent_id }) => {
        return {
          category,
          context,
          outcome_status,
          month,
          crimeId: persistent_id,
          stadiumPostcode,
          ...team,
        }
      }
    )

    stadiumCrimes.push(...crimesWithTeams)
  }

  return stadiumCrimes
}

function formatMonth(month) {
  return String(month).padStart(2, "0")
}

async function retrieveTeamsForMonth(year, month) {
  const yearNumber = Number(year)
  const monthNumber = Number(month)
  const dateFrom = `${yearNumber}-${formatMonth(month)}-01`
  const dateTo =
    monthNumber === 12
      ? `${yearNumber + 1}-01-01`
      : `${yearNumber}-${formatMonth(month)}-01`

  return await retrieveTeams(dateFrom, dateTo)
}

function extractPostcodeFromAddress(address) {
  const words = address.split(" ")
  return words.slice(words.length - 2).join("")
}
