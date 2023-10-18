// This file will be created when the npm command runs esbuild
const { init } = require('./test-algorithm')

const input = process.argv.slice(2)[0]
console.log(init(input))

