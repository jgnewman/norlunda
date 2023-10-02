const { pgmcFricatives } = require('./consonants')
const syllableize = require('./syllableize')
const {
  lastOf,
  allButLastOf,
  endsWithUncomfortableConsonantCluster,
  isConsonant,
  isVowel,
  fixUncomfortableEndCluster,
  separateInitialConsonants,
  firstOf,
  containsVowels,
  separateFinalConsonants,
  separateFinalVowels,
} = require('./utils')
const {
  baseVowels,
  longVowels,
  nasalVowels,
  longNasalVowels,
  overlongVowels,
  overlongNasalVowels,
  shortVowelVariantOf,
  longVowelVariantOf,
} = require('./vowels')

const shortRegex = new RegExp(`(${baseVowels.join('|')})`, 'g')
const overlongRegex = new RegExp(`(${overlongVowels.join('|')})`, 'g')
const overlongNasalRegex = new RegExp(`(${overlongNasalVowels.join('|')})`, 'g')
const nasalRegex = new RegExp(`(${nasalVowels.join('|')})`, 'g')
const longNasalRegex = new RegExp(`(${longNasalVowels.join('|')})`, 'g')

const relaxOverlongs = (word) => {
  const syllables = syllableize(word)

  return syllables.map((syllable, index) => {
    const nextSyllable = syllables[index + 1] ?? ''
    let newSyllable = syllable

    if (overlongRegex.test(nextSyllable) || overlongNasalRegex.test(nextSyllable)) {
      newSyllable = syllable
        .replace(shortRegex, (_, p1) => longVowelVariantOf(p1))
        .replace(nasalRegex, (_, p1) => longVowelVariantOf(p1))
    }
    
    return newSyllable
      .replace(overlongRegex, (_, p1) => longVowelVariantOf(p1))
      .replace(overlongNasalRegex, (_, p1) => longVowelVariantOf(p1))

  }).join('')
}

const monophthongize = (word) => {
  const newWord = word
    .replace(/ai/g, 'ā')
    .replace(/(au|ou)/g, 'ō')
    .replace(/eu/g, 'ī')
    .replace(/iu/g, 'ȳ')
  
  const matchIw = newWord.match(/iw/)

  return matchIw && isConsonant(newWord.charAt(matchIw.index + 2)) ? newWord.replace(/iw/, 'ȳ') : newWord
}

const mergeInfinitives = (word) => {
  return word.replace(/(ijaną|janą|aną|ōną)$/, 'an').replace(/ną$/, 'n')
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
  if (/ij(ō|ǭ)$/.test(word)) return word.replace(/ij(ō|ǭ)$/, !containsVowels(word.slice(0, -3)) ? 'ī' : '')
  if (/w(ō|ǭ)$/.test(word)) return word.replace(/w(ō|ǭ)$/, isConsonant(word.slice(-3)[0]) ? 'a' : '')
  if (/j(ō|ǭ)$/.test(word)) return word.replace(/j(ō|ǭ)$/, isConsonant(word.slice(-3)[0]) ? 'a' : '')
  if (/(ō|ǭ)$/.test(word)) return word.replace(/(ō|ǭ)$/, '')

  if (/wij(o|ǫ)$/.test(word)) return word.replace(/wij(o|ǫ)$/, isVowel(word.slice(-5)[0]) ? 'wa' : 'a')
  if (/ij(o|ǫ)$/.test(word)) return word.replace(/ij(o|ǫ)$/, '')
  if (/w(o|ǫ)$/.test(word)) return word.replace(/w(o|ǫ)$/, '')
  if (/j(o|ǫ)$/.test(word)) return lengthenFinalSylShortVowel(word.replace(/j(o|ǫ)$/, ''))
  if (/(ǫ|o)$/.test(word)) return word.replace(/(ǫ|o)$/, 'a')

  if (/wij(ā|ą̄)$/.test(word)) return word.replace(/wij(ā|ą̄)$/, isConsonant(word.slice(-5)[0]) ? 'a' : '')
  if (/ij(ā|ą̄)$/.test(word)) return word.replace(/ij(ā|ą̄)$/, !containsVowels(word.slice(0, -3)) ? 'ī' : '')
  if (/w(ā|ą̄)$/.test(word)) return word.replace(/w(ā|ą̄)$/, '')
  if (/j(ā|ą̄)$/.test(word)) return word.replace(/j(ā|ą̄)$/, '')
  if (/(ā|ą̄)$/.test(word)) return word.replace(/(ā|ą̄)$/, '')

  if (/wij(a|ą)$/.test(word)) return word.replace(/wij(a|ą)$/, isConsonant(word.slice(-5)[0]) ? 'a' : '')
  if (/ij(a|ą)$/.test(word)) return word.replace(/ij(a|ą)$/, '')
  if (/w(a|ą)$/.test(word)) return word.replace(/w(a|ą)$/, '')
  if (/j(a|ą)$/.test(word)) return lengthenFinalSylShortVowel(word.replace(/j(a|ą)$/, ''))
  if (/(ą|a)$/.test(word)) return word.replace(/(ą|a)$/, '')

  if (/(į|į̄)$/.test(word)) return word.replace(/(į|į̄)$/, 'a')
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

const handleUncomfortableEndCluster = (word) => {
  if (!endsWithUncomfortableConsonantCluster(word)) return word
  return fixUncomfortableEndCluster(word)
}

const shortenPreClusterLongVowels = (word) => {
  let newWord = ''
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    
    if (longVowels.includes(char) || longNasalVowels.includes(char)) {
      const [followingConsonants, _] = separateInitialConsonants(word.slice(i + 1))
      const consLength = followingConsonants.length
      
      if (consLength >= 2) {
        newWord += shortVowelVariantOf(char)

        let newConsonants = followingConsonants
        const firstConsIsFricative = pgmcFricatives.includes(followingConsonants[0])

        if (firstConsIsFricative) {
          newConsonants = firstOf(newConsonants) + newConsonants.slice(2)

          if (newConsonants.length === 1) {
            newConsonants = newConsonants + newConsonants
          }
        }

        newWord += newConsonants
        i += consLength
        continue
      }
    }

    newWord += char
  }

  return newWord
}

module.exports = (word) => {
  const phase1 = monophthongize(word)
  const phase2 = relaxOverlongs(phase1)
  const phase3 = mergeInfinitives(phase2)
  const phase4 = reduceVowelBasedSuffixes(phase3)
  const phase5 = denasalize(phase4)
  const phase6 = handleUncomfortableEndCluster(phase5)
  const phase7 = shortenPreClusterLongVowels(phase6)
  return phase7
}