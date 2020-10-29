const form = document.querySelector('#form-create-post')
console.log(2134567)
// const list = document.querySelector('#list')

form.addEventListener('submit', ajax)

async function ajax(e) {
  e.preventDefault()
  const text = e.target['new-post'].value
  console.log(text);
  //const todo = e.target.todo.value
  const action = e.target.action
  const method = e.target.method
  const response = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text})
  })
  const result = await response.json()
  if (result.success) {

    const newPost = document.createElement('div')
    newPost.textContent = result.text

    document.body.append(newPost)
    
  }
}
