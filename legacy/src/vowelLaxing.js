const { pgmcVelars } = require('./consonants')
const syllableize = require('./syllableize')
const {
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
} = require('./utils')
const {
  baseVowels,
  longVowels,
  nasalVowels,
  longNasalVowels,
  overlongVowels,
  longVowelVariantOf,
} = require('./vowels')

const shortRegex = new RegExp(`(${baseVowels.join('|')})`, 'g')
const overlongRegex = new RegExp(`(${overlongVowels.join('|')})`, 'g')
const nasalRegex = new RegExp(`(${nasalVowels.join('|')})`, 'g')
const longNasalRegex = new RegExp(`(${longNasalVowels.join('|')})`, 'g')

const relaxOverlongs = (word) => {
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

const monophthongize = (word) => {
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

  return matchIw && isConsonant(newWord.charAt(matchIw.index + 2)) ? newWord.replace(/iw/, 'ȳ') : newWord
}

const reduceInfSuffixes = (word) => {
  const patterns = [/wijaną$/, /ijaną$/, /janą$/, /hwaną$/, /waną$/, /āną$/, /aną$/, /ōną$/, /oną$/, /ną$/]
  for (const pattern of patterns) {
    const truncated = word.replace(pattern, '')
    if (!containsVowels(truncated)) continue
    if (word !== truncated) return truncated + 'an'
  }
  return word
}

const mergeInfinitives = (word, context) => {
  if (context.isFalseVerb) return word

  const newWord = reduceInfSuffixes(word)
  if (newWord === word) return newWord

  
  // Now we know this was a verb whose suffix changed. If the suffix

  // follows a consonant, we're done.
  const stem = newWord.slice(0, -2)
  if (!isVowel(lastOf(stem))) return newWord

  // If the suffix follows a vowel, we need to add 'h' and shorten a preceding ā.
  if (lastOf(stem) === 'ā') return allButLastOf(stem) + 'a' + 'han'
  return stem + 'han'
}

const finalSylHasShortVowel = (word) => {
  const prevSyllable = lastOf(syllableize(word))
  const [syllPrefix] = separateFinalConsonants(prevSyllable)
  const [_, vowelCluster] = separateFinalVowels(syllPrefix)
  return baseVowels.includes(vowelCluster)
}

const lengthenFinalSylShortVowel = (word) => {
  if (!finalSylHasShortVowel(word)) return word
  const syllables = syllableize(word)
  const lastSyllable = lastOf(syllables)
  const restSyllables = allButLastOf(syllables)
  return restSyllables.join('') + lastSyllable.replace(shortRegex, (_, p1) => longVowelVariantOf(p1))
}

const reduceVowelBasedSuffixes = (word) => {
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
  if (/u/.test(word)) return word.replace(/u$/, 'a')
  if (/w$/.test(word)) return isVowel(word.slice(-2)[0]) ? lengthenFinalSylShortVowel(word.replace(/w$/, '')) : word

  return word
}

const denasalize = (word) => {
  return word
    .replace(nasalRegex, (_, p1) => baseVowels[nasalVowels.indexOf(p1)])
    .replace(longNasalRegex, (_, p1) => longVowels[longNasalVowels.indexOf(p1)])
}

const handleLZ = (word) => {
  return word.replace(/(lz|zl)/g, 'll')
}

const fixTerminalMfNf = (word) => {
  return word.replace(/.(mf|nf)$/, () => {
    const precedingChar = lastOf(word.slice(0, -2))
    return baseVowels.includes(precedingChar) ? longVowelVariantOf(precedingChar) + 'f' : precedingChar + 'f'
  })
}

const handleUncomfortableEndCluster = (word) => {
  if (!endsWithUncomfortableConsonantCluster(word)) return word
  return fixUncomfortableEndCluster(word)
}

module.exports = (word, context) => {
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