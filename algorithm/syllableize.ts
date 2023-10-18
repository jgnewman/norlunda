import { separateInitialVowels, separateInitialConsonants, containsVowels } from "./utils"

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
