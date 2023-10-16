window.addEventListener('load', () => {
  const triggers = Array.from(document.querySelectorAll('[data-modal-trigger]'))
  
  const modals = Array.from(document.querySelectorAll('[data-modal-name]')).reduce((acc, modal) => {
    const modalName = modal.dataset.modalName
    if (acc[modalName]) throw new Error(`Duplicate modal name: ${modalName}`)
    acc[modalName] = modal

    Array.from(modal.querySelectorAll('.close-modal')).forEach(close => {
      close.addEventListener('click', () => {
        modal.classList.remove('active')
        modal.setAttribute('aria-hidden', 'true')
        window.norlundaTools.publish('modal:close', { modalName })
      })
    })

    return acc
  }, {})
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalName = trigger.dataset.modalTrigger
      const modal = modals[modalName]
      if (!modal) return;
      modal.classList.add('active')
      modal.removeAttribute('aria-hidden')
      window.norlundaTools.publish('modal:open', { modalName })
    })
  })

})