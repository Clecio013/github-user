import Toast from './components/Toast'
import User from './components/User'

const $ = element => document.querySelector(element)

const form = $('form')
const input = $('input')
const usersDom = $('.users')
const toastElement = $('.toast')
const users = []

input.focus()

form.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = input.value

  const toastActive = toastElement.classList.contains('on')

  if (toastActive) {
    return
  }

  if (!inputValue) {
    Toast('Digite um valor válido', toastElement)
    return
  }

  const userExist = users.includes(inputValue)

  if (userExist) {
    Toast('Esse usúario já foi cadastrado', toastElement)
    return
  }

  fetch(`https://api.github.com/users/${inputValue}`)
    .then(response => response.json())
    .then(({ login, html_url, ...rest }) => {
      if (!login) {
        Toast('Usuário não encontrado', toastElement)
        return
      }

      users.push(login)

      const link = document.createElement('a')
      link.setAttribute('href', html_url)

      link.innerHTML = User({ ...rest })
      usersDom.appendChild(link)
    })
    .catch(() => {
      Toast('Ocorreu um erro', toastElement)
      return
    })
})
