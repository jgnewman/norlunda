/* API

window.norlundaTools.subscribe('dictionary:ready', async () => {
  console.log('the dictionary is ready')

  const result1 = await window.norlundaTools.queryDictionary('hello')
  console.log('got result1', result1)
  
  const result2 = await window.norlundaTools.queryDictionary('goodbye')
  console.log('got result2', result2)
})

*/

window.addEventListener('load', () => {
  const baseUrl = document.querySelector('meta[name="baseurl"]').getAttribute('content')
  const worker = new Worker(`${baseUrl}/assets/javascript/dictionary-worker.js`)
  const { publish, quickId } = window.norlundaTools

  const queryQueue = []
  const queryIdToResolverMap = new Map()
  let dictionaryReady = false
  let queryInProgress = false

  window.norlundaTools.queryDictionary = (query) => {
    return new Promise((resolve, reject) => {
      if (!dictionaryReady) return reject('Dictionary not ready')

      const queryId = quickId()
      const queryAction = { type: 'QUERY', payload: { queryId, query } }

      queryIdToResolverMap.set(queryId, resolve)

      if (!queryInProgress) {
        queryInProgress = true
        worker.postMessage(queryAction)
      } else {
        queryQueue.push(queryAction)
      }
    })
  }

  window.norlundaTools.listDictionary = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
      if (!dictionaryReady) return reject('Dictionary not ready')
    })
  }

  const handleQueryResponse = ({ queryId, result }) => {
    const resolver = queryIdToResolverMap.get(queryId)
    const nextQuery = queryQueue.shift()
    
    if (resolver) {
      queryIdToResolverMap.delete(queryId)
      resolver(result)
    }

    if (nextQuery) {
      worker.postMessage(nextQuery)
    } else {
      queryInProgress = false
    }
  }

  worker.onmessage = ({ data }) => {
    switch (data.type) {

      case 'DICTIONARY_READY':
        dictionaryReady = true
        return publish('dictionary:ready', data.payload)

      case 'QUERY':
        return handleQueryResponse(data.payload)

      case 'UNKNOWN':
        const { unknownType, unknownPayload } = data.payload
        console.error(`Sent dictionary worker unknown type "${unknownType}" with payload`, unknownPayload)
        return

      default:
        console.error(`Received unknown type "${data.type}" from dictionary worker with payload`, data.payload)
        return

    }
  }

  worker.postMessage({ type: 'BASE_URL', payload: baseUrl })

  window.norlundaTools.subscribe('dictionary:ready', async () => {
    const result1 = await window.norlundaTools.queryDictionary('e');
    console.log(result1)
  });
})
