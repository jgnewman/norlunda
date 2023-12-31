import type { Context } from "./types"
import syllableize from "./syllableize"
import shiftFricatives from "./shiftFricatives"
import {
  isVowel,
  firstOf,
  lastOf,
  allButLastOf,
  removeVowels,
  separateFinalConsonants,
  separateInitialConsonants,
  separateFinalVowels,
  endsWithUncomfortableConsonantCluster,
  containsVowels,
  runPhases,
  dedoubleConsonantsInCluster,
} from "./utils"
import {
  baseVowels,
  longVowels,
  longVowelVariantOf,
  shortVowelVariantOf,
  finalSpellingOf,
  baseVowelsRegex,
} from "./vowels"
import { pgmcApproximants } from "./consonants"

const longPlusWRegex = new RegExp(`(${longVowels.join('|')})w`, 'g')

const handleWBasedEndDiphthongs = (word: string) => {
  return word
    .replace(/ǣw$/, 'œ')
    .replace(/æw/, 'au')
}

const dropWAndModVowels = (word: string) => {
  let newWord = word
  const nextToLastCharIsVowel = isVowel(lastOf(allButLastOf(word)))

  if (/w$/.test(newWord) && nextToLastCharIsVowel) {
    newWord = allButLastOf(newWord)

    // Lengthen a preceding short vowel
    const [_, finalVowels] = separateFinalVowels(newWord)    
    if (finalVowels.length === 1 && baseVowels.includes(finalVowels)) {
      newWord = newWord.replace(baseVowelsRegex, (_, p1) => longVowelVariantOf(p1))
    }
  }

  return newWord.replace(longPlusWRegex, (_, p1) => shortVowelVariantOf(p1) + 'w')
}

const tryToShortenSecondSyllable = (word: string) => {
  const hasInfinitiveSuffix = word.endsWith('an')

  const syllables = syllableize(word.replace(/an$/, ''))
  if (syllables.length < 2) return word

  const secondSyllable = syllables[1]
  const thirdSyllable = syllables[2] ?? ''

  const [_, endCons] = separateFinalConsonants(secondSyllable)
  const [beginCons, __] = separateInitialConsonants(thirdSyllable)
  if (!endCons.length && !beginCons.length) return word
  
  const newWord = firstOf(syllables) + removeVowels(secondSyllable) + syllables.slice(2).join('')
  if (endsWithUncomfortableConsonantCluster(newWord)) return word

  return newWord + (hasInfinitiveSuffix ? 'an' : '')
}

const shortenUnstressedLongVowels = (word: string) => {
  const syllables = syllableize(word)

  return firstOf(syllables) + syllables.slice(1).map((syllable) => {
    return syllable
      .replace(/ā/g, 'a')
      .replace(/ē/g, 'e')
      .replace(/ī/g, 'i')
      .replace(/ō/g, 'o')
      .replace(/œ/g, 'ø')
      .replace(/ɔ/g, 'a')
      .replace(/ū/g, 'u')
      .replace(/ȳ/g, 'y')
  }).join('')
}

const undoubleConsonants = (word: string) => {
  return dedoubleConsonantsInCluster(word)
}

const shiftVowels = (word: string) => {
  return word
    .replace(/au/g, 'au') // no change, but want to have every vowel represented
    .replace(/j?a$/, (_, __, src) => {
      const stem = src.slice(0, -1)
      if (lastOf(stem) === 'j') return 'ja'
      return containsVowels(stem) ? finalSpellingOf('a') : finalSpellingOf('ɔ')
    })
    .replace(/a/g, finalSpellingOf('a'))
    .replace(/æ/g, finalSpellingOf('æ'))
    .replace(/e/g, finalSpellingOf('e'))
    .replace(/i/g, finalSpellingOf('i'))
    .replace(/o/g, finalSpellingOf('o'))
    .replace(/ø/g, finalSpellingOf('ø'))
    .replace(/y/g, finalSpellingOf('y'))
    .replace(/ā/g, (_, index, src) => {
      const isWordFinal = !src[index + 1]
      const precedesHan = src.slice(index + 1) === 'han'
      return isWordFinal || precedesHan ? finalSpellingOf('ɔ') : finalSpellingOf('ā')
    })
    .replace(/ǣ/g, finalSpellingOf('ǣ'))
    .replace(/ē/g, finalSpellingOf('ē'))
    .replace(/ī/g, finalSpellingOf('ī'))
    .replace(/ō/g, (_, index, src) => {
      const precedesApproximant = pgmcApproximants.includes(src[index + 1])
      return precedesApproximant ? finalSpellingOf('œ') : finalSpellingOf('ō')
    })
    .replace(/œ/g, finalSpellingOf('œ'))
    .replace(/ɔ/g, finalSpellingOf('ɔ'))
    .replace(/ū/g, finalSpellingOf('ū'))
    .replace(/ȳ/g, finalSpellingOf('ȳ'))
}

const reduceHan = (word: string) => {
  return word.replace(/([aeiouy])han$/, '$1n')
}

const fixTerminalAir = (word: string) => {
  return word.replace(/eir$/, 'eer')
}

const gToLongVowel = (word: string) => {
  return word.replace(/[aeioøuy]g[dtþ]/g, (match) => {
    const vowel = match[0]
    const finalCons = lastOf(match)
    return longVowelVariantOf(vowel) + finalCons
  })
}

export default (word: string, context: Context) => {
  return runPhases(word, context, [
    handleWBasedEndDiphthongs,
    dropWAndModVowels,
    tryToShortenSecondSyllable,
    gToLongVowel,
    shortenUnstressedLongVowels,
    shiftFricatives,
    undoubleConsonants,
    shiftVowels,
    reduceHan,
    fixTerminalAir,
  ])
}