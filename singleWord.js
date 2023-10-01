const init = require('./src/init')

const result = init(process.argv.slice(2)[0])

console.log(result)
