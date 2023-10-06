const pgmcConsonants = ['b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'þ', 'w', 'z']

// Deliberately does not contain c, q, or y because c and q are never used and
// y is treated only as a vowel
const allConsonants = [...pgmcConsonants, 'v', 'x']

const pgmcApproximants = ['j', 'l', 'r', 'w']
const pgmcNonApproximants = pgmcConsonants.filter(c => !pgmcApproximants.includes(c))

const pgmcStops = ['b', 'd', 'g', 'k', 'p', 't']
const pgmcNonStops = pgmcConsonants.filter(c => !pgmcStops.includes(c))

const pgmcNasals = ['m', 'n']
const pgmcNonNasals = pgmcConsonants.filter(c => !pgmcNasals.includes(c))

const fricatives = ['f', 'h', 's', 'þ', 'v', 'z']
const nonFricatives = pgmcConsonants.filter(c => !fricatives.includes(c))

const bilabials = ['m', 'p', 'b']
const nonBilabials = pgmcConsonants.filter(c => !bilabials.includes(c))

const pgmcVelars = ['g', 'k', 'h'] // h is velar when non-word-initial, pronounced /x/
const pgmcNonVelars = pgmcConsonants.filter(c => !pgmcVelars.includes(c))

module.exports = {
  pgmcConsonants,
  allConsonants,

  pgmcApproximants,
  pgmcNonApproximants,
  
  pgmcStops,
  pgmcNonStops,

  pgmcNasals,
  pgmcNonNasals,
  
  fricatives,
  nonFricatives,

  bilabials,
  nonBilabials,

  pgmcVelars,
  pgmcNonVelars,
}