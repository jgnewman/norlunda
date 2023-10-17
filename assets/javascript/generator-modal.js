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

  /**
   * resultObject =
   *   isCompound: boolean
   *   input: string | string[] // if compound
   *   steps: Array<{ step: string; result: string }> | null // if compound
   *   output: string
   *   outputComponents: null | string[] // if compound
   *   outputIPA: string
   */
  const buildSingleOutput = ({ isCompound, steps, output, outputComponents, outputIPA }) => {
    generatorOutput.innerHTML = ''

    const outputHeader = document.createElement('div')
    outputHeader.classList.add('flex', 'justify-content-flex-start', 'align-items-baseline', 'flex-gap-2', 'mb-36')
    outputHeader.innerHTML = `
      <span class="fancy-copy oversized-copy">${output}</span>
      <span class="tracking-1">${outputIPA}</span>
    `
    generatorOutput.appendChild(outputHeader)

    if (isCompound) {
      const outputP = document.createElement('p')
      outputP.classList.add('pt-24', 'border-top')
      outputP.innerHTML = `
        This compound was created from the following elements:
        <strong>${outputComponents.join(', ')}</strong>.
      `
      generatorOutput.appendChild(outputP)
    }

    if (!isCompound) {
      const outputTable = document.createElement('table')
      outputTable.classList.add('table', 'mb-36')
      outputTable.innerHTML = `
        <thead>
          <tr>
            <th class="p-12">Step</th>
            <th class="p-12">Result</th>
          </tr>
        </thead>
        <tbody>
          ${steps.map(({ step, result }, index) => `
            <tr class="${index % 2 !== 0 ? 'row-stripe' : ''}">
              <td class="px-12 py-4">${step}</td>
              <td class="px-12 py-4">${result}</td>
            </tr>
          `).join('')}
        </tbody>
      `
      generatorOutput.appendChild(outputTable)
    }
  }

  const buildMultiOutput = (resultObjects) => {
    generatorOutput.innerHTML = ''

    const outputTable = document.createElement('table')
      outputTable.classList.add('table', 'mb-24')
      outputTable.innerHTML = `
        <tbody>
          <tr class="border-bottom">
            <th class="p-12">Input</th>
            <th class="p-12">Output</th>
            <th class="p-12">IPA</th>
          </tr>
          ${resultObjects.map(({ input, output, outputIPA }, index) => `
            <tr class="${index % 2 !== 0 ? 'row-stripe' : ''}">
              <td class="px-12 py-6">${typeof input === 'string' ? input : input.join(', ')}</td>
              <td class="px-12 py-6 fancy-copy">${output}</td>
              <td class="px-12 py-6 tracking-1">${outputIPA}</td>
            </tr>
          `).join('')}
        </tbody>
      `

      generatorOutput.appendChild(outputTable)
  }

  generatorForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = generatorField.value.trim()
    if (!input) return;

    const words = input.split(',').map(word => word.trim())

    if (words.length === 1) {
      const resultObject = window.norlunda(input)
      return buildSingleOutput(resultObject)
    } else {
      const resultList = words.map(word => window.norlunda(word))
      return buildMultiOutput(resultList)
    }

  })

})