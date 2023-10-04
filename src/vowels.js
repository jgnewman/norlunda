// Note that ø is considered short while œ is considered long. This is
// because placing any diacritic over either of these characters results in
// a string with a length of 2, and in this case we need to make sure
// these can be treated as single characters.
const baseVowels = ['a', 'æ', 'e', 'i', 'o', 'ø', 'u', 'y']
const nasalVowels = ['ą', 'ę', 'į', 'ǫ', 'ų']
const allShortVowels = [...baseVowels, ...nasalVowels]

const longVowels = ['ā', 'ǣ', 'ē', 'ī', 'ō', 'œ', 'ū', 'ȳ']
const longNasalVowels = ['ǭ']
const allLongVowels = [...longVowels, ...longNasalVowels]

const overlongVowels = ['â', 'ê', 'î', 'ô', 'û', 'ŷ']

const singularVowels = [
  ...allShortVowels,
  ...allLongVowels,
]

const allNasalVowels = [...nasalVowels, ...longNasalVowels]

const shortBackVowels = ['a', 'o', 'u']
const iMutators = ['i', 'ī', 'j']
const iMutationMap = {
  'a': 'æ',
  'o': 'ø',
  'u': 'y',
}

const variantMap = {
  'a': ['a', 'ą', 'ā', 'â'],
  'æ': ['æ', 'ǣ'],
  'e': ['e', 'ę', 'ē', 'ê'],
  'i': ['i', 'į', 'ī', 'î'],
  'o': ['o', 'ǫ', 'ō', 'ǭ', 'ô'],
  'ø': ['ø', 'œ'],
  'u': ['u', 'ų', 'ū', 'û'],
  'y': ['y', 'ȳ', 'ŷ'],
}

const aMutators = [...variantMap.a, ...variantMap['æ'], ...variantMap.o]

const shortVowelVariantOf = (vowel) => {
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

const longVowelVariantOf = (vowel) => {
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

module.exports = {
  baseVowels,
  nasalVowels,
  allShortVowels,
  
  longVowels,
  longNasalVowels,
  allLongVowels,

  overlongVowels,
  
  singularVowels,
  allNasalVowels,

  shortBackVowels,
  iMutators,
  iMutationMap,
  variantMap,
  aMutators,

  shortVowelVariantOf,
  longVowelVariantOf,
}