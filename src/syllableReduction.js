const syllableize = require("./syllableize")
const {
  firstOf,
  lastOf,
  isVowel,
  separateFinalVowels,
  allButLastOf,
  isConsonant,
  runPhases,
} = require("./utils")
const { longVowelVariantOf, baseVowels } = require("./vowels")

const shortenThreeSyllablesPlus = (word) => {
  const [hasInfinitive, root] = word.endsWith('an') ? [true, word.slice(0, -2)] : [false, word]
  const syllables = syllableize(root)

  if (syllables.length < 3) return word

  const firstSyllable = firstOf(syllables)
  const secondSyllable = syllables[1]
  const lastSyllable = lastOf(syllables)

  // In theory, the first letter of the second syllable will always be
  // a consonant in words with this many syllables.
  const firstConsOfSecondSyllable = firstOf(secondSyllable)
  const [lastSyllPrefix, finalVowels] = separateFinalVowels(lastSyllable)
  const lastConsOfLastSyllable = lastOf(lastSyllPrefix)

  const result = firstSyllable + firstConsOfSecondSyllable + lastConsOfLastSyllable + finalVowels
  return hasInfinitive ? result + 'an' : result
}

const shortenLongVerbEndings = (word) => {
  if (!/nan$/.test(word)) return word
  const prefix = word.slice(0, -3)
  if (!baseVowels.includes(lastOf(prefix))) return word
  return allButLastOf(prefix) + 'nan'
}

const medialWToLongVowel = (word) => {
  let trackingChange = false

  return word.split('').reduce((result, char, index, charList) => {
    const nextChar = charList[index + 1]
    const nextCharIsVowel = isVowel(nextChar)

    if (trackingChange && isVowel(char)) {
      if (!nextCharIsVowel) {
        trackingChange = false
      }
      return result
    }

    if (char !== 'w') return result + char

    const prevChar = lastOf(result)
    if (!isVowel(prevChar) || !nextCharIsVowel) return result + char

    // At this point we've hit a trigger character surrouned by vowels
    trackingChange = true

    const [_, prevVowel] = separateFinalVowels(result)
    if (prevVowel.length > 1) return result

    switch (prevVowel) {
      case 'æ': return allButLastOf(result) + 'au'
      default: return allButLastOf(result) + longVowelVariantOf(prevVowel)
    }
  }, '')
}

const fixStopClusters = (word) => {
  let newWord = ''

  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    const nextChar = word[i + 1]
    const thirdChar = word[i + 2]

    if (char === 'd' && nextChar === 'g' && !isConsonant(thirdChar)) {
      newWord += 'gg'
      i++
    } else if (char === 't' && nextChar === 'g' && !isConsonant(thirdChar)) {
      newWord += 'kk'
      i++
    } else {
      newWord += char
    }
  }
 
  return newWord.replace(/ngt/g, 'nt')
}

module.exports = (word) => {
  return runPhases(word, [
    shortenThreeSyllablesPlus,
    shortenLongVerbEndings,
    medialWToLongVowel,
    fixStopClusters,
  ])
}