import express from 'express'
let router = express.Router()
import { checkArgs } from '../middleware'

router.get('/hello', (req, res) => {
    res.send('world')
})

router.post('/hello', (req, res) => {
    let arg = req.reqDatas
    res.send(arg)
})

export default router