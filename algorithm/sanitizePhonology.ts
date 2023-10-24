import type { Context } from "./types"
import { runPhases } from "./utils"

const sanitize = (word: string) => {
  return word
    .replace(/ą̄/g, 'ā')  
    .replace(/į̄/g, 'ī')
    .replace(/į̄/g, 'ī') // This is not the same character as the above long, nasal i
    .replace(/ǫ̂/g, 'ǭ')
    .replace(/ų̄/g, 'ų')
}

export default (word: string, context: Context) => {
  return runPhases(word, context, [sanitize])
}