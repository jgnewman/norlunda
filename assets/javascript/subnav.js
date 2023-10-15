window.addEventListener('load', () => {
  const headerHeight = 78
  const headers = Array.from(document.querySelectorAll('h1, h2'))
  const navSection = document.querySelector('#subnav-section')
  const scrollableElem = document.querySelector('#scrollable-content')
  const backToTopLink = document.querySelector('#scroll-to-top')

  const scrollToElem = elem => {
    const rect = elem.getBoundingClientRect()
    const scrollableElemRect = scrollableElem.getBoundingClientRect()
    const top = rect.top - scrollableElemRect.top - headerHeight/2
    scrollableElem.scrollTo({ top, behavior: 'smooth' })
  }

  const ul = document.createElement('ul')
  navSection.appendChild(ul)

  const links = headers.map(header => {
    const li = document.createElement('li')
    li.classList.add('py-8')

    const a = document.createElement('a')
    a.setAttribute('href', `#${header.id}`)
    a.classList.add('meta-nav-link')
    a.textContent = header.textContent
    a.addEventListener('click', (e) => {
      e.preventDefault()
      !a.classList.contains('active') && scrollToElem(header)
    })

    li.appendChild(a)
    ul.appendChild(li)
    return a
  })

  const isInViewport = elem => {
    const rect = elem.getBoundingClientRect()
    return (
      rect.top >= headerHeight &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  const handleScroll = () => {
    links.reduce((hasActivatedLink, link) => {
      const header = document.querySelector(link.getAttribute('href'))
      if (!hasActivatedLink && isInViewport(header)) {
        link.classList.add('active')
        return true
      } else {
        link.classList.remove('active')
        return false
      }
    }, false)
  }

  scrollableElem.addEventListener('scroll', handleScroll)
  handleScroll()

  backToTopLink.addEventListener('click', (e) => {
    e.preventDefault()
    scrollableElem.scrollTo({ top: 0, behavior: 'smooth' })
  })
})