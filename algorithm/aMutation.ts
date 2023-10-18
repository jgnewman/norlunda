import type { Context } from "./types"
import { aMutators, longOMutators } from "./vowels"
import syllableize from "./syllableize"
import {
  separateInitialConsonants,
  firstOf,
  lastOf,
  getVowelGroups,
  separateFinalConsonants,
  runPhases,
} from "./utils"

const containsAMutator = (syllable: string) => {
  const [_, rest] = separateInitialConsonants(syllable)
  return aMutators.includes(firstOf(rest))
}

const containsLongOMutator = (syllable: string) => {
  const [_, rest] = separateInitialConsonants(syllable)
  return longOMutators.includes(firstOf(rest))
}

const vowelPosition = (shortVowel: string, syllable: string) => {
  const maybeMutatable = lastOf(getVowelGroups(syllable))
  if (!maybeMutatable || maybeMutatable.vowel !== shortVowel) return -1
  return maybeMutatable.position
}

const mutateU = (syllable: string, nextSyllable: string) => {
  if (!containsAMutator(nextSyllable)) return syllable
  
  const position = vowelPosition('u', syllable)
  if (position === -1) return syllable

  return `${syllable.slice(0, position)}${'o'}${syllable.slice(position + 1)}`
}

const jBlocksMutation = (syllable: string, nextSyllable: string) => {
  const [_, finalConsonantsInSyllable] = separateFinalConsonants(syllable)
  const [initialConsonantsInNextSyllable] = separateInitialConsonants(nextSyllable)
  return /j/.test(finalConsonantsInSyllable + initialConsonantsInNextSyllable)
}

const nasalClusterTriggersMutation = (syllable: string, nextSyllable: string) => {
  const [_, finalConsonantsInSyllable] = separateFinalConsonants(syllable)
  const [initialConsonantsInNextSyllable] = separateInitialConsonants(nextSyllable)
  const combinedConsonants = finalConsonantsInSyllable + initialConsonantsInNextSyllable
  return combinedConsonants.length > 1 && /^(m|n)/.test(combinedConsonants)
}

const mutateI = (syllable: string, nextSyllable: string) => {
  if (!containsAMutator(nextSyllable)) return syllable
  
  const position = vowelPosition('i', syllable)
  if (position === -1) return syllable
  if (jBlocksMutation(syllable, nextSyllable)) return syllable

  return `${syllable.slice(0, position)}${'e'}${syllable.slice(position + 1)}`
}

const mutateShortE = (syllable: string, nextSyllable: string) => {
  if (!containsAMutator(nextSyllable)) return syllable

  const position = vowelPosition('e', syllable)
  if (position === -1) return syllable
  if (!nasalClusterTriggersMutation(syllable, nextSyllable)) return syllable

  return `${syllable.slice(0, position)}${'i'}${syllable.slice(position + 1)}`
}

const mutateLongE = (syllable: string, nextSyllable: string) => {
  if (!containsLongOMutator(nextSyllable)) return syllable

  const position = vowelPosition('ē', syllable)
  if (position === -1) return syllable

  return `${syllable.slice(0, position)}${'ɔ'}${syllable.slice(position + 1)}`
}

const handleAMutation = (word: string) => {
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


export default (word: string, context: Context) => {
  return runPhases(word, context, [handleAMutation])
}