import type { Context } from './types'
import { pgmcVelars } from './consonants'
import syllableize from './syllableize'
import {
  lastOf,
  allButLastOf,
  endsWithUncomfortableConsonantCluster,
  isConsonant,
  isVowel,
  fixUncomfortableEndCluster,
  containsVowels,
  separateFinalConsonants,
  separateFinalVowels,
  runPhases,
} from './utils'
import {
  baseVowels,
  longVowels,
  nasalVowels,
  longNasalVowels,
  overlongVowels,
  longVowelVariantOf,
} from './vowels'

const shortRegex = new RegExp(`(${baseVowels.join('|')})`, 'g')
const overlongRegex = new RegExp(`(${overlongVowels.join('|')})`, 'g')
const nasalRegex = new RegExp(`(${nasalVowels.join('|')})`, 'g')
const longNasalRegex = new RegExp(`(${longNasalVowels.join('|')})`, 'g')

const relaxOverlongs = (word: string) => {
  const syllables = syllableize(word)

  return syllables.map((syllable, index) => {
    const nextSyllable = syllables[index + 1] ?? ''
    let newSyllable = syllable

    if (overlongRegex.test(nextSyllable)) {
      newSyllable = syllable
        .replace(shortRegex, (_, p1) => longVowelVariantOf(p1))
        .replace(nasalRegex, (_, p1) => longVowelVariantOf(p1))
    }
    
    return newSyllable
      .replace(overlongRegex, (_, p1) => longVowelVariantOf(p1))

  }).join('')
}

const monophthongize = (word: string) => {
  const newWord = word
    .replace(/aih?/g, 'ā')
    .replace(/anh/g, 'ā')
    .replace(/auh?/g, 'ɔ')
    .replace(/ouh?/g, 'ō')
    .replace(/[æe]nh/, 'ē')
    .replace(/(ehu|euh|eu|ewu|ew)/g, 'ī')
    .replace(/ēa/g, 'ā')
    .replace(/ēǭ/g, 'ā')
    .replace(/iuh?/g, 'ȳ')
    .replace(/jj/g, 'j')
    .replace(/ōu/g, 'ō')
  
  const matchIw = newWord.match(/iw/)

  if (!matchIw || matchIw.index === undefined) {
    return newWord
  }

  return isConsonant(newWord.charAt(matchIw.index + 2)) ? newWord.replace(/iw/, 'ȳ') : newWord
}

const reduceInfSuffixes = (word: string) => {
  const patterns = [/wijaną$/, /ijaną$/, /janą$/, /hwaną$/, /waną$/, /āną$/, /aną$/, /ōną$/, /oną$/, /ną$/]
  for (const pattern of patterns) {
    const truncated = word.replace(pattern, '')
    if (!containsVowels(truncated)) continue
    if (word !== truncated) return truncated + 'an'
  }
  return word
}

const mergeInfinitives = (word: string, context: Context) => {
  if (context.isFalseVerb) return word

  const newWord = reduceInfSuffixes(word)
  if (newWord === word) return newWord
  
  // Now we know this was a verb whose suffix changed.
  // It could be a consonant or vowel plus -an or -han (as in *slahan)
  const stem = newWord.replace(/h?an$/, '')
  const lastOfStem = lastOf(stem)

  // When the stem ends with a vowel, make sure we end with han and lengthen a short vowel.
  if (isVowel(lastOfStem)) {
    const [_, finalVowels] = separateFinalVowels(stem)

    return baseVowels.includes(finalVowels)
      ? allButLastOf(stem) + longVowelVariantOf(lastOfStem) + 'han'
      : stem + 'han'
  
  // When the stem ends with a consonant, just tack -an onto the end.
  } else {
    return stem + 'an'
  }
}

const finalSylHasShortVowel = (word: string) => {
  const prevSyllable = lastOf(syllableize(word))
  const [syllPrefix] = separateFinalConsonants(prevSyllable)
  const [_, vowelCluster] = separateFinalVowels(syllPrefix)
  return baseVowels.includes(vowelCluster)
}

const lengthenFinalSylShortVowel = (word: string) => {
  if (!finalSylHasShortVowel(word)) return word
  const syllables = syllableize(word)
  const lastSyllable = lastOf(syllables)
  const restSyllables = allButLastOf(syllables)
  return restSyllables.join('') + lastSyllable.replace(shortRegex, (_, p1) => longVowelVariantOf(p1))
}

const reduceVowelBasedSuffixes = (word: string) => {
  if (/wij(ō|ǭ)$/.test(word)) return word.replace(/wij(ō|ǭ)$/, isVowel(word.slice(-5)[0]) ? 'wa' : 'a')
  if (/hij(ō|ǭ)$/.test(word)) return word.replace(/hij(ō|ǭ)$/, 'a') // Example: *marhijō -> mara (mare)
  if (/ij(ō|ǭ)$/.test(word)) return word.replace(/ij(ō|ǭ)$/, !containsVowels(word.slice(0, -3)) ? 'ī' : '')
  if (/w(ō|ǭ)$/.test(word)) return word.replace(/w(ō|ǭ)$/, isVowel(word.slice(-3)[0]) ? 'wa' : '')
  if (/j(ō|ǭ)$/.test(word)) return word.replace(/j(ō|ǭ)$/, '')
  // The velars rule is designed to produce saga from sagǭ, but could have unintended consequences.
  if (/(ō|ǭ)$/.test(word)) return word.replace(/(ō|ǭ)$/, pgmcVelars.includes(word.slice(-2)[0]) ? 'a' : '')
  
  if (/wij(o|ǫ)$/.test(word)) return word.replace(/wij(o|ǫ)$/, isVowel(word.slice(-5)[0]) ? 'wa' : 'a')
  if (/ij(o|ǫ)$/.test(word)) return word.replace(/ij(o|ǫ)$/, '')
  if (/w(o|ǫ)$/.test(word)) return word.replace(/w(o|ǫ)$/, '')
  if (/j(o|ǫ)$/.test(word)) return word.replace(/j(o|ǫ)$/, '')
  if (/(ǫ|o)$/.test(word)) return word.replace(/(ǫ|o)$/, '')
  
  if (/wijā$/.test(word)) return word.replace(/wijā$/, isVowel(word.slice(-5)[0]) ? 'wa' : 'a')
  if (/ijā$/.test(word)) return word.replace(/ijā$/, !containsVowels(word.slice(0, -3)) ? 'ī' : '')
  if (/wā$/.test(word)) return word.replace(/wā$/, !containsVowels(word.slice(0, -2)) ? 'vā' : '') // Example *twai -> *twā (two)
  if (/jā$/.test(word)) return word.replace(/jā$/, '')
  if (/ā$/.test(word)) return word.replace(/ā$/, !containsVowels(word.slice(0, -1)) ? 'ā' : '')
  
  if (/wij(a|ą)$/.test(word)) return word.replace(/wij(a|ą)$/, isVowel(word.slice(-5)[0]) ? 'wa' : 'a')
  if (/ij(a|ą)$/.test(word)) return word.replace(/ij(a|ą)$/, '')
  if (/w(a|ą)$/.test(word)) return word.replace(/w(a|ą)$/, !containsVowels(word.slice(0, -2)) ? 'ā' : '')
  if (/j(a|ą)$/.test(word)) return word.replace(/j(a|ą)$/, !containsVowels(word.slice(0, -2)) ? 'ja' : '')
  if (/(ą|a)$/.test(word)) return word.replace(/(ą|a)$/, '')

  if (/į$/.test(word)) return word.replace(/į$/, 'a')
  if (/i$/.test(word)) return word.replace(/i$/, '')
  if (/u$/.test(word)) return word.replace(/u$/, 'a')
  if (/hw$/.test(word)) return isConsonant(word.slice(-3)[0]) ? word.replace(/hw$/, '') : lengthenFinalSylShortVowel(word.replace(/hw$/, ''))
  if (/w$/.test(word)) return isVowel(word.slice(-2)[0]) ? lengthenFinalSylShortVowel(word.replace(/w$/, '')) : word

  return word
}

const denasalize = (word: string) => {
  return word
    .replace(nasalRegex, (_, p1) => baseVowels[nasalVowels.indexOf(p1)])
    .replace(longNasalRegex, (_, p1) => longVowels[longNasalVowels.indexOf(p1)])
}

const handleLZ = (word: string) => {
  return word.replace(/(lz|zl)/g, 'll')
}

const fixTerminalMfNf = (word: string) => {
  return word.replace(/.(mf|nf)$/, () => {
    const precedingChar = lastOf(word.slice(0, -2))
    return baseVowels.includes(precedingChar) ? longVowelVariantOf(precedingChar) + 'f' : precedingChar + 'f'
  })
}

const handleUncomfortableEndCluster = (word: string) => {
  if (!endsWithUncomfortableConsonantCluster(word)) return word
  return fixUncomfortableEndCluster(word)
}

export default (word: string, context: Context) => {
  return runPhases(word, context, [
    monophthongize,
    relaxOverlongs,
    mergeInfinitives,
    reduceVowelBasedSuffixes,
    denasalize,
    handleLZ,
    fixTerminalMfNf,
    handleUncomfortableEndCluster,
  ])
}