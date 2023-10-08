const { lastOf } = require('./utils')
const iMutation = require('./iMutation')
const aMutation = require('./aMutation')
const gemination = require('./gemination.js')
const vowelLaxing = require('./vowelLaxing')
const zLoss = require('./zLoss')
const wgHardening = require('./wgHardening')
const syllableReduction = require('./syllableReduction')
const modernization = require('./modernization')
const massageOutliers = require('./massageOutliers')
const sanitizePhonology = require('./sanitizePhonology')
const falseVerbs = require('./falseVerbs')

const init = (baseWord) => {
  const normalizedWord = baseWord.toLowerCase().replace(/^\*/, '')
  const context = {}
  const steps = []

  if (falseVerbs.includes(normalizedWord)) {
    context.isFalseVerb = true
  }

  steps.push({
    step: 'Massage Known Outliers',
    result: massageOutliers(normalizedWord, context),
  })

  steps.push({
    step: 'Sanitize Phonology',
    result: sanitizePhonology(lastOf(steps).result, context),
  })

  steps.push({
    step: 'I-Mutation',
    result: iMutation(lastOf(steps).result, context),
  })

  steps.push({
    step: 'A-Mutation',
    result: aMutation(lastOf(steps).result, context),
  })

  steps.push({
    step: 'Gemination',
    result: gemination(lastOf(steps).result, context),
  })

  steps.push({
    step: 'Vowel Laxing',
    result: vowelLaxing(lastOf(steps).result, context),
  })

  steps.push({
    step: 'Z-Loss',
    result: zLoss(lastOf(steps).result, context),
  })

  steps.push({
    step: 'West-Germanic Hardening',
    result: wgHardening(lastOf(steps).result, context),
  })

  steps.push({
    step: 'Syllable Reduction',
    result: syllableReduction(lastOf(steps).result, context),
  })

  steps.push({
    step: 'Modernization',
    result: modernization(lastOf(steps).result, context),
  })

  return steps
}

typeof window !== 'undefined' && (window.norlunda = init)

module.exports = init