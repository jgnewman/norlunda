const init = require('../algorithm/index')
const { lastOf } = require('../algorithm/utils')

const input = process.argv.slice(2)[0]
console.log(`Input: ${input}`)

const result = init(input)
console.log(result)

console.log(`Output: ${lastOf(result).result}`)
