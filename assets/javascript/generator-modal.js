window.addEventListener('load', () => {
  const generatorModal = document.querySelector('#generator-modal')
  if (!generatorModal) return;

  const generatorForm = generatorModal.querySelector('#generator-form')
  const generatorField = generatorModal.querySelector('#generator-field')
  const specialChars = Array.from(generatorModal.querySelectorAll('.special-char'))
  const generatorOutput = generatorModal.querySelector('#generator-output')
  const generatorDefaultOutputContent = generatorModal.querySelector('#generator-default-output-content')

  window.norlundaTools.subscribe('modal:open', ({ modalName }) => {
    if (modalName === 'generator') {
      generatorField.focus()
    }
  })

  window.norlundaTools.subscribe('modal:close', ({ modalName }) => {
    if (modalName === 'generator') {
      generatorField.value = ''
      generatorOutput.innerHTML = ''
      generatorOutput.appendChild(generatorDefaultOutputContent)
    }
  })

  specialChars.forEach(char => {
    char.addEventListener('click', () => {
      generatorField.value += char.innerHTML
      generatorField.focus()
    })
  })

  const ipaify = (word) => {
    const result = word
      .replace(/aa/g, 'ɔː')
      .replace(/au/g, 'aʊ')
      .replace(/ee/g, 'eː')
      .replace(/ei/g, 'aɪ')
      .replace(/ie/g, 'iː')
      .replace(/i([^ː])/g, 'ɪ$1')
      .replace(/(oe|œ)/g, 'øː')
      .replace(/[bcdfghjklmnpqrstvwxz]{2}/ig, (match) => {
        if (match[0] === match[1]) return match[0] + 'ː'
        return match
      })
    return `/'${result}/` 
  }

  // steps = Array<{ step: string; result: string }>
  const buildOutput = (steps) => {
    const { result: finalResult } = steps[steps.length - 1]

    const outputHeader = document.createElement('div')
    outputHeader.classList.add('flex', 'justify-content-flex-start', 'align-items-baseline', 'flex-gap-2', 'mb-36')
    outputHeader.innerHTML = `
      <span class="fancy-copy">${finalResult}</span>
      <span>${ipaify(finalResult)}</span>
    `

    const outputTable = document.createElement('table')
    outputTable.classList.add('table', 'mb-24')
    outputTable.innerHTML = `
      <thead>
        <tr>
          <th>Step</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        ${steps.map(({ step, result }) => `
          <tr>
            <td>${step}</td>
            <td>${result}</td>
          </tr>
        `).join('')}
      </tbody>
    `

    generatorOutput.innerHTML = ''
    generatorOutput.appendChild(outputHeader)
    generatorOutput.appendChild(outputTable)
  }

  generatorForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = generatorField.value.trim()
    if (!input) return;

    const resultSteps = window.norlunda(input)
    buildOutput(resultSteps)
  })

})