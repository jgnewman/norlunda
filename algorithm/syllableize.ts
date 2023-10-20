import {
  separateInitialVowels,
  separateInitialConsonants,
  containsVowels,
  lastOf,
  separateFinalConsonants,
  separateFinalVowels,
  allButLastOf,
} from "./utils"
import { baseVowels, baseVowelsRegex, longVowelVariantOf } from "./vowels"

const getVowelConsonantChunk = (word: string) => {
  const [vowels, rest] = separateInitialVowels(word)
  const [consonants, remainder] = separateInitialConsonants(rest)

  if (!consonants.length) return [vowels, rest]

  if (consonants.length === 1) {
    return containsVowels(remainder) ? [vowels, consonants + remainder] : [vowels + consonants, remainder]
  }

  return [vowels + consonants[0], consonants.slice(1) + remainder]
}

const getInitialSyllable = (word: string) => {
  const [initialConsonants, rest] = separateInitialConsonants(word)
  const [vowelConsonantChunk, remainder] = getVowelConsonantChunk(rest)
  return [initialConsonants + vowelConsonantChunk, remainder]
}

const syllableize = (word: string, syllables: string[] = []): string[] => {
  if (!word) return syllables

  const [initialSyllable, remainder] = getInitialSyllable(word)

  if (!containsVowels(remainder)) {
    return [...syllables, initialSyllable + remainder]
  }
  
  return syllableize(remainder, [...syllables, initialSyllable])
}

export default syllableize

// aplaz -> ap-laz
// hagatusi -> ha-ga-tu-si
// hrussą -> hrus-są

export const finalSylHasShortVowel = (word: string) => {
  const prevSyllable = lastOf(syllableize(word))
  const [syllPrefix] = separateFinalConsonants(prevSyllable)
  const [_, vowelCluster] = separateFinalVowels(syllPrefix)
  return baseVowels.includes(vowelCluster)
}

export const lengthenFinalSylShortVowel = (word: string) => {
  if (!finalSylHasShortVowel(word)) return word
  const syllables = syllableize(word)
  const lastSyllable = lastOf(syllables)
  const restSyllables = allButLastOf(syllables)
  return restSyllables.join('') + lastSyllable.replace(baseVowelsRegex, (_, p1) => longVowelVariantOf(p1))
}
