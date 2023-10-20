import type { Context, PhaseFn, PhaseFnArray } from './types'
import { allConsonants } from './consonants'
import { singularVowels } from './vowels'

function lastOf<T>(arr: T[]): T
function lastOf(arr: string): string
function lastOf (arr: any) {
  return arr[arr.length - 1]
}

function firstOf<T>(arr: T[]): T | void
function firstOf(arr: string): string
function firstOf (arr: any) {
  return typeof arr === 'string' ? (arr[0] ?? '') : arr[0]
}

function allButLastOf<T>(arr: T[]): T[]
function allButLastOf(arr: string): string
function allButLastOf (arr: any) {
  return arr.slice(0, -1)
}

function reverse<T>(arr: T[]): T[]
function reverse(arr: string): string
function reverse (arr: any) {
  return typeof arr === 'string' ? arr.split('').reverse().join('') : arr.reverse()
}

export { lastOf, firstOf, allButLastOf, reverse }

export const beginsWithVowel = (word: string) => {
  return singularVowels.includes(firstOf(word))
}

export const beginsWithConsonant = (word: string) => {
  return allConsonants.includes(firstOf(word))
}

export const endsWithVowel = (word: string) => {
  return singularVowels.includes(lastOf(word))
}

export const endsWithConsonant = (word: string) => {
  return allConsonants.includes(lastOf(word))
}

export const isVowel = (letter: string) => {
  return singularVowels.includes(letter)
}

export const isConsonant = (letter: string) => {
  return allConsonants.includes(letter)
}

export const containsVowels = (word: string) => {
  return word.split('').some(isVowel)
}

export const containsConsonants = (word: string) => {
  return word.split('').some(isConsonant)
}

export const separateInitialVowels = (word: string) => {
  if (isConsonant(firstOf(word))) return ['', word]
  
  let vowels = ''
  let rest = word

  while (rest.length && isVowel(firstOf(rest))) {
    vowels += firstOf(rest)
    rest = rest.slice(1)
  }

  return [vowels, rest]
}

export const separateFinalVowels = (word: string) => {
  if (isConsonant(lastOf(word))) return [word, '']

  let vowels = ''
  let rest = word

  while (rest.length && isVowel(lastOf(rest))) {
    vowels = lastOf(rest) + vowels
    rest = rest.slice(0, -1)
  }

  return [rest, vowels]
}

export const separateInitialConsonants = (word: string) => {
  if (isVowel(firstOf(word))) return ['', word]

  let consonants = ''
  let rest = word

  while (rest.length && isConsonant(firstOf(rest))) {
    consonants += firstOf(rest)
    rest = rest.slice(1)
  }

  return [consonants, rest]
}

export const separateFinalConsonants = (word: string) => {
  if (isVowel(lastOf(word))) return [word, '']

  let consonants = ''
  let rest = word

  while (rest.length && isConsonant(lastOf(rest))) {
    consonants = lastOf(rest) + consonants
    rest = rest.slice(0, -1)
  }

  return [rest, consonants]
}

export const getVowelGroups = (word: string) => {
  const groups = []
  let isTrackingPosition = false
  let currentPosition = 0
  let currentGroup = ''

  for (let i = 0; i < word.length; i++) {
    const letter = word[i]

    if (isVowel(letter)) {
      if (!isTrackingPosition) {
        isTrackingPosition = true
        currentPosition = i
      }
      currentGroup += letter
    } else {
      isTrackingPosition = false
      if (currentGroup) groups.push({ position: currentPosition, vowel: currentGroup })
      currentGroup = ''
    }
  }

  if (currentGroup) groups.push({ position: currentPosition, vowel: currentGroup })
  return groups
}

export const removeVowels = (word: string) => {
  return word.split('').filter(isConsonant).join('')
}

export const removeConsonants = (word: string) => {
  return word.split('').filter(isVowel).join('')
}

/**
 * Comfortable clusters
 * ds, dt,
 * þs, þt,
 * ft,
 * gd, gþ, gs,
 * hs, ht, 
 * ks, kt,
 * lb, ld, lþ, lf, lg, lk, lm, ln, lp, ls, lt, lv, lz
 * mp, 
 * nd, nþ, ng, nk, ns, nt, 
 * ps,
 * rb, rd, rþ, rf, rg, rk, rm, rn, rp, rs, rt, rv, rz
 * sk, sp, st
 * ts, 
 */
// Not exported
const isUncomfortableEndCluster = (a: string, b: string) => {
  return a && b && a !== b && !/^(d[st]|þ[st]|ft|g[dþs]|hs|ht|k[st]|l[bdþfgkmnpstvz]|mp|n[dþgkst]|ps|r[bdþfgkmnpstvz]|s[kpt]|ts)$/.test(a + b)
}

// Not exported
const containsUncomfortableEndCluster = (word: string) => {
  let containsCluster = false
  let isTrackingCluster = false
  
  for (let i = 0; i < word.length; i++) {
    const letter = word[i]
    const nextLetter = word[i + 1]
    
    if (isConsonant(letter)) {
      if (!isTrackingCluster) {
        isTrackingCluster = true
      }
    } else {
      isTrackingCluster = false
    }
    
    if (isTrackingCluster && isUncomfortableEndCluster(letter, nextLetter)) {
      containsCluster = true
      break
    }
  }

  return containsCluster
}

export const endsWithUncomfortableConsonantCluster = (word: string) => {
  const [_, cluster] = separateFinalConsonants(word)
  return containsUncomfortableEndCluster(cluster)
}

export const fixUncomfortableEndCluster = (word: string) => {
  return allButLastOf(word) + 'a' + lastOf(word)
}

export const dedoubleConsonantsInCluster = (word: string) => {
  let newWord = ''

  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    const nextChar = word[i + 1]
    const thirdChar = word[i + 2]
    
    if (
      isConsonant(char) &&
      isConsonant(nextChar) &&
      isConsonant(thirdChar) &&
      (char === nextChar || nextChar === thirdChar)) {
      newWord += (char === nextChar) ? char + thirdChar : char + nextChar  
      i += 2
    } else {
      newWord += char
    }
  }

  return newWord
}

export const runPhases = (word: string, context: Context, phaseFnArray: PhaseFnArray, log = false) => {
  const result = phaseFnArray.reduce<string[]>((resultList, phaseFn: PhaseFn) => {
    return [...resultList, phaseFn(resultList.length ? lastOf(resultList) : word, context)]
  }, [])

  if (log) {
    console.log(result.reduce<Record<string, string>>((map, word, i) => {
      map[`Phase ${i + 1}`] = word
      return map
    }, {}), context)
  }
  
  return lastOf(result)
}

export const getFromMap = <T extends object>(map: T, key: string) => {
  return map[key as keyof T]
}
