const { baseVowels, nasalVowels, longNasalVowels, longVowels, shortVowelVariantOf, longVowelVariantOf } = require('./vowels')
const {
  isConsonant,
  lastOf,
  allButLastOf,
  separateFinalConsonants,
  separateFinalVowels,
  containsVowels,
  isVowel,
  reverse,
} = require('./utils')
const syllableize = require('./syllableize')
const { allConsonants } = require('./consonants')

const shortRegex = new RegExp(`(${baseVowels.join('|')})`, 'g')
const nasalRegex = new RegExp(`(${nasalVowels.join('|')})`, 'g')
const longNasalRegex = new RegExp(`(${longNasalVowels.join('|')})`, 'g')
const longPlusWRegex = new RegExp(`(${longVowels.join('|')})w`, 'g')


const mergeInfinitives = (word) => {
  return word.replace(/i?(i|j)an$/, 'an')
}

const denasalize = (word) => {
  return word
    .replace(nasalRegex, (_, p1) => baseVowels[nasalVowels.indexOf(p1)])
    .replace(longNasalRegex, (_, p1) => longVowels[longNasalVowels.indexOf(p1)])
}

const monophthongize = (word) => {
  const syllables = syllableize(word)
  return syllables.map(syllable => {
    return syllable
      .replace(/ai/g, 'ā')
      .replace(/(au|ou)/g, 'ō')
      .replace(/eu/g, 'ī')
      .replace(/iu/g, 'ȳ')
  }).join('')
}

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

const reduceFinalIja = (word) => {
  let newWord = word.replace(/wija$/, 'a')
  if (newWord !== word) return newWord

  newWord = word.replace(/ija$/, '')
  if (word === newWord) return newWord

  return containsVowels(newWord) ? newWord + 'a' : newWord + 'ī'
}

const dropMultiSyllabicFinalIO = (word) => {
  const syllables = syllableize(word)
  if (syllables.length < 2) return word

  const wordEndsWithConsPlusIO = isConsonant(word[word.length - 2]) && /[io]/.test(lastOf(word))
  if (!wordEndsWithConsPlusIO) return word

  const ioFollowsConsonantCluster = isConsonant(word[word.length - 3])
  if (ioFollowsConsonantCluster) return word

  const lastCharIsI = lastOf(word) === 'i'
  const newWord = word.replace(/[io]$/, '')

  if (!lastCharIsI) return newWord

  // Ensure that the final vowel in the new word is not a diphthong.
  const [wordWithoutFinalCons, _] = separateFinalConsonants(newWord)
  const [__, vowelsInFinalSyllable] = separateFinalVowels(wordWithoutFinalCons)
  if (vowelsInFinalSyllable.length > 1) return newWord

  const newSyllables = syllableize(newWord)
  const leadSyllables = allButLastOf(newSyllables)
  const lastSyllable = lastOf(newSyllables)

  const newLastSyllable = lastSyllable.replace(shortRegex, (_, p1) => {
    return longVowelVariantOf(p1)
  })

  return leadSyllables.join('') + newLastSyllable
}

const mergeWordFinalShortVowels = (word) => {
  const syllables = syllableize(word)
  const lastSyllable = lastOf(syllables)

  const [leadLetters, endConsonants] = separateFinalConsonants(lastSyllable)
  if (endConsonants.length) return word

  const [__, endVowels] = separateFinalVowels(leadLetters)
  if (endVowels.length > 2) return word

  const newLastSyllable = lastSyllable.replace(shortRegex, (_, p1) => 'a')

  return allButLastOf(syllables).join('') + newLastSyllable
}

const reverseWordFinalNasals = (word) => {
  if (!/(ma|na)$/.test(word)) return word

  const stem = word.slice(0, -2)
  const lastCharOfPrefix = lastOf(stem)
  if (!allConsonants.includes(lastCharOfPrefix)) return word

  // Here we know the ma/na was preceded by a consonant.
  
  const suffix = reverse(word.slice(-2))

  // Double a preceding lone consonant after a short vowel.
  let [prefix, precedingCons] = separateFinalConsonants(stem)
  const [__, prefixVowels] = separateFinalVowels(prefix)
  if (precedingCons.length === 1 && prefixVowels.length === 1 && baseVowels.includes(prefixVowels)) {
    precedingCons = precedingCons + precedingCons
  }
  
  return prefix + precedingCons + suffix
}

module.exports = (word) => {
  const phase1 = mergeInfinitives(word)
  const phase2 = denasalize(phase1)
  const phase3 = monophthongize(phase2)
  const phase4 = dropWAndModVowels(phase3)
  const phase5 = reduceFinalIja(phase4)
  const phase6 = dropMultiSyllabicFinalIO(phase5)
  const phase7 = mergeWordFinalShortVowels(phase6)
  const phase8 = reverseWordFinalNasals(phase7)
  return phase8
}