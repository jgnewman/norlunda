const syllableize = require("./syllableize")
const { separateInitialConsonants, getVowelGroups, lastOf, firstOf, runPhases } = require("./utils")
const { shortBackVowels, iMutators, iMutationMap } = require("./vowels")

const shortBackVowelPosition = (syllable) => {
  const maybeMutatable = lastOf(getVowelGroups(syllable))

  if (!maybeMutatable || maybeMutatable.vowel.length > 1) return -1
  if (!shortBackVowels.includes(maybeMutatable.vowel)) return -1

  return maybeMutatable.position
}

const containsIMutator = (syllable) => {
  const [initialConsonants, rest] = separateInitialConsonants(syllable)
  return /j/.test(initialConsonants) || iMutators.includes(firstOf(rest))
}

const iMutate = (syllable, nextSyllable) => {
  if (!containsIMutator(nextSyllable)) return syllable
  
  const position = shortBackVowelPosition(syllable)
  if (position === -1) return syllable

  const letter = syllable[position]
  const mutatedLetter = iMutationMap[letter]

  return `${syllable.slice(0, position)}${mutatedLetter}${syllable.slice(position + 1)}`
}

const handleIMutation = (word) => {
  const syllables = syllableize(word)
  
  return syllables.map((syllable, index) => {
    const nextSyllable = syllables[index + 1]
    if (!nextSyllable) return syllable

    return iMutate(syllable, nextSyllable)
  }).join('')
}

module.exports = (word, context) => {
  return runPhases(word, context, [handleIMutation])
}