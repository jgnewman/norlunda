const syllableize = require('./syllableize')
const { runPhases, firstOf, dedoubleConsonantsInCluster } = require('./utils')
const { finalOrthography } = require('./vowels')
const { allConsonants } = require('./consonants')

const reapplyUnstressedShorening = (word) => {
  const syllbles = syllableize(word)
  return firstOf(syllbles) + syllbles.slice(1).map(syllable => {
    return finalOrthography.longVowels.reduce((modSyllable, longVowel) => {
      return modSyllable.replace(longVowel, finalOrthography.longToShort[longVowel])
    }, syllable)
  }).join('')
}

const reapplyPreClusterShortening = (word) => {
  return finalOrthography.longVowels.reduce((modWord, longVowel) => {
    const longVowelPlusClusterRegex = new RegExp(`${longVowel}[${allConsonants.join('')}]{2}`, 'g')
    
    return modWord.replace(longVowelPlusClusterRegex, (matchedText) => {
      const vowel = matchedText.slice(0, 2)
      const cluster = matchedText.slice(2)
      return finalOrthography.longToShort[vowel] + cluster
    })
  }, word)
}

const dedoubleConsonants = (word) => {
  return dedoubleConsonantsInCluster(word)
}


module.exports = (word, context) => {
  return runPhases(word, context, [
    reapplyUnstressedShorening,
    reapplyPreClusterShortening,
    dedoubleConsonants
  ])
}