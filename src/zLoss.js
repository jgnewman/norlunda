const syllableize = require('./syllableize')
const {
  allButLastOf,
  lastOf,
  isConsonant,
  separateFinalVowels,
  endsWithUncomfortableConsonantCluster,
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
    newWord = allButLastOf(newWord) + 'a' + lastOf(newWord)
  }

  return newWord.replace(/wu$/, 'u')
}

module.exports = (word) => {
  const phase1 = dropFinalZ(word)
  return phase1.replace(/z/g, 'r')
}