import type { Context } from "./types"
import syllableize from "./syllableize"
import { separateInitialConsonants, getVowelGroups, lastOf, firstOf, runPhases, getFromMap } from "./utils"
import { shortBackVowels, iMutators, iMutationMap } from "./vowels"

const shortBackVowelPosition = (syllable: string) => {
  const maybeMutatable = lastOf(getVowelGroups(syllable))

  if (!maybeMutatable || maybeMutatable.vowel.length > 1) return -1
  if (!shortBackVowels.includes(maybeMutatable.vowel)) return -1

  return maybeMutatable.position
}

const containsIMutator = (syllable: string) => {
  const [initialConsonants, rest] = separateInitialConsonants(syllable)
  return /j/.test(initialConsonants) || iMutators.includes(firstOf(rest))
}

const iMutate = (syllable: string, nextSyllable: string) => {
  if (!containsIMutator(nextSyllable)) return syllable
  
  const position = shortBackVowelPosition(syllable)
  if (position === -1) return syllable

  const letter = syllable[position]
  const mutatedLetter = getFromMap(iMutationMap, letter)

  return `${syllable.slice(0, position)}${mutatedLetter}${syllable.slice(position + 1)}`
}

const handleIMutation = (word: string) => {
  const syllables = syllableize(word)
  
  return syllables.map((syllable, index) => {
    const nextSyllable = syllables[index + 1]
    if (!nextSyllable) return syllable

    return iMutate(syllable, nextSyllable)
  }).join('')
}

export default (word: string, context: Context) => {
  return runPhases(word, context, [handleIMutation])
}