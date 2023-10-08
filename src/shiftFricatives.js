const { fricatives, pgmcStops } = require("./consonants")
const {
  firstOf,
  lastOf,
  isVowel,
  isConsonant,
  runPhases,
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

    if (char === 'd' && fricatives.includes(nextChar)) {
      return result + 't'
    }

    return result + char
  }, '')
}

const fPlusFricativeToF = (word) => {
  return word.split('').reduce((result, char) => {
    const prevChar = lastOf(result)

    if (fricatives.includes(char) && prevChar === 'f' && char !== 'f') {
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

module.exports = (word, context) => {
  return runPhases(word, context, [
    bToV,
    bToF,
    dToT,
    fPlusFricativeToF,
    gsAndKsToX,
    dropInitialH,
    hToK,
    thornToD,
    skToSh,
    dropInitialW,
    wToV,
  ])
}