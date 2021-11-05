const express = require('express')
const app = express()
const PORT = 4101 || process.env.PORT

app.get('/', (req, res) => {
    res.send('You accessed simple Node.js/Express server')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})