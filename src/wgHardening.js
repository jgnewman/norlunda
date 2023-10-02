// NOTE: This file assumes words are going to be passed in using standardized PGmc
// spelling which means we do not expect to see any ð characters. They should all be d.

const { lastOf, firstOf, isVowel } = require('./utils')

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

module.exports = (word) => {
  const phase1 = hardenDW(word)
  // A second phase here should require no action as it only turns ð into d
  return phase1
}