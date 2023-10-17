window.addEventListener('load', () => {
  const headerHeight = 78
  const headers = Array.from(document.querySelectorAll('h1, h2'))
  const navSection = document.querySelector('#subnav-section')
  const scrollableElem = document.querySelector('#scrollable-content')
  const backToTopLink = document.querySelector('#scroll-to-top')

  const scrollToElem = elem => {
    const rect = elem.getBoundingClientRect()
    const top = rect.top + scrollableElem.scrollTop - headerHeight * 1.5
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
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  const handleScroll = () => {
    let linkToNearestHeaderOffTop;
    let linkToNearestTopPos;

    links.forEach(link => {
      const header = document.querySelector(link.getAttribute('href'))
      const rect = header.getBoundingClientRect()
      if (rect.top < 0 && (!linkToNearestHeaderOffTop || linkToNearestTopPos < rect.top)) {
        linkToNearestHeaderOffTop = link
        linkToNearestTopPos = rect.top
      }
    })

    const headerIsInViewport = links.reduce((hasActivatedLink, link) => {
      const header = document.querySelector(link.getAttribute('href'))
      if (!hasActivatedLink && isInViewport(header)) {
        link.classList.add('active')
        return true
      } else {
        link.classList.remove('active')
        return hasActivatedLink
      }
    }, false)

    if (!headerIsInViewport) {
      linkToNearestHeaderOffTop?.classList.add('active')
    }
  }

  scrollableElem.addEventListener('scroll', handleScroll)
  handleScroll()

  backToTopLink.addEventListener('click', (e) => {
    e.preventDefault()
    scrollableElem.scrollTo({ top: 0, behavior: 'smooth' })
  })

  // Generally capture scroll position on a refresh and apply it when the
  // page loads
  const restoreScrollPosition = () => {
    const storedScrollPosition = JSON.parse(localStorage.getItem('scroll') ?? '{}')
    if (!storedScrollPosition.time) return;

    if (storedScrollPosition.url === location.href && Date.now() - storedScrollPosition.time < 5000) {
      scrollableElem.scrollTo({ top: storedScrollPosition.scroll, behavior: 'instant' })
    }
  }

  window.addEventListener('unload', () => {
    localStorage.setItem('scroll', JSON.stringify({
      scroll: scrollableElem.scrollTop,
      url: location.href,
      time: Date.now()
    }))
  })
  restoreScrollPosition()

  // Because we are scrolling an element rather than the body, sometimes
  // when the browser hash changes or we load with a hash path, the browser
  // accidentally scrolls the window content partially out of view, making it
  // unfixable within the UI. This little hack ensures that we always have
  // the window content positioned correctly.
  const resetWindowScroll = () => document.body.scrollTop = document.documentElement.scrollTop = 0;
  requestAnimationFrame(resetWindowScroll)
  window.addEventListener('hashchange', resetWindowScroll)

})