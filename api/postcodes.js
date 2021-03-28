import axios from "axios"

export async function retrieveArea(postcode) {
  try {
    const res = await axios.get(
      `https://api.postcodes.io/postcodes/${postcode}`
    )
    return res.data.result
  } catch (e) {
    return e.response.data.error
  }
}
