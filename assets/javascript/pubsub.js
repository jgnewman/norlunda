(function () {
  const listeners = {}

  const subscribe = (event, callback) => {
    if (!listeners[event]) {
      listeners[event] = []
    }
    listeners[event].push(callback)
  }

  const publish = (event, data) => {
    if (!listeners[event]) {
      return
    }
    listeners[event].forEach(callback => callback(data))
  }

  const unsubscribe = (event, callback) => {
    if (!listeners[event]) {
      return
    }
    listeners[event] = listeners[event].filter(listener => listener !== callback)
  }

  window.norlundaTools = window.norlundaTools || {}
  window.norlundaTools.publish = publish
  window.norlundaTools.subscribe = subscribe
  window.norlundaTools.unsubscribe = unsubscribe
}())