const { pgmcFricatives, pgmcStops } = require("./consonants")
const {
  firstOf,
  lastOf,
  isVowel,
  isConsonant,
} = require("./utils")

const bToV = (word) => {
  return word.split('').reduce((result, char, index, charList) => {
    const prevChar = lastOf(result)
    const nextChar = charList[index + 1]

    if (char === 'b' && nextChar !== 'b' && isVowel(prevChar)) {
      return result + 'v'
    }

    return result + char
  }, '')
}

const bToF = (word) => {
  return word.split('').reduce((result, char) => {
    const prevChar = lastOf(result)

    if (char === 'b' && isConsonant(prevChar) && prevChar !== 'b') {
      return result + 'f'
    }

    return result + char
  }, '')
}

const dToT = (word) => {
  return word.split('').reduce((result, char, index, charList) => {
    const nextChar = charList[index + 1]

    if (char === 'd' && pgmcFricatives.includes(nextChar)) {
      return result + 't'
    }

    return result + char
  }, '')
}

const fPlusFricativeToF = (word) => {
  return word.split('').reduce((result, char) => {
    const prevChar = lastOf(result)

    if (pgmcFricatives.includes(char) && prevChar === 'f' && char !== 'f') {
      return result
    }

    return result + char
  }, '')
}

const gsAndKsToX = (word) => {
  return word.replace(/(g|k)s/g, 'x')
}

const dropInitialH = (word) => {
  if (firstOf(word) === 'h' && isConsonant(word[1])) return word.slice(1)
  return word
}

const hToK = (word) => {
  return word.split('').reduce((result, char, index, charList) => {
    const nextChar = charList[index + 1]

    if (char === 'h' && isConsonant(nextChar) && !/[lr]/.test(nextChar)) {
      return result + 'k'
    }

    return result + char
  }, '')
}

const thornToD = (word) => {
  return word.replace(/þ/g, 'd')
}

const skToSh = (word) => {
  return word.split('').reduce((result, char, index, charList) => {
    const prevChar = lastOf(result)
    const nextChar = charList[index + 1]

    if (prevChar === 's' && char === 'k' && (isVowel(nextChar) || pgmcStops.includes(nextChar))) {
      return result + 'h'
    }

    return result + char
  }, '').replace(/tsk/g, 'tsh')
}

const dropInitialW = (word) => {
  if (firstOf(word) === 'w' && isConsonant(word[1])) return word.slice(1)
  return word
}

const wToV = (word) => {
  return word.replace(/w/g, 'v')
}

module.exports = (word) => {
  const phase1 = bToV(word)
  const phase2 = bToF(phase1)
  const phase3 = dToT(phase2)
  const phase4 = fPlusFricativeToF(phase3)
  const phase5 = gsAndKsToX(phase4)
  const phase6 = dropInitialH(phase5)
  const phase7 = hToK(phase6)
  const phase8 = thornToD(phase7)
  const phase9 = skToSh(phase8)
  const phase10 = dropInitialW(phase9)
  const phase11 = wToV(phase10)
  return phase11
}