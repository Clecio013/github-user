/**
 * Toast component
 * @param message Message that will be displayed inside toast
 * @param displayTime Time that toast will be displayed
*/
const Toast = (message, ref, displayTime = 2000) => {
  const text = document.createTextNode(message)
  ref.appendChild(text)
  ref.classList.add('on')

  const toastTimeout = () => setTimeout(() => {
    ref.classList.remove('on')
    ref.removeChild(text)
  }, displayTime)

  toastTimeout()

  clearTimeout(toastTimeout)
}

export default Toast
