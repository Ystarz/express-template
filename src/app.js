import express from 'express'
let app = express()
// 引入post解析中间件
let bodyParser = require('body-parser')
let multer = require('multer')
let upload = multer()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(upload.array())

app.get('/hello', (req, res) => {
    res.send('world')
})

app.listen(3000, () => {
    console.log('app start at port 3000')
})