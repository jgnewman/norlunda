window.addEventListener('load', () => {
  const {
    debounce,
    subscribe,
    queryDictionary,
    onClickOutsideOf,
    getBaseUrl,
    formatWordType,
  } = window.norlundaTools

  const baseUrl = getBaseUrl()
  const searchForm = document.querySelector('#search-form')
  const searchField = document.querySelector('#search-field')
  const searchResults = document.querySelector('#search-results')
  let resultLinks = []

  searchForm.addEventListener('submit', (event) => event.preventDefault())

  searchField.addEventListener('focus', () => {
    searchForm.classList.add('active')
  })

  const buildResult = (query, wordArr) => {
    searchResults.innerHTML = ''
    
    if (!query) return

    const resultsInner = document.createElement('div')
    resultsInner.classList.add('search-results-inner', 'pt-36')

    if (!wordArr.length) {
      const wordEl = document.createElement('div')
      wordEl.classList.add('search-result', 'px-16', 'py-4')
      wordEl.classList.add('result-stripe')
      wordEl.innerHTML = 'No results'
      resultsInner.appendChild(wordEl)
    } else {
      resultLinks = []
      wordArr.forEach(({ word, type, modal, def, synonyms = [] }, index) => {
        const wordEl = document.createElement('a')
        wordEl.classList.add('search-result', 'block', 'px-16', 'py-4')
        wordEl.setAttribute('href', `${baseUrl}/dictionary?term=${word}`)
        index % 2 === 0 && wordEl.classList.add('result-stripe')
        wordEl.innerHTML = `
          <span class="search-result-text">
            <strong>${word}</strong> <em class="semi-transparent px-4">${formatWordType(type, modal)}</em>
            ${[def, ...synonyms].join(', ')}
          </span>
        `
        resultsInner.appendChild(wordEl)
        resultLinks.push(wordEl)
      })
    }

    searchResults.appendChild(resultsInner)
  }

  const formIsActive = () => {
    return searchForm.classList.contains('active')
  }

  const searchFieldIsFocused = () => {
    return document.activeElement === searchField
  }

  const getFocusedLink = () => {
    const result = {
      focusedLink: null,
      prevLink: null,
      nextLink: null,
    }
    resultLinks.some((link, index) => {
      const isFocused = document.activeElement === link
      if (isFocused) {
        result.focusedLink = link
        result.prevLink = resultLinks[index - 1] || null
        result.nextLink = resultLinks[index + 1] || null
      }
      return isFocused
    })
    return result
  }

  const emptyResults = () => {
    resultLinks = []
    searchForm.classList.remove('active')
    searchField.value = ''
    searchResults.innerHTML = ''
    searchFieldIsFocused() && searchField.blur()
  }

  const handleSearch = async (event) => {
    const query = event.target.value
    searchForm.classList.remove('ready')
    const wordArr = (await queryDictionary(query)).result.slice(0, 10)
    searchForm.classList.add('ready')
    buildResult(query, wordArr)
  }
  
  subscribe('dictionary:ready', async () => {
    searchForm.classList.add('ready')
    searchField.setAttribute('placeholder', 'Search')
    searchField.removeAttribute('disabled')
    searchField.addEventListener('input', debounce(handleSearch, 300))
  })

  onClickOutsideOf(searchForm, emptyResults)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formIsActive()) {
      emptyResults();
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && formIsActive()) {
      if (searchFieldIsFocused()) return resultLinks[0] && resultLinks[0].focus()
      const { focusedLink, nextLink } = getFocusedLink()
      if (!focusedLink) return
      if (nextLink) return nextLink.focus()
      return resultLinks[0].focus()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && formIsActive()) {
      const { focusedLink, prevLink } = getFocusedLink()
      if (!focusedLink) return
      if (prevLink) return prevLink.focus()
      return searchField.focus()
    }
  })

})