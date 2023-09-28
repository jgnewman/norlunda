const syllableize = require('./syllableize')
const { lastOf, allButLastOf, containsUncomfortableConsonantCluster, endsWithUncomfortableConsonantCluster } = require('./utils')
const {
  allShortVowels,
  allNasalVowels,
  baseVowels,
  longVowels,
  nasalVowels,
  longNasalVowels,
  overlongVowels,
  overlongNasalVowels,
} = require('./vowels')

const overlongRegex = new RegExp(`(${overlongVowels.join('|')})`, 'g')
const overlongNasalRegex = new RegExp(`(${overlongNasalVowels.join('|')})`, 'g')
const longRegex = new RegExp(`(${longVowels.join('|')})`, 'g')
const longNasalRegex = new RegExp(`(${longNasalVowels.join('|')})`, 'g')

const relaxOverlongs = (word) => {
  return word
    .replace(overlongRegex, (_, p1) => longVowels[overlongVowels.indexOf(p1)])
    .replace(overlongNasalRegex, (_, p1) => longNasalVowels[overlongNasalVowels.indexOf(p1)])
}

const monophthongizeNonInitialDiphthongs = (word) => {
  const [firstSyllable, ...restSyllables] = syllableize(word)
  return firstSyllable + restSyllables.map(syllable => {
    return syllable.replace(/ai/g, 'ē').replace(/au/g, 'ō')
  }).join('')
}

const dropWordFinalShortVowels = (word) => {
  const lastChar = lastOf(word)
  if (!allShortVowels.includes(lastChar)) return word

  const result = allButLastOf(word)
  const newLastChar = lastOf(result)

  if (newLastChar === 'j') return allButLastOf(result) + 'i'
  if (newLastChar === 'w') return allButLastOf(result) + 'u'

  if (!endsWithUncomfortableConsonantCluster(result)) return result

  return allButLastOf(result) + 'a' + lastOf(result)
}

const shortenFinalSyllableLongVowels = (word) => {
  const syllables = syllableize(word)
  if (syllables.length < 2) return word

  const leadingSyllables = allButLastOf(syllables)
  const lastSyllable = lastOf(syllables)

  const newLastSyllable = lastSyllable
    .replace(longRegex, (_, p1) => baseVowels[longVowels.indexOf(p1)])
    .replace(longNasalRegex, (_, p1) => nasalVowels[longNasalVowels.indexOf(p1)])

  const newWord = leadingSyllables.join('') + newLastSyllable

  return newWord.replace(/jo$/, 'ja').replace(/wo$/, 'u')
}

const mergeWordFinalNasals = (word) => {
  const lastChar = lastOf(word)
  if (!allNasalVowels.includes(lastChar)) return word
  return allButLastOf(word) + 'ą'
}

module.exports = (word) => {
  const phase1 = relaxOverlongs(word)
  const phase2 = monophthongizeNonInitialDiphthongs(phase1)
  const phase3 = dropWordFinalShortVowels(phase2)
  const phase4 = shortenFinalSyllableLongVowels(phase3)
  const phase5 = mergeWordFinalNasals(phase4)
  return phase5
}