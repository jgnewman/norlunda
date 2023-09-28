const { lastOf, applySpellingConventions } = require('./src/utils')
const iMutation = require('./src/iMutation')
const aMutation = require('./src/aMutation')
const vowelLaxing = require('./src/vowelLaxing')
const zLoss = require('./src/zLoss')
const wgHardening = require('./src/wgHardening')
const syllableReduction = require('./src/syllableReduction')
const vowelSmoothing = require('./src/vowelSmoothing')
const modernization = require('./src/modernization')

const init = (baseWord) => {
  const steps = [{
    step: 'Input',
    result: baseWord.toLowerCase().replace(/^\*/, ''),
  }];

  steps.push({
    step: 'I-Mutation',
    result: iMutation(lastOf(steps).result),
  })

  steps.push({
    step: 'A-Mutation',
    result: aMutation(lastOf(steps).result),
  })

  steps.push({
    step: 'Vowel Laxing',
    result: vowelLaxing(lastOf(steps).result),
  })

  steps.push({
    step: 'Z-Loss',
    result: zLoss(lastOf(steps).result),
  })

  steps.push({
    step: 'West-Germanic Hardening',
    result: wgHardening(lastOf(steps).result),
  })

  steps.push({
    step: 'Syllable Reduction',
    result: syllableReduction(lastOf(steps).result),
  })

  steps.push({
    step: 'Vowel Smoothing',
    result: vowelSmoothing(lastOf(steps).result),
  })

  steps.push({
    step: 'Modernization',
    result: modernization(lastOf(steps).result),
  })

  steps.push({
    step: 'Output',
    result: applySpellingConventions(lastOf(steps).result),
  })

  console.log(steps)

  return steps
}

init(process.argv.slice(2)[0])
