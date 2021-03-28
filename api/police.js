import axios from "axios"
const BASE_URL = `https://data.police.uk/api`
const USE_STUB_FUNCTION = true

export async function retrieveCrimes(date, latitude, longitude) {
  if (USE_STUB_FUNCTION) {
    return retrieveCrimesStub()
  }

  try {
    const res = await axios.get(
      `${BASE_URL}/crimes-at-location?date=${date}&lat=${latitude}&lng=${longitude}`
    )

    return res.data.result
  } catch (e) {
    return e.response.data.error
  }
}
export async function retrieveCrime(crimeId) {
  if (USE_STUB_FUNCTION) {
    return "Not currently available"
  }

  try {
    const res = await axios.get(`${BASE_URL}/outcomes-for-crime/${crimeId}`)

    return res.data.result
  } catch (e) {
    return e.response.data.error
  }
}

/**
 * https://data.police.uk/api/crimes-at-location was giving a 500 error while writing, so
 * for now stubbing the example response
 */
function retrieveCrimesStub() {
  return [
    {
      category: "violent-crime",
      location_type: "Force",
      location: {
        latitude: "52.643950",
        street: {
          id: 884227,
          name: "On or near Abbey Gate",
        },
        longitude: "-1.143042",
      },
      context: "",
      outcome_status: {
        category: "Unable to prosecute suspect",
        date: "2017-02",
      },
      persistent_id:
        "4d83433f3117b3a4d2c80510c69ea188a145bd7e94f3e98924109e70333ff735",
      id: 54726925,
      location_subtype: "",
      month: "2017-02",
    },
  ]
}
