import type { Context } from './types'
import { lastOf } from './utils'
import iMutation from './iMutation'
import aMutation from './aMutation'
import gemination from './gemination.js'
import vowelLaxing from './vowelLaxing'
import zLoss from './zLoss'
import wgHardening from './wgHardening'
import syllableReduction from './syllableReduction'
import modernization from './modernization'
import massageOutliers from './massageOutliers'
import sanitizePhonology from './sanitizePhonology'
import falseVerbs from './falseVerbs'
import retrofitCompounds from './retrofitCompounds'
import { ipaifyFinalOrthography } from './vowels'

const runAlgorithm = (baseWord: string) => {
  const normalizedWord = baseWord.toLowerCase().replace(/^\*/, '')
  const context: Context = {}
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

export const init = (baseWord: string) => {
  const pieces = baseWord.split(':').map(piece => piece.trim())

  if (pieces.length === 1) {
    const steps = runAlgorithm(pieces[0])
    const output = lastOf(steps).result
    return {
      isCompound: false,
      input: baseWord,
      steps,
      output: output,
      outputComponents: null,
      outputIPA: ipaifyFinalOrthography(output),
    }
  }

  // If this should be a compound
  const outputComponents = pieces.map(piece => lastOf(runAlgorithm(piece)).result)
  const rawCompound = outputComponents.join('')
  const result = retrofitCompounds(rawCompound, {})

  return {
    isCompound: true,
    input: pieces,
    steps: null,
    output: result,
    outputComponents,
    outputIPA: ipaifyFinalOrthography(result),
  }
}

export default init

// @ts-ignore
typeof window !== 'undefined' && (window.norlunda = init)
