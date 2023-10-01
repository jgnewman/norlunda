const { lastOf, applySpellingConventions } = require('./utils')
const iMutation = require('./iMutation')
const aMutation = require('./aMutation')
const vowelLaxing = require('./vowelLaxing')
const zLoss = require('./zLoss')
const wgHardening = require('./wgHardening')
const syllableReduction = require('./syllableReduction')
const vowelSmoothing = require('./vowelSmoothing')
const modernization = require('./modernization')
const massageOutliers = require('./massageOutliers')

const init = (baseWord) => {
  const steps = [{
    step: 'Input',
    result: baseWord.toLowerCase().replace(/^\*/, ''),
  }];

  steps.push({
    step: 'Massage Known Outliers',
    result: massageOutliers(lastOf(steps).result),
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

  // steps.push({
  //   step: 'Output',
  //   result: applySpellingConventions(lastOf(steps).result),
  // })

  return steps
}

module.exports = init