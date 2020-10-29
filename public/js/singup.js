const form = document.querySelector('#form-for-singup')

form.addEventListener('submit', singup)

async function singup(e) {
  e.preventDefault()
  const action = e.target.action
  const method = e.target.method
  
  const response = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({todo})
  })

}
