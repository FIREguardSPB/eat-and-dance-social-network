const form = document.querySelector('#form-for-ajax')
const list = document.querySelector('#list')

form.addEventListener('submit', ajax)

async function ajax(e) {
  e.preventDefault()
  const todo = e.target.todo.value
  const action = e.target.action
  const method = e.target.method
  const response = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({todo})
  })
  const result = await response.json()
  if (result.success) {
    const li = document.createElement('li')
    const input = document.createElement('input')
    input.type = 'checkbox'
    const p = document.createElement('p')
    p.textContent = result.newTodo.text
    li.style.display = 'flex'
    li.style.alignItems = 'center'
    li.append(input, p)
    list.append(li)
  }
}
