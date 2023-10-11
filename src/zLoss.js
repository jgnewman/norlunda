const {
  allButLastOf,
  lastOf,
  isConsonant,
  endsWithUncomfortableConsonantCluster,
  fixUncomfortableEndCluster,
  runPhases,
  containsVowels,
} = require('./utils')
const { baseVowels, longVowelVariantOf } = require('./vowels')

const dropFinalZ = (word) => {
  const lastChar = lastOf(word)
  const nextToLastChar = lastOf(allButLastOf(word))
  if (lastChar === 's' && nextToLastChar !== 's' && isConsonant(nextToLastChar)) return word.slice(0, -1)
  
  if (/iwaz$/.test(word)) return word.replace(/iwaz$/, 'a')
  if (/ijaz$/.test(word)) return word.replace(/ijaz$/, !containsVowels(word.slice(0, -4)) ? 'ī' : '')
  if (/waz$/.test(word)) return word.replace(/waz$/, isConsonant(word.slice(-4)[0]) ? 'a' : '')
  if (/az$/.test(word)) return word.replace(/az$/, containsVowels(word.slice(0, -2)) ? '' : 'az')
  if (/iwiz$/.test(word)) return word.replace(/iwiz$/, isConsonant(word.slice(-5)[0]) ? 'a' : '')
  if (/iz$/.test(word)) return word.replace(/iz$/, containsVowels(word.slice(0, -2)) ? '' : 'iz')
  if (/uz$/.test(word)) return word.replace(/uz$/, containsVowels(word.slice(0, -2)) ? '' : 'uz')

  return word
}

const fixRemainingZAndHs = (word) => {
  return word.replace(/hs/, 'ks').replace(/[^z]?z/g, (matchedText) => {
    const [preZ] = matchedText.split('')
    return baseVowels.includes(preZ) ? longVowelVariantOf(preZ) + 'r' : preZ + 'r'
  })
}

const handleUncomfortableEndCluster = (word) => {
  if (!endsWithUncomfortableConsonantCluster(word)) return word
  return fixUncomfortableEndCluster(word)
}

module.exports = (word, context) => {
  return runPhases(word, context, [
    dropFinalZ,
    fixRemainingZAndHs,
    handleUncomfortableEndCluster,
  ])
}