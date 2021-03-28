import { retrieveCrime } from "../api/police.js"

export async function retrieveCrimeInfo(id) {
  return await retrieveCrime(id)
}
