const form = document.querySelector('form')
const input = document.querySelector('input')
const usersDom = document.querySelector('.users')
const toastElement = document.querySelector('.toast')
const users = []

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

  if (toastElement.classList.contains('on')) {
    return
  }

  if (!input.value) {
    showToast('Digite um valor válido')
    return
  }

  const userExist = users.includes(input.value)

  if (userExist) {
    showToast('Esse usúario já foi cadastrado')
    return
  }

  fetch(`https://api.github.com/users/${input.value}`)
    .then(response => response.json())
    .then(({ login, html_url, ...rest }) => {
      users.push(login)

      const link = document.createElement('a')
      link.setAttribute('href', html_url)

      link.innerHTML = userComponent({ ...rest })
      usersDom.appendChild(link)
    })
    .catch((error) => {
      showToast('Ocorreu um erro')
      return
    })

  console.log(users)
})
