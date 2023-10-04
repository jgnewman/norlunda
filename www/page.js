window.addEventListener('load', () => {
  if (!window.norlunda) return;
  
  Array.from(document.querySelectorAll('button')).forEach(button => button.addEventListener('click', () => {
    if (button.classList.contains('click-animation')) return;
    button.classList.add('click-animation');
    setTimeout(() => button.classList.remove('click-animation'), 175);
  }));

  const input = document.querySelector('#norl-input');
  const button = document.querySelector('#norl-button');
  const output = document.querySelector('#norl-output');

  Array.from(document.querySelectorAll('.special-char')).forEach(button => button.addEventListener('click', () => {
    const value = button.innerHTML.trim();
    input.value = input.value.trim() + value;
    input.focus();
  }));

  const buildTableRow = ({ step, result }, cellType, className) => {
    const stepRow = document.createElement('tr');
    if (className) stepRow.className = className;
        
    const labelCell = document.createElement(cellType);
    labelCell.innerHTML = step;
    stepRow.appendChild(labelCell);
    
    const resultCell = document.createElement(cellType);
    resultCell.innerHTML = result;
    stepRow.appendChild(resultCell);

    return stepRow
  }

  const handler = () => {
    output.innerHTML = '';

    const word = input.value.trim();
    const result = word ? window.norlunda(word) : 'No word provided';
    
    if (typeof result === 'string') {
      output.innerHTML = result;

    } else {
      const finalResult = result[result.length - 1].result;
      const h2 = document.createElement('h2');
      h2.setAttribute('class', 'is-text-align-center pb-8');
      h2.innerHTML = finalResult;
      output.appendChild(h2);

      const table = document.createElement('table');
      table.setAttribute('class', 'has-shadow has-gentle-sheen');
      output.appendChild(table);

      const headerRow = buildTableRow({ step: 'Step', result: 'Result' }, 'th', 'header-row')
      table.appendChild(headerRow);

      const inputRow = buildTableRow({ step: 'Input', result: word }, 'td', 'input-row');
      table.appendChild(inputRow);
      
      result.forEach(step => {
        const stepRow = buildTableRow(step, 'td');
        table.appendChild(stepRow);
      });

      const outputRow = buildTableRow({ step: 'Output', result: finalResult }, 'td', 'output-row');
      table.appendChild(outputRow);
    }
  };

  button.addEventListener('click', handler);
  input.addEventListener('keyup', event => {
    if (event.key === 'Enter') handler();
  });
});
