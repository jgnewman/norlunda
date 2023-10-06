const { aMutators, longOMutators } = require("./vowels")
const syllableize = require("./syllableize")
const {
  separateInitialConsonants,
  firstOf,
  lastOf,
  getVowelGroups,
  separateFinalConsonants,
  runPhases,
} = require("./utils")

const containsAMutator = (syllable) => {
  const [_, rest] = separateInitialConsonants(syllable)
  return aMutators.includes(firstOf(rest))
}

const containsLongOMutator = (syllable) => {
  const [_, rest] = separateInitialConsonants(syllable)
  return longOMutators.includes(firstOf(rest))
}

const vowelPosition = (shortVowel, syllable) => {
  const maybeMutatable = lastOf(getVowelGroups(syllable))
  if (!maybeMutatable || maybeMutatable.vowel !== shortVowel) return -1
  return maybeMutatable.position
}

const mutateU = (syllable, nextSyllable) => {
  if (!containsAMutator(nextSyllable)) return syllable
  
  const position = vowelPosition('u', syllable)
  if (position === -1) return syllable

  return `${syllable.slice(0, position)}${'o'}${syllable.slice(position + 1)}`
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
  
  const position = vowelPosition('i', syllable)
  if (position === -1) return syllable
  if (jBlocksMutation(syllable, nextSyllable)) return syllable

  return `${syllable.slice(0, position)}${'e'}${syllable.slice(position + 1)}`
}

const mutateShortE = (syllable, nextSyllable) => {
  if (!containsAMutator(nextSyllable)) return syllable

  const position = vowelPosition('e', syllable)
  if (position === -1) return syllable
  if (!nasalClusterTriggersMutation(syllable, nextSyllable)) return syllable

  return `${syllable.slice(0, position)}${'i'}${syllable.slice(position + 1)}`
}

const mutateLongE = (syllable, nextSyllable) => {
  if (!containsLongOMutator(nextSyllable)) return syllable

  const position = vowelPosition('ē', syllable)
  if (position === -1) return syllable

  return `${syllable.slice(0, position)}${'ɔ'}${syllable.slice(position + 1)}`
}

const handleAMutation = (word) => {
  const syllables = syllableize(word)
  
  return syllables.map((syllable, index) => {
    const nextSyllable = syllables[index + 1]
    if (!nextSyllable) return syllable

    const phase1 = mutateU(syllable, nextSyllable)
    const phase2 = mutateI(phase1, nextSyllable)
    const phase3 = mutateShortE(phase2, nextSyllable)
    const phase4 = mutateLongE(phase3, nextSyllable)

    return phase4
  }).join('')
}


module.exports = (word) => {
  return runPhases(word, [handleAMutation])
}