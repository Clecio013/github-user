const $ = element => document.querySelector(element)

const form = $('form')
const input = $('input')
const usersDom = $('.users')
const toastElement = $('.toast')
const users = []

input.focus()

/**
 * Toast component
 * @param message Message that will be displayed inside toast
 * @param displayTime Time that toast will be displayed
*/
const Toast = (message, displayTime = 2000) => {
  const text = document.createTextNode(message)
  toastElement.appendChild(text)
  toastElement.classList.add('on')

  const toastTimeout = () => setTimeout(() => {
    toastElement.classList.remove('on')
    toastElement.removeChild(text)
  }, displayTime)

  toastTimeout()

  clearTimeout(toastTimeout)
}

/**
 * User component with reusable with props
 * @param avatar_url Avatar image link
 * @param name User name
 * @param company Company
 * @param location User location
 * @param email E-mail
*/
const UserUI = ({ avatar_url, name, company, location, email }) => `
  <img src='${avatar_url}' alt='Github avatar' />

  <div>
    <h1>${name || 'Não possui'}</h1>
    <p>${company || 'Não possui'}</p>
    <p>${location || 'Não possui'}</p>
    <p>${email || 'Não possui'}</p>
  </div>
`

form.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = input.value

  const toastActive = toastElement.classList.contains('on')

  if (toastActive) {
    return
  }

  if (!inputValue) {
    Toast('Digite um valor válido')
    return
  }

  const userExist = users.includes(inputValue)

  if (userExist) {
    Toast('Esse usúario já foi cadastrado')
    return
  }

  fetch(`https://api.github.com/users/${inputValue}`)
    .then(response => response.json())
    .then(({ login, html_url, ...rest }) => {
      if (!login) {
        Toast('Usuário não encontrado')
        return
      }

      users.push(login)

      const link = document.createElement('a')
      link.setAttribute('href', html_url)

      link.innerHTML = UserUI({ ...rest })
      usersDom.appendChild(link)
    })
    .catch(() => {
      Toast('Ocorreu um erro')
      return
    })
})
