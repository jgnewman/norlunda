export const pgmcConsonants = ['b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'þ', 'w', 'z']

// Deliberately does not contain c, q, or y because c and q are never used and
// y is treated only as a vowel
export const allConsonants = [...pgmcConsonants, 'v', 'x']

export const pgmcApproximants = ['j', 'l', 'r', 'w']
export const pgmcNonApproximants = pgmcConsonants.filter(c => !pgmcApproximants.includes(c))

export const pgmcStops = ['b', 'd', 'g', 'k', 'p', 't']
export const pgmcNonStops = pgmcConsonants.filter(c => !pgmcStops.includes(c))

export const pgmcNasals = ['m', 'n']
export const pgmcNonNasals = pgmcConsonants.filter(c => !pgmcNasals.includes(c))

export const fricatives = ['f', 'h', 's', 'þ', 'v', 'z']
export const nonFricatives = pgmcConsonants.filter(c => !fricatives.includes(c))

export const bilabials = ['m', 'p', 'b']
export const nonBilabials = pgmcConsonants.filter(c => !bilabials.includes(c))

export const pgmcVelars = ['g', 'k', 'h'] // h is velar when non-word-initial, pronounced /x/
export const pgmcNonVelars = pgmcConsonants.filter(c => !pgmcVelars.includes(c))