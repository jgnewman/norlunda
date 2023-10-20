(function () {
  let dictionary = null;

  const fetchDictionary = async (baseUrl) => {
    const response = await fetch(`${baseUrl}/assets/javascript/dictionary.json`)
    const json = await response.json()
    dictionary = json
    postMessage({ type: 'DICTIONARY_READY' })
  }

  const handleIncomingQuery = ({ queryId, query }) => {
    const queryRegex = new RegExp(`${query}`, 'i')

    const result = dictionary.reduce((accum, entry) => {
      const synonyms = entry.synonyms || []

      // Strong match if we match exactly a word, its definition, or any of its synonyms
      if (entry.word === query || entry.definition === query || synonyms.includes(query)) {
        accum.strong.push(entry)

      // Weak match if we regex test against any of those things
      } else if (queryRegex.test(entry.word) || queryRegex.test(entry.definition) || synonyms.some(synonym => queryRegex.test(synonym))) {
        accum.weak.push(entry)
      }

      return accum
    }, { strong: [], weak: [] })

    postMessage({ type: 'QUERY', payload: { queryId, result: [...result.strong, ...result.weak] }})
  }

  onmessage = async ({ data }) => {
    switch (data.type) {
      case 'BASE_URL': return fetchDictionary(data.payload)
      case 'QUERY': return handleIncomingQuery(data.payload)
      default: postMessage({
        type: 'UNKNOWN',
        payload: {
          unknownType: data.type,
          unknownPayload: data.payload
        },
      })
    }
  }
}())