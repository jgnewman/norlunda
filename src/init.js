const { lastOf, applySpellingConventions } = require('./utils')
const iMutation = require('./iMutation')
const aMutation = require('./aMutation')
const gemination = require('./gemination.js')
const vowelLaxing = require('./vowelLaxing')
const zLoss = require('./zLoss')
const wgHardening = require('./wgHardening')
const syllableReduction = require('./syllableReduction')
const modernization = require('./modernization')
const massageOutliers = require('./massageOutliers')

const init = (baseWord) => {
  const normalizedWord = baseWord.toLowerCase().replace(/^\*/, '')
  const steps = []

  steps.push({
    step: 'Massage Known Outliers',
    result: massageOutliers(normalizedWord),
  })

  steps.push({
    step: 'I-Mutation',
    result: iMutation(lastOf(steps).result),
  })

  steps.push({
    step: 'A-Mutation',
    result: aMutation(lastOf(steps).result),
  })

  steps.push({
    step: 'Gemination',
    result: gemination(lastOf(steps).result),
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
    step: 'Modernization',
    result: modernization(lastOf(steps).result),
  })

  // steps.push({
  //   step: 'Output',
  //   result: applySpellingConventions(lastOf(steps).result),
  // })

  return steps
}

module.exports = init