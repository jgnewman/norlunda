window.addEventListener('load', () => {
  const {
    subscribe,
    listDictionary,
    readDictionary,
    getBaseUrl,
    formatWordType,
  } = window.norlundaTools

  const LIST_LIMIT = 50
  
  const baseUrl = getBaseUrl()
  const output = document.querySelector('#dictionary-content')
  const nav = document.querySelector('#dictionary-nav')
  const navPrev = document.querySelector('#dictionary-prev-link')
  const navNext = document.querySelector('#dictionary-next-link')

  const term = (location.search.match(/term=([^&]*)/) || [])[1]
  const isListPage = !term

  const buildListPage = async (offset) => {
    const { hasMoreItems, result: list } = await listDictionary({ limit: LIST_LIMIT, offset })
    output.classList.remove('loading')
    nav.classList.remove('hide')

    const content = document.createElement('div')
    content.classList.add('dictionary-list')
    list.forEach(({ word, type, def, synonyms = [] }) => {
      const wordEl = document.createElement('a')
      wordEl.classList.add('search-result', 'block', 'px-16', 'py-4')
      wordEl.setAttribute('href', `${baseUrl}/dictionary?term=${word}`)
      wordEl.innerHTML = `
        <strong>${word}</strong> <em class="semi-transparent px-4">${formatWordType(type)}</em>
        ${[def, ...synonyms].join(', ')}

      `
      content.appendChild(wordEl)
    })
    output.appendChild(content)

    navPrev.onclick = () => {
      output.classList.add('loading')
      output.removeChild(content)
      buildListPage(offset - LIST_LIMIT)
    }

    navNext.onclick = () => {
      output.classList.add('loading')
      output.removeChild(content)
      buildListPage(offset + LIST_LIMIT)
    }

    if (offset === 0) {
      navPrev.classList.add('hide')
    } else {
      navPrev.classList.remove('hide')
    }

    if (hasMoreItems) {
      navNext.classList.remove('hide')
    } else {
      navNext.classList.add('hide')
    }
  }

  const parseSpecials = (str) => {
    let result = ''
    let isItalic = false
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '_') {
        if (isItalic) {
          result += '</em></strong>'
        } else {
          result += '<strong><em>'
        }
        isItalic = !isItalic
      } else {
        result += str[i]
      }
    }
    if (isItalic) {
      result += '</em></strong>'
    }
    return result.replace(/\-\>/g, '→')
  }

  const buildWordPage = async () => {
    const { result } = await readDictionary(term)
    output.classList.remove('loading')

    if (!result) {
      output.innerHTML = `
        <h2>Sorry!</h2>
        <p>The word "${term}" does not exist in the dictionary.</p>
      `
      return
    }

    const { word, type, def, synonyms = [], hypothetical, irregular, custom, notes, origin, originDef } = result

    output.innerHTML = `
      <h2 class="font-size-36 mb-8">${word} <em class="semi-transparent font-size-18">${type} ${irregular ? 'irregular' : ''}</em></h2>
      <ul class="mb-32">
        <li>"${[def, ...synonyms].join(', ')}"</li>
        ${hypothetical ? `<li>The origin of this word is hypothetical</li>` : ''}
        ${custom ? `<li>can not be automatically generated</li>` : ''}
      </ul>
      ${origin ? `
        <p>
          Derived from ${hypothetical ? 'hypothetical PGmc. construction' : 'PGmc.'} <strong><em>${origin}</em></strong>, meaning "${originDef}". 
        </p>
      `: ''}
      ${notes ? `<h3>Notes:</h3><p>${parseSpecials(notes)}</p>` : ''}
    `
  }

  subscribe('dictionary:ready', () => isListPage ? buildListPage(0) : buildWordPage())
})