// Note that ø is considered short while œ is considered long. This is
// because placing any diacritic over either of these characters results in
// a string with a length of 2, and in this case we need to make sure
// these can be treated as single characters. Additionally, ɔ is considered
// a long vowel whose short variant is o.
export const baseVowels = ['a', 'æ', 'e', 'i', 'o', 'ø', 'u', 'y']
export const nasalVowels = ['ą', 'ę', 'į', 'ǫ', 'ų']
export const allShortVowels = [...baseVowels, ...nasalVowels]

export const longVowels = ['ā', 'ǣ', 'ē', 'ī', 'ō', 'œ', 'ū', 'ȳ', 'ɔ']
export const longNasalVowels = ['ǭ']
export const allLongVowels = [...longVowels, ...longNasalVowels]

export const overlongVowels = ['â', 'ê', 'î', 'ô', 'û', 'ŷ']

export const singularVowels = [
  ...allShortVowels,
  ...allLongVowels,
  ...overlongVowels,
]

export const allNasalVowels = [...nasalVowels, ...longNasalVowels]

export const shortBackVowels = ['a', 'o', 'u']
export const iMutators = ['i', 'ī', 'j']
export const iMutationMap = {
  'a': 'æ',
  'o': 'ø',
  'u': 'y',
}

// Not exported
export const variantMap = {
  'a': ['a', 'ą', 'ā', 'â'],
  'æ': ['æ', 'ǣ'],
  'e': ['e', 'ę', 'ē', 'ê'],
  'i': ['i', 'į', 'ī', 'î'],
  'o': ['o', 'ǫ', 'ō', 'ǭ', 'ô'],
  'ø': ['ø', 'œ'],
  'u': ['u', 'ų', 'ū', 'û'],
  'y': ['y', 'ȳ', 'ŷ'],
}

export const aMutators = [...variantMap.a, ...variantMap['æ'], ...variantMap.o]
export const longOMutators = ['ō', 'ô', 'ǭ']

export const shortVowelVariantOf = (vowel: string) => {
  if (vowel === 'ɔ') return 'o'
  if (variantMap.a.includes(vowel)) return 'a'
  if (variantMap['æ'].includes(vowel)) return 'æ'
  if (variantMap.e.includes(vowel)) return 'e'
  if (variantMap.i.includes(vowel)) return 'i'
  if (variantMap.o.includes(vowel)) return 'o'
  if (variantMap['ø'].includes(vowel)) return 'ø'
  if (variantMap.u.includes(vowel)) return 'u'
  if (variantMap.y.includes(vowel)) return 'y'
  return 'a'
}

export const longVowelVariantOf = (vowel: string) => {
  if (variantMap.a.includes(vowel)) return 'ā'
  if (variantMap['æ'].includes(vowel)) return 'ǣ'
  if (variantMap.e.includes(vowel)) return 'ē'
  if (variantMap.i.includes(vowel)) return 'ī'
  if (variantMap.o.includes(vowel)) return 'ō'
  if (variantMap['ø'].includes(vowel)) return 'œ'
  if (variantMap.u.includes(vowel)) return 'ū'
  if (variantMap.y.includes(vowel)) return 'y'
  return 'ā'
}

export const finalOrthography = {
  shortVowels: ['a', 'e', 'i', 'o', 'u'],
  longVowels: ['aa', 'ee', 'ie', 'oe'],
  diphthongs: ['au', 'ei'],
  longToShort: {
    'aa': 'o',
    'ee': 'e',
    'ie': 'i',
    'oe': 'e',
  },
}

export const finalSpellingOf = (vowel: string) => {
  switch (vowel) {
    case 'a': return 'a'
    case 'æ': return 'e'
    case 'e': return 'e'
    case 'i': return 'i'
    case 'o': return 'o'
    case 'ø': return 'i'
    case 'u': return 'u'
    case 'y': return 'u'
    case 'ā': return 'ei'
    case 'ǣ': return 'oe'
    case 'ē': return 'ee'
    case 'ī': return 'ie'
    case 'ō': return 'u'
    case 'œ': return 'oe'
    case 'ɔ': return 'aa'
    case 'ū': return 'au'
    case 'ȳ': return 'au'
  }
  return vowel
}

export const ipaifyFinalOrthography = (word: string) => {
  const result = word
    .replace(/aa/g, 'ɔː')
    .replace(/au/g, 'aʊ')
    .replace(/ee/g, 'eː')
    .replace(/ei/g, 'aɪ')
    .replace(/ie/g, 'iː')
    .replace(/i([^ː])/g, 'ɪ$1')
    .replace(/(oe|œ)/g, 'øː')
    .replace(/[bcdfghjklmnpqrstvwxz]{2}/ig, (match) => {
      if (match[0] === match[1]) return match[0] + 'ː'
      return match
    })
  return `/'${result}/` 
}
