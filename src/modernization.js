const syllableize = require("./syllableize")
const shiftFricatives = require("./shiftFricatives")
const {
  firstOf,
  removeVowels,
  separateFinalConsonants,
  separateInitialConsonants,
  containsUncomfortableConsonantCluster,
} = require("./utils")

const tryToShortenSecondSyllable = (word) => {
  const hasInfinitiveSuffix = word.endsWith('an')

  const syllables = syllableize(word.replace(/an$/, ''))
  if (syllables.length < 2) return word

  const secondSyllable = syllables[1]
  const thirdSyllable = syllables[2] ?? ''

  const [_, endCons] = separateFinalConsonants(secondSyllable)
  const [beginCons, __] = separateInitialConsonants(thirdSyllable)
  if (!endCons.length && !beginCons.length) return word
  
  const newWord = firstOf(syllables) + removeVowels(secondSyllable) + syllables.slice(2).join('')
  if (containsUncomfortableConsonantCluster(newWord)) return word

  return newWord + (hasInfinitiveSuffix ? 'an' : '')
}

module.exports = (word) => {
  const phase1 = tryToShortenSecondSyllable(word)
  const phase2 = shiftFricatives(phase1)
  return phase2
}