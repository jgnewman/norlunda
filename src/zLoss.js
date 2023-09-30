const syllableize = require('./syllableize')
const {
  allButLastOf,
  lastOf,
  isConsonant,
  separateFinalVowels,
  endsWithUncomfortableConsonantCluster,
  fixUncomfortableEndCluster,
} = require('./utils')

const removeZ = (word) => {
  const syllables = syllableize(word)
  let newWord = word.replace(/z$/g, '')

  if (syllables.length > 1) {
    const [stem, _] = separateFinalVowels(newWord)
    newWord = stem
  }
  
  return newWord
}

const removeS = (word) => {
  const nextToLastCharIsCons = isConsonant(lastOf(allButLastOf(word)))
  if (!nextToLastCharIsCons) return word
  return allButLastOf(word)
}

const dropFinalZ = (word) => {
  const lastChar = lastOf(word)
  let newWord = lastChar === 'z' ? removeZ(word) :
                lastChar === 's' ? removeS(word) :
                word
              
  if (word === newWord) return newWord

  const newLastChar = lastOf(newWord)
  const nextToLastCharIsCons = isConsonant(lastOf(allButLastOf(newWord)))

  if (newLastChar === 'j' && nextToLastCharIsCons) {
    newWord = allButLastOf(newWord) + 'i'
  }

  if (newLastChar === 'w' && nextToLastCharIsCons) {
    newWord = allButLastOf(newWord) + 'u'
  }

  if (endsWithUncomfortableConsonantCluster(newWord)) {
    newWord = fixUncomfortableEndCluster(newWord)
  }

  return newWord
}

const fixSemiVowelsAndZ = (word) => {
  return word.replace(/wu$/, 'u').replace(/ij$/, 'i').replace(/z/g, 'r')
}

module.exports = (word) => {
  const phase1 = dropFinalZ(word)
  const phase2 = fixSemiVowelsAndZ(phase1)
  return phase2
}