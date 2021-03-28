import { retrieveArea } from "../api/postcodes.js"

export async function retrieveAreaInfo(postcode) {
  return await retrieveArea(postcode)
}
