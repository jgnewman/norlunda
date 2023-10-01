/**
 * Every once in a while we come across a common word across Germanic languages that has
 * evolved in a way that seems to disobey the rules of sound change. A great example is the
 * PGmc kwemaną (come). By the modern period, this word has lost its /w/ in nearly every modern
 * germanic lanugage. However, there are no other words that match this pattern that have lost
 * their /w/. It can't be explained by a commonly-applied rule, so what we do is add it to a
 * map that translates it into a form that will yield the expected result.
 */

const outlierMap = {
  "kwemaną": "kumaną"
}

module.exports = (word) => {
  return outlierMap[word] || word
}