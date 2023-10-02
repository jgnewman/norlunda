const init = require('./src/init')
const { lastOf } = require('./src/utils')

const input = process.argv.slice(2)[0]
console.log(`Input: ${input}`)

const result = init(input)
console.log(result)

console.log(`Output: ${lastOf(result).result}`)
