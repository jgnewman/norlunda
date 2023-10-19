import type { Context } from './types'
import { fricatives, bilabials } from './consonants'
import { lastOf, isConsonant, separateFinalVowels, separateFinalConsonants, runPhases } from './utils'
import { allShortVowels } from './vowels'

const geminateJTriggers = (word: string) => {
  const geminated = word.split('').reduce((result, char, index, charList) => {
    const nextChar = charList[index + 1]
    const curCharIsJ = char === 'j'
    const nextCharIsJ = nextChar === 'j'

    // Handle removing j after a double consonant
    if (curCharIsJ) {
      const [_, endConsonants] = separateFinalConsonants(result)
      const lastCons = lastOf(endConsonants)
      const nextToLastCons = endConsonants[endConsonants.length - 2]
      if (isConsonant(lastCons) && nextToLastCons === lastCons) return result
      return result + char
    }

    // Ensure a non-w/z consonant followed by j
    if (!isConsonant(char) || char === 'w' || char === 'z' || !nextCharIsJ) return result + char

    // Ensure preceded by a short vowel
    const [_, prevVowels] = separateFinalVowels(result)
    if (prevVowels.length > 1 || !allShortVowels.includes(lastOf(prevVowels))) return result + char

    return result + char + char
  }, '')

  if (/nną$/.test(geminated)) return geminated.replace(/nną$/, 'nn')
  return geminated
}

const geminateFricativeClusters = (word: string) => {
  let newWord = ''

  for (let i = 0; i < word.length; i++) {
    const curChar = word[i]
    const nextChar = word[i + 1]
    const thirdChar = word[i + 2]

    if (fricatives.includes(curChar) && isConsonant(nextChar) && bilabials.includes(thirdChar)) {
      newWord += curChar + curChar + thirdChar
      i += 2
    } else {
      newWord += curChar
    }
  }

  return newWord
}

export default (word: string, context: Context) => {
  return runPhases(word, context, [
    geminateJTriggers,
    geminateFricativeClusters,
  ])
}