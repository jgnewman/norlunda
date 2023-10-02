// In the following lists there are a few numbers. These are used to
// represent characters that do not actually exist and will not match
// against any character in the input string.

// Note that ø is considered short while œ is considered long. This is
// because placing any diacritic over either of these characters results in
// a string with a length of 2, and in this case we need to make sure
// these can be treated as single characters.

const baseVowels = ['a', 'æ', 'e', 'i', 'o', 'ø', 'u', 'y']
const nasalVowels = ['ą', '0', 'ę', 'į', 'ǫ', '1', 'ų', '2']
const allShortVowels = [...baseVowels, ...nasalVowels]

const longVowels = ['ā', 'ǣ', 'ē', 'ī', 'ō', 'œ', 'ū', 'ȳ']
const longNasalVowels = ['ą̄', 'ǣ̨', 'ę̄', 'į̄', 'ǭ', '3', 'ų̄', '4']
const allLongVowels = [...longVowels, ...longNasalVowels]

const overlongVowels = ['â', '5', 'ê', 'î', 'ô', '6', 'û', 'ŷ']
const overlongNasalVowels = ['7', '8', 'ę̂', '9', 'ǫ̂', '@', '&', ';']
const allOverlongVowels = [...overlongVowels, ...overlongNasalVowels]

const singularVowels = [
  ...allShortVowels,
  ...allLongVowels,
  ...allOverlongVowels,
]

const allNasalVowels = [...nasalVowels, ...longNasalVowels, ...overlongNasalVowels]

const shortBackVowels = ['a', 'o', 'u']
const iMutators = ['i', 'ī', 'j']
const iMutationMap = {
  'a': 'æ',
  'o': 'ø',
  'u': 'y',
}

const variantMap = {
  'a': ['a', 'ą', 'ā', 'ą̄', 'â', '7'],
  'æ': ['æ', '0', 'ǣ', 'ǣ̨', '5', '8'],
  'e': ['e', 'ę', 'ē', 'ę̄', 'ê', 'ę̂'],
  'i': ['i', 'į', 'ī', 'į̄', 'î', '9'],
  'o': ['o', 'ǫ', 'ō', 'ǭ', 'ô', 'ǫ̂'],
  'ø': ['ø', '1', 'œ', '3', '6', '@'],
  'u': ['u', 'ų', 'ū', 'ų̄', 'û', '&'],
  'y': ['y', '2', 'ȳ', '4', 'ŷ', ';'],
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
  return ''
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
  return ''
}

module.exports = {
  baseVowels,
  nasalVowels,
  allShortVowels,
  
  longVowels,
  longNasalVowels,
  allLongVowels,

  overlongVowels,
  overlongNasalVowels,
  allOverlongVowels,
  
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