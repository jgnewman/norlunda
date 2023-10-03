const init = require('./src/init')
const { lastOf } = require('./src/utils')

const list = [
  ['aiwaz', 'ever'],
  ['andi', 'and'],
  ['bakiz', 'back'],
  ['barwijǭ', 'barrow'],
  ['bazją', 'berry'],
  ['badją', 'bed'],
  ['berô', 'bear'],
  ['bijǭ', 'bee'],
  ['bindaną', 'to bind'],
  ['blōstmô', 'blossom'],
  ['bōks', 'book'],
  ['dagaz', 'day'],
  ['draumaz', 'dream'],
  ['erþō', 'earth'],
  ['fedwor', 'four'],
  ['fulkhaimaz', 'Planet Earth'],
  ['fleuganą', 'to fly'],
  ['fleuhaną', 'to flee'],
  ['gāną', 'to go'],
  ['gulþą', 'gold'],
  ['gulþijaną', 'to gild'],
  ['habjaną', 'to have'],
  ['hagatusjō', 'witch'],
  ['haimaz', 'home'],
  ['haitaną', 'to call'],
  ['hauzijaną', 'to hear'],
  ['hertô', 'heart'],
  ['hrussą', 'horse'],
  ['hundaz', 'dog'],
  ['hwar', 'where'],
  ['kwemaną', 'to come'],
  ['kwēniz', 'queen'],
  ['sagǭ', 'saw/saga'],
  ['skadwaz', 'shadow'],
  ['stainaz', 'stone'],
  ['swa', 'so'],
  ['swemmaną', 'to swim'],
  ['triwwiz', 'true'],
  ['ūt', 'out'],
  ['þeudō', 'people'],
  ['þiudiskaz', 'native language'],
  ['þunraz', 'thunder'],
  ['wōdanaz', 'Odin'],
  ['wrītaną', 'to write'],
]

let longestBase = 0
let longestResult = 0

const output = list.map(([base, meaning]) => {
  const result = lastOf(init(base)).result

  if (base.length > longestBase) { longestBase = base.length }
  if (result.length > longestResult) { longestResult = result.length }

  return [base, result, meaning]
})

const formatOutput = output => {
  return [['PGmc', 'Norl.', 'Definition'], ['---', '---', '---'], ...output].map(([base, result, meaning]) => {
    return `${base.padEnd(longestBase + 1)} ${result.padEnd(longestResult + 1)} ${meaning}`
  }).join('\n')
}

console.log(formatOutput(output));
