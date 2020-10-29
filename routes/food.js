const express = require('express')
const router = express.Router();
// app.use(express.urlencoded({extended: true}))

//генерируем главную страницу раздела "FOOD"
router.get('/', (req, res) =>
res.render('index_food'))

//принимаем запрос на геннерацию формы правки поста
router.get('/post-edit-form', (req, res) => {
  res.render('post-edit-form')
})
//принимаем данные на редактирование поста
router.post('/post-edit-form', (req, res) => {
  res.render('post-edit-form')
})
module.exports = router
