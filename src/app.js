import express from 'express'

let app = express()

app.get('/hello', (req, res) => {
    res.send('world')
})

app.listen(3000, () => {
    console.log('app start at port 3000')
})