import express from "express"
import { retrieveAreaInfo } from "./routes/area-handler.js"
import { retrieveCrimeInfo } from "./routes/crime-handler.js"
import { retrieveStadiumCrimes } from "./routes/crimes-handler.js"
import { retrieveTeamInfo } from "./routes/team-handler.js"
const app = express()

app.get("/crimes", async (req, res, next) => {
  const { year, month } = req.query
  if (!year || !month) {
    next("Year or month not provided")
    return
  }

  if (month < 1 || month > 12) {
    next("Invalid month")
    return
  }

  const crimes = await retrieveStadiumCrimes(year, month)
  res.json(crimes)
})

app.get("/team", async (req, res, next) => {
  const { teamId } = req.query
  if (!teamId) {
    next("teamId not provided")
    return
  }

  const team = await retrieveTeamInfo(teamId)
  res.json(team)
})

app.get("/area", async (req, res, next) => {
  const { postcode } = req.query
  if (!postcode) {
    next("postcode not provided")
    return
  }

  //validating postcodes is not trivial, so just validate that the input string is alphanumeric and let postcodes api tell us if its real
  if (!postcode.match("[-_ a-zA-Z0-9]+")) {
    next("Invalid postcode")
    return
  }

  const area = await retrieveAreaInfo(postcode)
  res.json(area)
})

app.get("/crime", async (req, res, next) => {
  const { crimeId } = req.query
  if (!crimeId) {
    next("crimeId not provided")
    return
  }

  const crime = await retrieveCrimeInfo(crimeId)
  res.json(crime)
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})
