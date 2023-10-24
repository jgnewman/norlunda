/* API

window.norlundaTools.subscribe('dictionary:ready', async (totalWords) => {
    console.log('the dictionary is ready')
  
    const result1 = await window.norlundaTools.queryDictionary('e')
    console.log('got result1', result1)
    
    const result2 = await window.norlundaTools.queryDictionary('er')
    console.log('got result2', result2)

    const result3 = await window.norlundaTools.listDictionary({ limit: 3, offset: 3 })
    console.log('got result3', result3)
  })

*/

window.addEventListener('load', () => {
  const { publish, quickId, getBaseUrl } = window.norlundaTools
  const baseUrl = getBaseUrl()
  const worker = new Worker(`${baseUrl}/assets/javascript/dictionary-worker.js`)

  const queryQueue = []
  const requestIdToResolverMap = new Map()
  let dictionaryReady = false
  let queryInProgress = false

  window.norlundaTools.formatWordType = (type, modal) => {
    const modalPrefix = modal ? 'mod. ' : ''
    if (type.length <= 4) return `${modalPrefix}${type[0] + '.'}`

    const sliced = type.slice(0, 4)
    return `${modalPrefix}${/[aeiouy]$/.test(sliced) ? type.slice(0, 3) + '.' : sliced + '.'}`
  }

  window.norlundaTools.queryDictionary = (query) => {
    return new Promise((resolve, reject) => {
      if (!dictionaryReady) return reject('Dictionary not ready')

      const id = quickId()
      const queryAction = { type: 'QUERY', payload: { id, query } }

      requestIdToResolverMap.set(id, resolve)

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

      const id = quickId()
      const listAction = { type: 'LIST', payload: { id, limit, offset } }

      requestIdToResolverMap.set(id, resolve)
      worker.postMessage(listAction)
    })
  }

  window.norlundaTools.readDictionary = (term) => {
    return new Promise((resolve, reject) => {
      if (!dictionaryReady) return reject('Dictionary not ready')

      const id = quickId()
      const readAction = { type: 'READ', payload: { id, term } }

      requestIdToResolverMap.set(id, resolve)
      worker.postMessage(readAction)
    })
  }

  const handleResponse = (resultPayload) => {
    const { id } = resultPayload
    const resolver = requestIdToResolverMap.get(id)
    if (resolver) {
      requestIdToResolverMap.delete(id)
      resolver(resultPayload)
    }
  }

  const handleQueryResponse = (resultPayload) => {
    handleResponse(resultPayload)

    const nextQuery = queryQueue.shift()
  
    if (nextQuery) {
      worker.postMessage(nextQuery)
    } else {
      queryInProgress = false
    }
  }

  const handleListResponse = (resultPayload) => {
    handleResponse(resultPayload)
  }

  const handleReadResponse = (resultPayload) => {
    handleResponse(resultPayload)
  }

  worker.onmessage = ({ data }) => {
    switch (data.type) {

      case 'DICTIONARY_READY':
        dictionaryReady = true
        return publish('dictionary:ready', data.payload) // Payload === total entries in dictionary

      case 'QUERY':
        return handleQueryResponse(data.payload)
      
      case 'LIST':
        return handleListResponse(data.payload)
      
      case 'READ':
        return handleReadResponse(data.payload)

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
})
