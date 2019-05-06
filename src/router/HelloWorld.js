import express from 'express'
let router = express.Router()

router.get('/hello', (req, res) => {
    res.send('world')
})

router.post('/hello', (req, res) => {
    let arg = req.body
    res.send(arg)
})

export default router