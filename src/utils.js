const { allConsonants, pgmcApproximants, pgmcNonApproximants, pgmcStops, pgmcNasals } = require('./consonants')
const { singularVowels } = require('./vowels')

const lastOf = (arr) => arr[arr.length - 1]
const firstOf = (arr) => typeof arr === 'string' ? (arr[0] ?? '') : arr[0]
const allButLastOf = (arr) => arr.slice(0, -1)

const reverse = (list) => {
  if (typeof list === 'string') {
    return list.split('').reverse().join('')
  } else {
    return list.reverse()
  }
}

const beginsWithVowel = (word) => {
  return singularVowels.includes(firstOf(word))
}

const beginsWithConsonant = (word) => {
  return allConsonants.includes(firstOf(word))
}

const endsWithVowel = (word) => {
  return singularVowels.includes(lastOf(word))
}

const endsWithConsonant = (word) => {
  return allConsonants.includes(lastOf(word))
}

const isVowel = (letter) => {
  return singularVowels.includes(letter)
}

const isConsonant = (letter) => {
  return allConsonants.includes(letter)
}

const containsVowels = (word) => {
  return word.split('').some(isVowel)
}

const containsConsonants = (word) => {
  return word.split('').some(isConsonant)
}

const separateInitialVowels = (word) => {
  if (isConsonant(firstOf(word))) return ['', word]
  
  let vowels = ''
  let rest = word

  while (rest.length && isVowel(firstOf(rest))) {
    vowels += firstOf(rest)
    rest = rest.slice(1)
  }

  return [vowels, rest]
}

const separateFinalVowels = (word) => {
  if (isConsonant(lastOf(word))) return [word, '']

  let vowels = ''
  let rest = word

  while (rest.length && isVowel(lastOf(rest))) {
    vowels = lastOf(rest) + vowels
    rest = rest.slice(0, -1)
  }

  return [rest, vowels]
}

const separateInitialConsonants = (word) => {
  if (isVowel(firstOf(word))) return ['', word]

  let consonants = ''
  let rest = word

  while (rest.length && isConsonant(firstOf(rest))) {
    consonants += firstOf(rest)
    rest = rest.slice(1)
  }

  return [consonants, rest]
}

const separateFinalConsonants = (word) => {
  if (isVowel(lastOf(word))) return [word, '']

  let consonants = ''
  let rest = word

  while (rest.length && isConsonant(lastOf(rest))) {
    consonants = lastOf(rest) + consonants
    rest = rest.slice(0, -1)
  }

  return [rest, consonants]
}

const getVowelGroups = (word) => {
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

const removeVowels = (word) => {
  return word.split('').filter(isConsonant).join('')
}

const removeConsonants = (word) => {
  return word.split('').filter(isVowel).join('')
}

const isNonApproximantApproximantCluster = (a, b) => {
  return pgmcNonApproximants.includes(a) && pgmcApproximants.includes(b)
}

const isDoubleStopCluster = (a, b) => {
  return pgmcStops.includes(a) && pgmcStops.includes(b)
}

const isStopNasalCluster = (a, b) => {
  return pgmcStops.includes(a) && pgmcNasals.includes(b)
}

const isDoubleNasalCluster = (a, b) => {
  return pgmcNasals.includes(a) && pgmcNasals.includes(b)
}

const isHCluster = (a, b) => {
  return isConsonant(a) && isConsonant(b) && (a === 'h' || b === 'h')
}

const isUncomfortableConsonantCluster = (a, b) => {
  return isNonApproximantApproximantCluster(a, b) ||
    isDoubleStopCluster(a, b) ||
    isStopNasalCluster(a, b) ||
    isDoubleNasalCluster(a, b) ||
    isHCluster(a, b)
}

const containsUncomfortableConsonantCluster = (word) => {
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
    
    if (isTrackingCluster && isUncomfortableConsonantCluster(letter, nextLetter)) {
      containsCluster = true
      break
    }
  }

  return containsCluster
}

const endsWithUncomfortableConsonantCluster = (word) => {
  const [_, cluster] = separateFinalConsonants(word)
  return containsUncomfortableConsonantCluster(cluster)
}

const fixUncomfortableEndCluster = (word) => {
  return allButLastOf(word) + 'a' + lastOf(word)
}

const applySpellingConventions = (word) => {
  return word
    .replace(/ā/g, 'aa')
    .replace(/ē/g, 'ee')
    .replace(/ī/g, 'ii')
    .replace(/ō/g, 'oo')
    .replace(/ū/g, 'uu')
    .replace(/ȳ/g, 'yy')
    .replace(/æ/g, 'ae')
    .replace(/ai/g, 'ei')
}

module.exports = {
  lastOf,
  firstOf,
  allButLastOf,
  reverse,
  beginsWithVowel,
  beginsWithConsonant,
  endsWithVowel,
  endsWithConsonant,
  isVowel,
  isConsonant,
  containsVowels,
  containsConsonants,
  separateInitialVowels,
  separateFinalVowels,
  separateInitialConsonants,
  separateFinalConsonants,
  getVowelGroups,
  removeVowels,
  removeConsonants,
  isUncomfortableConsonantCluster,
  containsUncomfortableConsonantCluster,
  endsWithUncomfortableConsonantCluster,
  fixUncomfortableEndCluster,
  applySpellingConventions,
}