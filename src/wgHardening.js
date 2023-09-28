// NOTE: This file assumes words are going to be passed in using standardized PGmc
// spelling which means we do not expect to see any ð characters. They should all be d.

const { lastOf, firstOf, isVowel, isConsonant, separateFinalVowels, separateInitialVowels, separateFinalConsonants } = require('./utils')
const { allShortVowels } = require('./vowels')

const hardenDW = (word) => {
  const pieces = word.split(/dw/)

  return pieces.map((piece, index) => {
    const nextPiece = pieces[index + 1]
    if (!nextPiece) return piece

    const lastOfCurrent = lastOf(piece)
    const firstOfNext = firstOf(nextPiece)

    if (!isVowel(lastOfCurrent) || !isVowel(firstOfNext)) return piece

    return piece + 'w'
  }).join('')
}

const doubleConsonants = (word) => {
  return word.split('').reduce((result, char, index, charList) => {
    const nextChar = charList[index + 1]
    const curCharIsJ = char === 'j'
    const nextCharIsJ = nextChar === 'j'

    // Handle removing j after a double consonant
    if (curCharIsJ) {
      const [_, endConsonants] = separateFinalConsonants(result)
      const lastCons = lastOf(endConsonants)
      const nextToLastCons = endConsonants[endConsonants.length - 2]
      if (isConsonant(lastCons) && nextToLastCons === lastCons) return result
      return result + char
    }

    // Ensure a non-r consonant followed by j
    if (!isConsonant(char) || char === 'r' || !nextCharIsJ) return result + char

    // Ensure preceded by a short vowel
    const [_, prevVowels] = separateFinalVowels(result)
    if (prevVowels.length > 1 || !allShortVowels.includes(lastOf(prevVowels))) return result + char

    return result + char + char
  }, '')
}

module.exports = (word) => {
  const phase1 = hardenDW(word)
  // A middle phase here should require no action as it only turns ð into d
  const phase2 = doubleConsonants(phase1)
  return phase2
}