const $ = element => document.querySelector(element)

const form = $('form')
const input = $('input')
const usersDom = $('.users')
const toastElement = $('.toast')
const users = []

input.focus()

const showToast = message => {
  const text = document.createTextNode(message)
  toastElement.appendChild(text)
  toastElement.classList.add('on')

  const toastTimeout = () => setTimeout(() => {
    toastElement.classList.remove('on')
    toastElement.removeChild(text)
  }, 2000)

  toastTimeout()

  clearTimeout(toastTimeout)
}

const userComponent = ({ avatar_url, name, followers, email }) => `
  <img src='${avatar_url}' alt='Github avatar' />

  <div>
    <h1>${name}</h1>
    <p>Seguidores: ${followers}</p>
    <p>E-mail: ${email || 'Não possui'}</p>
  </div>
`

form.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = input.value

  if (toastElement.classList.contains('on')) {
    return
  }

  if (!inputValue) {
    showToast('Digite um valor válido')
    return
  }

  const userExist = users.includes(inputValue)

  if (userExist) {
    showToast('Esse usúario já foi cadastrado')
    return
  }

  fetch(`https://api.github.com/users/${inputValue}`)
    .then(response => response.json())
    .then(({ login, html_url, ...rest }) => {
      if (!login) {
        showToast('Usuário não encontrado')
        return
      }      

      users.push(login)

      const link = document.createElement('a')
      link.setAttribute('href', html_url)

      link.innerHTML = userComponent({ ...rest })
      usersDom.appendChild(link)
    })
    .catch(() => {
      showToast('Ocorreu um erro')
      return
    })
})
