import express from 'express'
let app = express()

// 引入post解析中间件
let bodyParser = require('body-parser')
let multer = require('multer')
let upload = multer()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(upload.array())

// 引入跨域中间件
let cors = require('cors')
let corsOptions = {
    origin: '*'
}
app.use(cors(corsOptions))

// 引入日志中间件
let morgan = require('morgan')
app.use(morgan('short'))

// 引入https服务中间件
// let fs = require('fs')
// let https = require('https')
// let credentials = {
//     key: fs.readFileSync('your certificate key path here', 'utf8'),
//     cert: fs.readFileSync('your certificate crt path here', 'utf8')
// }
// https.createServer(credentials, app).listen(3031, () => console.log('start app success at port 3031 (https)'))

// 引入路由
import { HelloWorld } from './router'
app.use('/', HelloWorld)

// 引入http服务中间件
const http = require('http')
http.createServer(app).listen(3000, () => console.log('start app success at port 3000 (http)'))