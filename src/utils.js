const {
  allConsonants,
  pgmcApproximants,
  pgmcNonApproximants,
  pgmcStops,
  pgmcNasals,
} = require('./consonants')
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
  return `${a}${b}` !== 'kt' && pgmcStops.includes(a) && pgmcStops.includes(b) && a !== b
}

const isNasalEndingCluster = (a, b) => {
  return isConsonant(a) && pgmcNasals.includes(b)
}

const isHCluster = (a, b) => {
  return `${a}${b}` !== 'ht' && isConsonant(a) && isConsonant(b) && (a === 'h' || b === 'h')
}

/**
 * Comfortable clusters
 * ds, dt,
 * þs, þt,
 * ft,
 * gd, gþ, gs,
 * ht, 
 * ks, kt,
 * lb, ld, lþ, lf, lg, lk, ln, lp, ls, lt, lv, lz
 * mp, 
 * nd, nþ, ng, nk, ns, nt, 
 * ps,
 * rb, rd, rþ, rf, rg, rk, rm, rn, rp, rs, rt, rv, rz
 * sk, sp, st
 * ts, 
 */
// Not exported
const isUncomfortableEndCluster = (a, b) => {
  return a && b && a !== b && !/^(d[st]|þ[st]|ft|g[dþs]|ht|k[st]|l[bdþfgknpstvz]|mp|n[dþgkst]|ps|r[bdþfgkmnpstvz]|s[kpt]|ts)$/.test(a + b)
}

// Not exported
const containsUncomfortableEndCluster = (word) => {
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

const endsWithUncomfortableConsonantCluster = (word) => {
  const [_, cluster] = separateFinalConsonants(word)
  return containsUncomfortableEndCluster(cluster)
}

const fixUncomfortableEndCluster = (word) => {
  return allButLastOf(word) + 'a' + lastOf(word)
}

const runPhases = (word, phaseFnArray, log = false) => {
  const result = phaseFnArray.reduce((resultList, phaseFn) => {
    return [...resultList, phaseFn(resultList.length ? lastOf(resultList) : word)]
  }, [])

  if (log) {
    console.log(result.reduce((map, word, i) => {
      map[`Phase ${i + 1}`] = word
      return map
    }, {}))
  }
  
  return lastOf(result)
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
  endsWithUncomfortableConsonantCluster,
  fixUncomfortableEndCluster,
  runPhases,
}