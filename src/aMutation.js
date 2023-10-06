const { aMutators } = require("./vowels")
const { separateInitialConsonants, firstOf, lastOf, getVowelGroups, separateFinalConsonants, runPhases } = require("./utils")
const syllableize = require("./syllableize")

const containsAMutator = (syllable) => {
  const [_, rest] = separateInitialConsonants(syllable)
  return aMutators.includes(firstOf(rest))
}

const mutatableVowelPosition = (shortVowel, syllable) => {
  const maybeMutatable = lastOf(getVowelGroups(syllable))
  if (!maybeMutatable || maybeMutatable.vowel !== shortVowel) return -1
  return maybeMutatable.position
}

const mutateU = (syllable, nextSyllable) => {
  if (!containsAMutator(nextSyllable)) return syllable
  
  const shortUPosition = mutatableVowelPosition('u', syllable)
  const longUPosition = mutatableVowelPosition('ū', syllable)

  if (shortUPosition !== -1) return `${syllable.slice(0, shortUPosition)}${'o'}${syllable.slice(shortUPosition + 1)}`
  if (longUPosition !== -1) return `${syllable.slice(0, shortUPosition)}${'ō'}${syllable.slice(shortUPosition + 1)}`

  return syllable
}

const jBlocksMutation = (syllable, nextSyllable) => {
  const [_, finalConsonantsInSyllable] = separateFinalConsonants(syllable)
  const [initialConsonantsInNextSyllable] = separateInitialConsonants(nextSyllable)
  return /j/.test(finalConsonantsInSyllable + initialConsonantsInNextSyllable)
}

const nasalClusterTriggersMutation = (syllable, nextSyllable) => {
  const [_, finalConsonantsInSyllable] = separateFinalConsonants(syllable)
  const [initialConsonantsInNextSyllable] = separateInitialConsonants(nextSyllable)
  const combinedConsonants = finalConsonantsInSyllable + initialConsonantsInNextSyllable
  return combinedConsonants.length > 1 && /^(m|n)/.test(combinedConsonants)
}

const mutateI = (syllable, nextSyllable) => {
  if (!containsAMutator(nextSyllable)) return syllable
  
  const shortIPosition = mutatableVowelPosition('i', syllable)
  const longIPosition = mutatableVowelPosition('ī', syllable)
  const blockedByJ = jBlocksMutation(syllable, nextSyllable)

  if (blockedByJ) return syllable
  if (shortIPosition !== -1) return `${syllable.slice(0, shortIPosition)}${'e'}${syllable.slice(shortIPosition + 1)}`
  if (longIPosition !== -1) return `${syllable.slice(0, shortIPosition)}${'ē'}${syllable.slice(shortIPosition + 1)}`

  return syllable
}

const mutateE = (syllable, nextSyllable) => {
  if (!containsAMutator(nextSyllable)) return syllable

  const position = mutatableVowelPosition('e', syllable)
  if (position === -1) return syllable
  if (!nasalClusterTriggersMutation(syllable, nextSyllable)) return syllable

  return `${syllable.slice(0, position)}${'i'}${syllable.slice(position + 1)}`
}

const handleAMutation = (word) => {
  const syllables = syllableize(word)
  
  return syllables.map((syllable, index) => {
    const nextSyllable = syllables[index + 1]
    if (!nextSyllable) return syllable

    const phase1 = mutateU(syllable, nextSyllable)
    const phase2 = mutateI(phase1, nextSyllable)
    const phase3 = mutateE(phase2, nextSyllable)

    return phase3
  }).join('')
}


module.exports = (word) => {
  return runPhases(word, [handleAMutation])
}