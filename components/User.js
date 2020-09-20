/**
 * User component with reusable with props
 * @param avatar_url Avatar image link
 * @param name User name
 * @param company Company
 * @param location User location
 * @param email E-mail
*/
const User = ({ avatar_url, name, company, location, email }) => `
  <img src='${avatar_url}' alt='Github avatar' />

  <div>
    <h1>${name || 'Não possui'}</h1>
    <p>${company || 'Não possui'}</p>
    <p>${location || 'Não possui'}</p>
    <p>${email || 'Não possui'}</p>
  </div>
`

export default User