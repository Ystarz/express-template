import express from 'express'
let router = express.Router()
import { checkArgs } from '../middleware'
import { sqlQuery } from '../db/pool'

/**
 * @swagger
 * /hello:
 *   get:
 *     tags:
 *       - 测试
 *     summary: GET 测试
 *     description: 用于测试基础 GET 请求的接口
 *     responses:
 *       200:
 *         description: 【成功】 返回 world
 */
router.get('/hello', (req, res) => {
    res.send('world')
})

/**
 * @swagger
 * /hello:
 *   post:
 *     tags:
 *       - 测试
 *     summary: POST 测试
 *     description: 响应 POST 请求并解析 body 中的参数
 *     responses:
 *       200:
 *         description: 【成功】 返回请求 body 中携带的参数
 */
router.post('/hello', (req, res) => {
    let arg = req.body
    res.send(arg)
})

/**
 * @swagger
 * /needArgs:
 *   get:
 *     tags:
 *       - 测试
 *     summary: 参数检查中间件测试
 *     description: 该接口使用了参数检查中间件，在 query 中携带参数 a, b, c 后即可通过检查，否则返回缺失必填参数
 *     responses:
 *       200:
 *         description: 【成功】 返回请求 body 中携带的参数
 */
router.get('/needArgs', checkArgs('a', 'b', 'c'), (req, res) => {
    let args = req.query
    res.send(args)
})

/**
 * @swagger
 * /sqlQuery:
 *   get:
 *     tags:
 *       - 测试
 *     summary: 数据库查询测试
 *     description: 使用了 sqlQuery 进行数据库查询，接受一个 username 来进行查询
 *     responses:
 *       200:
 *         description: 【成功】 返回查询出的 password 和 id
 */
router.get('/sqlQuery', checkArgs('username'), async (req, res) => {
    let { username } = req.query

    let resp = await sqlQuery('SELECT password, id FROM member WHERE username = ?;', [ username ])
    res.send(resp)
})

export default router