(function () {
  let dictionary = null;

  const fetchDictionary = async (baseUrl) => {
    const response = await fetch(`${baseUrl}/assets/javascript/dictionary.json`)
    const json = await response.json()
    dictionary = json
    postMessage({ type: 'DICTIONARY_READY', payload: json.length })
  }

  const handleIncomingQueryRequest = ({ id, query }) => {
    if (!query) {
      postMessage({ type: 'QUERY', payload: { id, result: [] }})
      return
    }

    const queryRegex = new RegExp(`${query}`, 'i')

    const result = dictionary.reduce((accum, entry) => {
      const synonyms = entry.synonyms || []

      // Strong match if we match exactly a word, its definition, or any of its synonyms
      if (entry.word === query || entry.def === query || synonyms.includes(query)) {
        accum.strong.push(entry)

      // Weak match if we regex test against any of those things
      } else if (queryRegex.test(entry.word) || queryRegex.test(entry.def) || synonyms.some(synonym => queryRegex.test(synonym))) {
        accum.weak.push(entry)
      }

      return accum
    }, { strong: [], weak: [] })

    postMessage({ type: 'QUERY', payload: { id, result: [...result.strong, ...result.weak] }})
  }

  const handleIncomingListRequest = ({ id, limit, offset }) => {
    const result = dictionary.slice(offset, offset + limit)
    const hasMoreItems = dictionary.length > offset + limit
    postMessage({ type: 'LIST', payload: { id, result, hasMoreItems }})
  }

  const handleIncomingReadRequest = ({ id, term }) => {
    const result = dictionary.find(entry => entry.word === term)
    postMessage({ type: 'READ', payload: { id, result }})
  }

  onmessage = async ({ data }) => {
    switch (data.type) {
      case 'BASE_URL': return fetchDictionary(data.payload)
      case 'QUERY': return handleIncomingQueryRequest(data.payload)
      case 'LIST': return handleIncomingListRequest(data.payload)
      case 'READ': return handleIncomingReadRequest(data.payload)
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