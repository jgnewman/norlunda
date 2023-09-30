const { pgmcFricatives } = require('./consonants')
const syllableize = require('./syllableize')
const { lastOf, allButLastOf, containsUncomfortableConsonantCluster, endsWithUncomfortableConsonantCluster, isConsonant, fixUncomfortableEndCluster, separateInitialConsonants, firstOf } = require('./utils')
const {
  allShortVowels,
  allNasalVowels,
  baseVowels,
  longVowels,
  nasalVowels,
  longNasalVowels,
  overlongVowels,
  overlongNasalVowels,
  shortVowelVariantOf,
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
  const nextToLastCharIsCons = isConsonant(lastOf(allButLastOf(result)))

  if (newLastChar === 'j' && nextToLastCharIsCons) return allButLastOf(result) + 'i'
  if (newLastChar === 'w' && nextToLastCharIsCons) return allButLastOf(result) + 'u'

  if (!endsWithUncomfortableConsonantCluster(result)) return result

  return fixUncomfortableEndCluster(result)
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

const shortenPreClusterLongVowels = (word) => {
  let newWord = ''
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    
    if (longVowels.includes(char) || longNasalVowels.includes(char)) {
      const [followingConsonants, _] = separateInitialConsonants(word.slice(i + 1))
      const consLength = followingConsonants.length
      
      if (consLength >= 3) {
        newWord += shortVowelVariantOf(char)

        let newConsonants = followingConsonants
        const firstConsIsFricative = pgmcFricatives.includes(followingConsonants[0])

        if (firstConsIsFricative) {
          newConsonants = firstOf(newConsonants) + newConsonants.slice(2)
        }

        newWord += newConsonants
        i += consLength
        continue
      }
    }

    newWord += char
  }

  return newWord
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
  const phase5 = shortenPreClusterLongVowels(phase4)
  const phase6 = mergeWordFinalNasals(phase5)
  return phase6
}