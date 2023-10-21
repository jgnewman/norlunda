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
      wordArr.forEach(({ word, type, def, synonyms = [] }, index) => {
        const wordEl = document.createElement('a')
        wordEl.classList.add('search-result', 'block', 'px-16', 'py-4')
        wordEl.setAttribute('href', `${baseUrl}/dictionary?term=${word}`)
        index % 2 === 0 && wordEl.classList.add('result-stripe')
        wordEl.innerHTML = `
          <strong>${word}</strong> <em class="semi-transparent px-4">${formatWordType(type)}</em>
          ${[def, ...synonyms].join(', ')}

        `
        resultsInner.appendChild(wordEl)
      })
    }

    searchResults.appendChild(resultsInner)
  }

  const handleSearch = async (event) => {
    const query = event.target.value
    searchForm.classList.remove('ready')
    const result = (await queryDictionary(query)).result.slice(0, 10)
    searchForm.classList.add('ready')
    buildResult(query, result)
  }
  
  subscribe('dictionary:ready', async () => {
    searchForm.classList.add('ready')
    searchField.setAttribute('placeholder', 'Search')
    searchField.removeAttribute('disabled')
    searchField.addEventListener('input', debounce(handleSearch, 300))
  })

  onClickOutsideOf(searchForm, () => {
    searchForm.classList.remove('active')
    searchField.value = ''
    searchResults.innerHTML = ''
  })

})