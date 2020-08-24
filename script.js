const users = []

const getUser = () => {
  const input = document.querySelector('input')
  const usersDom = document.querySelector('.users')
  const toastElement = document.querySelector('.toast')

  if (!input.value) {
    const text = document.createTextNode('Digite um valor válido')
    toastElement.appendChild(text)
    toastElement.classList.add('on')

    const showToast = () => setTimeout(() => {
      toastElement.classList.remove('on')
    }, 2000)
    showToast()

    clearTimeout(showToast)
    return
  }

  fetch(`https://api.github.com/users/${input.value}`)
    .then(response => response.json())
    .then(({ name, followers, email, avatar_url, html_url }) => {
      if (users.includes(input.value)) {
        const text = document.createTextNode('Esse usuário já foi adicionado')

        toastElement.appendChild(text)
        toastElement.classList.add('on')

        const showToast = () => setTimeout(() => {
          toastElement.classList.remove('on')
        }, 2000)
        showToast()

        clearTimeout(showToast)
        return
      }

      users.push(input.value)

      const link = document.createElement('a')
      link.setAttribute('href', html_url)

      const image = document.createElement('img')
      image.setAttribute('src', avatar_url)

      const content = document.createElement('div')

      const githubName = document.createElement('h1')
      githubName.textContent = name

      const followerText = document.createElement('p')
      followerText.textContent = `Seguidores: ${followers}`

      const emailText = document.createElement('p')
      emailText.textContent = `E-mail: ${email || 'Não possui'}`
      
      content.appendChild(githubName)
      content.appendChild(followerText)
      content.appendChild(emailText)

      link.appendChild(image)
      link.appendChild(content)

      usersDom.appendChild(link)
    })
}