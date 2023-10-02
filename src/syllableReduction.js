const syllableize = require("./syllableize")
const {
  firstOf,
  lastOf,
  isVowel,
  separateFinalVowels,
  allButLastOf,
  isConsonant,
} = require("./utils")
const { longVowelVariantOf } = require("./vowels")

const shortenThreeSyllablesPlus = (word) => {
  const syllables = syllableize(word)
  if (syllables.length < 3) return word

  const firstSyllable = firstOf(syllables)
  const secondSyllable = syllables[1]
  const lastSyllable = lastOf(syllables)

  // In theory, the first letter of the second syllable will always be
  // a consonant in words with this many syllables.
  const firstConsOfSecondSyllable = firstOf(secondSyllable)
  const [lastSyllPrefix, finalVowels] = separateFinalVowels(lastSyllable)
  const lastConsOfLastSyllable = lastOf(lastSyllPrefix)

  return firstSyllable + firstConsOfSecondSyllable + lastConsOfLastSyllable + finalVowels
}

const softConsToLongVowel = (word) => {
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

    if (!/[hw]/.test(char)) return result + char

    const prevChar = lastOf(result)
    if (!isVowel(prevChar) || !nextCharIsVowel) return result + char

    // At this point we've hit a trigger character surrouned by vowels
    trackingChange = true

    const [_, prevVowel] = separateFinalVowels(result)
    if (prevVowel.length > 1) return result

    return allButLastOf(result) + longVowelVariantOf(prevVowel);

  }, '')
}

const fixDoubleStops = (word) => {
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
 
  return newWord
}

module.exports = (word) => {
  const phase1 = shortenThreeSyllablesPlus(word)
  const phase2 = softConsToLongVowel(phase1)
  const phase3 = fixDoubleStops(phase2)
  return phase3
}