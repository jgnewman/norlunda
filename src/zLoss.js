const syllableize = require('./syllableize')
const {
  allButLastOf,
  lastOf,
  separateInitialConsonants,
  separateFinalConsonants,
  isUncomfortableConsonantCluster,
  isConsonant,
} = require('./utils')

const fixUnconfortableEndClusters = (word) => {
  const [leadingCluster, finalConsonants] = separateFinalConsonants(word)
  if (finalConsonants.length < 2) return word

  let lead = leadingCluster
  let endCluster = finalConsonants

  if (endCluster.length > 2) {
    lead = lead + endCluster.slice(0, -2)
    endCluster = endCluster.slice(-2)
  }

  const [first, second] = finalConsonants.split('')

  if (isUncomfortableConsonantCluster(first, second)) {
    endCluster = first + 'a' + second
  }
  
  return lead + endCluster
}

const dropFinalZ = (word) => {
  const lastChar = lastOf(word)
  const nextToLastCharIsCons = isConsonant(lastOf(allButLastOf(word)))
  if (lastChar !== 'z' && !(lastChar === 's' && nextToLastCharIsCons)) return word

  const syllables = syllableize(word)
  const leadingSyllables = allButLastOf(syllables)
  const lastSyllable = lastOf(syllables)

  let newLastSyllable = lastSyllable
  if (lastChar === 'z') {
    newLastSyllable = lastSyllable.replace(/z$/g, '')
  } else if (lastChar === 's' && nextToLastCharIsCons) {
    newLastSyllable = lastSyllable.replace(/s$/g, '')
  }
  
  if (syllables.length > 1) {
    const [initialConsonantsOfLastSyllable] = separateInitialConsonants(newLastSyllable)
    newLastSyllable = initialConsonantsOfLastSyllable
  }

  const newLastChar = lastOf(newLastSyllable)
  const newLastCharFollowsCons = isConsonant(lastOf(allButLastOf(newLastSyllable)))

  if (newLastChar === 'j' && newLastCharFollowsCons) {
    newLastSyllable = allButLastOf(newLastSyllable) + 'i'
  }

  if (newLastChar === 'w' && newLastCharFollowsCons) {
    newLastSyllable = allButLastOf(newLastSyllable) + 'u'
  }

  return leadingSyllables.join('') + newLastSyllable
}

module.exports = (word) => {
  const phase1 = dropFinalZ(word)
  const phase2 = fixUnconfortableEndClusters(phase1)
  return phase2.replace(/z/g, 'r')
}