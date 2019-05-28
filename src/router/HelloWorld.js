import express from 'express'
let router = express.Router()
import { checkArgs } from '../middleware'
import { sqlQuery } from '../db/pool'

/**
 * 用于测试基础 GET 请求的接口
 * @route GET /hello
 * @summary GET 测试
 * @group 测试
 * @returns {object} 200 - 返回 world
 */
router.get('/hello', (req, res) => {
    res.send('world')
})

/**
 * 响应 POST 请求并解析 body 中的参数
 * @route POST /hello
 * @summary POST 测试
 * @param {object} anything.body - 任何参数均可,将会在请求响应中返回
 * @group 测试
 * @returns {object} 200 - 【成功】 返回请求 body 中携带的参数
 */
router.post('/hello', (req, res) => {
    let arg = req.body
    res.send(arg)
})

/**
 * 要求必须包含三个指定参数 a, b, c
 * @route GET /needArgs
 * @group 测试
 * @summary 参数检查中间件测试
 * @param {string} a.query.required - 一个必须传递的参数
 * @param {string} b.query.required - 一个必须传递的参数
 * @param {string} c.query.required - 一个必须传递的参数
 * @returns {object} 200 - 【成功】 返回请求 query 中携带的参数
 */
router.get('/needArgs', checkArgs('a', 'b', 'c'), (req, res) => {
    let args = req.query
    res.send(args)
})

/**
 * 获取用户名，返回其密码和id，注意！调用该方法请确保正确配置了数据库连接并建有正确的表
 * @route GET /sqlQuery
 * @group 测试
 * @summary 数据库查询测试
 * @param {string} username.query.required - 用户名
 * @returns {object} 200 - 【成功】 包含用户的 password 及 id
 */
router.get('/sqlQuery', checkArgs('username'), async (req, res) => {
    let { username } = req.query

    let resp = await sqlQuery('SELECT password, id FROM member WHERE username = ?;', [ username ])
    res.send(resp)
})

export default router