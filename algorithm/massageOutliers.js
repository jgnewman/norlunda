/**
 * Every once in a while we come across a common word across Germanic languages that has
 * evolved in a way that seems to disobey the rules of sound change. A great example is the
 * PGmc kwemaną (come). By the modern period, this word has lost its /w/ in nearly every modern
 * germanic lanugage. However, there are no other words that match this pattern that have lost
 * their /w/. It can't be explained by a commonly-applied rule, so what we do is add it to a
 * map that translates it into a form that will yield the expected result.
 */

const { runPhases } = require("./utils")

const outlierMap = {
  // Change of ag to au is non-standard
  "bagmaz": "baumaz",

  // Loss of the w is non-standard
  "kwemaną": "kumaną",

  // Loss of the second r is non-standard
  "nurþrą": "nurþą",

  // Loss of n and r are non-standard
  "sunþrą": "sūþą",
  
  // Retention of <o> rather than change to <u> is the result of
  // this word being borrowed back in from earlier literature in all
  // modern W.G. languages. Note, for instance, that Middle High German
  // had Wüetung which should not have yielded modern Wotan. 
  "wōdanaz": "wudanaz",
}

const massageOutliers = (word) => {
  return outlierMap[word] || word
}

module.exports = (word, context) => {
  return runPhases(word, context, [massageOutliers])
}