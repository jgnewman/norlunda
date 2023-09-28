const { baseVowels, nasalVowels, longNasalVowels, longVowels, shortVowelVariantOf, longVowelVariantOf } = require('./vowels')
const { isConsonant, lastOf, allButLastOf, separateFinalConsonants, separateFinalVowels } = require('./utils')
const syllableize = require('./syllableize')

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

const shortenLongPlusW = (word) => {
  return word.replace(longPlusWRegex, (_, p1) => shortVowelVariantOf(p1) + 'w')
}

const dropMultiSyllabicFinalIO = (word) => {
  const syllables = syllableize(word)
  if (syllables.length < 2) return word

  const wordEndsWithConsPlusIO = isConsonant(word[word.length - 2]) && /[io]/.test(lastOf(word))
  if (!wordEndsWithConsPlusIO) return word

  const newWord = word.replace(/[io]$/, '')
  const newSyllables = syllableize(newWord)
  
  const lastSyllable = lastOf(newSyllables)
  const [leadLetters, _] = separateFinalConsonants(lastSyllable)
  const [__, leadVowels] = separateFinalVowels(leadLetters)

  if (leadVowels.length > 1) return word

  const leadSyllables = allButLastOf(newSyllables)
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

module.exports = (word) => {
  const phase1 = mergeInfinitives(word)
  const phase2 = denasalize(phase1)
  const phase3 = monophthongize(phase2)
  const phase4 = shortenLongPlusW(phase3)
  const phase5 = dropMultiSyllabicFinalIO(phase4)
  const phase6 = mergeWordFinalShortVowels(phase5)
  return phase6
}