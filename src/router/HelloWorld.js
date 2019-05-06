import express from 'express'
let router = express.Router()
import { checkArgs } from '../middleware'

// 响应 get 请求并返回
router.get('/hello', (req, res) => {
    res.send('world')
})
// 响应 post 请求并解析 body 中的参数
router.post('/hello', (req, res) => {
    let arg = req.body
    res.send(arg)
})
// 使用了 checkArgs 中间件来进行参数检查，通过检查后需要的参数会被放在 req.reqDatas 中
router.get('/needArgs', checkArgs(['a', 'b', 'c']), (req, res) => {
    let args = req.reqDatas
    res.send(args)
})

export default router