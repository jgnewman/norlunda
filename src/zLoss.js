const {
  allButLastOf,
  lastOf,
  isConsonant,
  endsWithUncomfortableConsonantCluster,
  fixUncomfortableEndCluster,
} = require('./utils')

const dropFinalZ = (word) => {
  const lastChar = lastOf(word)
  const nextToLastChar = lastOf(allButLastOf(word))
  if (lastChar === 's' && nextToLastChar !== 's' && isConsonant(nextToLastChar)) return word.slice(0, -1)
  
  if (/iwaz$/.test(word)) return word.replace(/iwaz$/, 'a')
  if (/ijaz$/.test(word)) return word.replace(/ijaz$/, '')
  if (/waz$/.test(word)) return word.replace(/waz$/, isConsonant(word.slice(-4)[0]) ? 'a' : '')
  if (/az$/.test(word)) return word.replace(/az$/, '')
  if (/iwiz$/.test(word)) return word.replace(/iwiz$/, isConsonant(word.slice(-5)[0]) ? 'a' : '')
  if (/iz$/.test(word)) return word.replace(/iz$/, '')
  if (/uz$/.test(word)) return word.replace(/uz$/, '')

  return word
}

const rhoticizeRemainingZs = (word) => {
  return word.replace(/z/g, 'r')
}

const handleUncomfortableEndCluster = (word) => {
  if (!endsWithUncomfortableConsonantCluster(word)) return word
  return fixUncomfortableEndCluster(word)
}

module.exports = (word) => {
  const phase1 = dropFinalZ(word)
  const phase2 = rhoticizeRemainingZs(phase1)
  const phase3 = handleUncomfortableEndCluster(phase2)
  return phase3
}