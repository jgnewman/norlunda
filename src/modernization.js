const syllableize = require("./syllableize")
const shiftFricatives = require("./shiftFricatives")
const {
  isVowel,
  firstOf,
  lastOf,
  allButLastOf,
  removeVowels,
  separateFinalConsonants,
  separateInitialConsonants,
  separateFinalVowels,
  endsWithUncomfortableConsonantCluster,
  containsVowels,
} = require("./utils")
const { baseVowels, longVowels, longVowelVariantOf, shortVowelVariantOf } = require("./vowels")
const { pgmcNasals, pgmcApproximants } = require("./consonants")

const shortRegex = new RegExp(`(${baseVowels.join('|')})`, 'g')
const longPlusWRegex = new RegExp(`(${longVowels.join('|')})w`, 'g')

const dropWAndModVowels = (word) => {
  let newWord = word
  const nextToLastCharIsVowel = isVowel(lastOf(allButLastOf(word)))

  if (/w$/.test(newWord) && nextToLastCharIsVowel) {
    newWord = allButLastOf(newWord)

    // Lengthen a preceding short vowel
    const [_, finalVowels] = separateFinalVowels(newWord)    
    if (finalVowels.length === 1 && baseVowels.includes(finalVowels)) {
      newWord = newWord.replace(shortRegex, (_, p1) => longVowelVariantOf(p1))
    }
  }

  return newWord.replace(longPlusWRegex, (_, p1) => shortVowelVariantOf(p1) + 'w')
}

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
  if (endsWithUncomfortableConsonantCluster(newWord)) return word

  return newWord + (hasInfinitiveSuffix ? 'an' : '')
}

const isNasalOrApproximant = (char) => {
  return pgmcNasals.includes(char) || pgmcApproximants.includes(char)
}

const shiftVowels = (word) => {
  return word
    .replace(/a$/, (_, __, src) => containsVowels(src.slice(0, -1)) ? 'a' : 'aa')
    .replace(/æ/g, 'e')
    .replace(/i/g, 'i')
    .replace(/y/g, 'u')
    .replace(/ā/g, (_, index, src) => !!src[index + 1] ? 'ei' : 'aa')
    .replace(/ǣ/g, 'oe')
    .replace(/ē/g, 'ee')
    .replace(/ī/g, 'ie')
    .replace(/ō/g, (_, index, src) => isNasalOrApproximant(src[index + 1]) ? 'oe' : 'o')
    .replace(/[ūȳ]/g, 'au')
}

module.exports = (word) => {
  const phase1 = dropWAndModVowels(word)
  const phase2 = tryToShortenSecondSyllable(phase1)
  const phase3 = shiftFricatives(phase2)
  const phase4 = shiftVowels(phase3)
  return phase4
}