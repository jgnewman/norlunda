import type { Context } from './types'
import syllableize from './syllableize'
import { runPhases, firstOf, dedoubleConsonantsInCluster, getFromMap } from './utils'
import { finalOrthography } from './vowels'
import { allConsonants } from './consonants'

const reapplyUnstressedShorening = (word: string) => {
  const syllbles = syllableize(word)
  return firstOf(syllbles) + syllbles.slice(1).map(syllable => {
    return finalOrthography.longVowels.reduce((modSyllable, longVowel) => {
      return modSyllable.replace(longVowel, getFromMap(finalOrthography.longToShort, longVowel))
    }, syllable)
  }).join('')
}

const reapplyPreClusterShortening = (word: string) => {
  return finalOrthography.longVowels.reduce((modWord, longVowel) => {
    const longVowelPlusClusterRegex = new RegExp(`${longVowel}[${allConsonants.join('')}]{2}`, 'g')
    
    return modWord.replace(longVowelPlusClusterRegex, (matchedText) => {
      const vowel = matchedText.slice(0, 2)
      const cluster = matchedText.slice(2)
      return getFromMap(finalOrthography.longToShort, vowel) + cluster
    })
  }, word)
}

const dedoubleConsonants = (word: string) => {
  return dedoubleConsonantsInCluster(word)
}

export default (word: string, context: Context) => {
  return runPhases(word, context, [
    reapplyUnstressedShorening,
    reapplyPreClusterShortening,
    dedoubleConsonants
  ])
}