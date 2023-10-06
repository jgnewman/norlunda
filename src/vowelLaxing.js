const { fricatives, pgmcVelars } = require('./consonants')
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
  runPhases,
} = require('./utils')
const {
  baseVowels,
  longVowels,
  nasalVowels,
  longNasalVowels,
  overlongVowels,
  shortVowelVariantOf,
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
    .replace(/(au|ou)h?/g, 'ō')
    .replace(/[æe]nh/, 'ē')
    .replace(/euh?/g, 'ī')
    .replace(/iuh?/g, 'ȳ')
  
  const matchIw = newWord.match(/iw/)

  return matchIw && isConsonant(newWord.charAt(matchIw.index + 2)) ? newWord.replace(/iw/, 'ȳ') : newWord
}

const mergeInfinitives = (word) => {
  const newWord = word.replace(/(ijaną|janą|hwaną|waną|āną|aną|ōną|oną|ną)$/, 'an')
  if (newWord === word) return newWord

  // Now we know this was a verb whose suffix changed. 
  const stem = newWord.slice(0, -2)
  if (!isVowel(lastOf(stem))) return newWord

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
  if (/ij(ō|ǭ)$/.test(word)) return word.replace(/ij(ō|ǭ)$/, !containsVowels(word.slice(0, -3)) ? 'ī' : '')
  if (/w(ō|ǭ)$/.test(word)) return word.replace(/w(ō|ǭ)$/, isConsonant(word.slice(-3)[0]) ? 'a' : '')
  if (/j(ō|ǭ)$/.test(word)) return word.replace(/j(ō|ǭ)$/, isConsonant(word.slice(-3)[0]) ? 'a' : '')
  if (/(ō|ǭ)$/.test(word)) return word.replace(/(ō|ǭ)$/, pgmcVelars.includes(word.slice(-2)[0]) ? 'a' : '')
  
  if (/wij(o|ǫ)$/.test(word)) return word.replace(/wij(o|ǫ)$/, isVowel(word.slice(-5)[0]) ? 'wa' : 'a')
  if (/ij(o|ǫ)$/.test(word)) return word.replace(/ij(o|ǫ)$/, '')
  if (/w(o|ǫ)$/.test(word)) return word.replace(/w(o|ǫ)$/, '')
  if (/j(o|ǫ)$/.test(word)) return lengthenFinalSylShortVowel(word.replace(/j(o|ǫ)$/, ''))
  if (/(ǫ|o)$/.test(word)) return word.replace(/(ǫ|o)$/, 'a')
  
  if (/wijā$/.test(word)) return word.replace(/wijā$/, isConsonant(word.slice(-5)[0]) ? 'a' : '')
  if (/ijā$/.test(word)) return word.replace(/ijā$/, !containsVowels(word.slice(0, -3)) ? 'ī' : '')
  if (/wā$/.test(word)) return word.replace(/wā$/, !containsVowels(word.slice(0, -2)) ? 'ā' : '')
  if (/jā$/.test(word)) return word.replace(/jā$/, '')
  if (/ā$/.test(word)) return word.replace(/ā$/, '')
  
  if (/wij(a|ą)$/.test(word)) return word.replace(/wij(a|ą)$/, isConsonant(word.slice(-5)[0]) ? 'a' : '')
  if (/ij(a|ą)$/.test(word)) return word.replace(/ij(a|ą)$/, '')
  if (/w(a|ą)$/.test(word)) return word.replace(/w(a|ą)$/, !containsVowels(word.slice(0, -2)) ? 'ā' : '')
  if (/j(a|ą)$/.test(word)) return lengthenFinalSylShortVowel(word.replace(/j(a|ą)$/, ''))
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
  return word.replace(/(lz|zl)/g, 'll');
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
        const firstConsIsFricative = fricatives.includes(followingConsonants[0])

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
  return runPhases(word, [
    monophthongize,
    relaxOverlongs,
    mergeInfinitives,
    reduceVowelBasedSuffixes,
    denasalize,
    handleLZ,
    handleUncomfortableEndCluster,
    shortenPreClusterLongVowels,
  ])
}