window.addEventListener('load', () => {
  const menuLink = document.querySelector('#menu-link')
  const menuIcon = document.querySelector('#menu-icon')
  const navContainer = document.querySelector('#nav-container')
  const contentContainer = document.querySelector('#scrollable-content')
  const navItems = Array.from(document.querySelectorAll('#nav-container li a'))

  menuLink.addEventListener('click', () => {
    menuIcon.classList.toggle('menu-open')
    navContainer.classList.toggle('menu-open')
    contentContainer.classList.toggle('menu-open')
  })

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      menuIcon.classList.remove('menu-open')
      navContainer.classList.remove('menu-open')
      contentContainer.classList.remove('menu-open')
    })
  })
})