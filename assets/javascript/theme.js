(function () {
  
  const html = document.querySelector('html')

  const applyDark = () => {
    html.classList.add('dark')
  }

  const applyLight = () => {
    html.classList.remove('dark')
  }

  const isDark = () => html.classList.contains('dark')

  window.addEventListener('load', () => {
    const toggler = document.querySelector('#toggle-theme')
    toggler.addEventListener('click', () => {
      if (isDark()) {
        applyLight()
        localStorage.setItem('theme', 'light')
      } else {
        applyDark()
        localStorage.setItem('theme', 'dark')
      }
    })
  })

  if (localStorage.getItem('theme') === 'dark') {
    applyDark()
  } else {
    applyLight()
  }
}())