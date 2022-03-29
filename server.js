const express = require('express')
const server = express()

//Import Serurity
const helmet = require('helmet')
const cors = require('cors')

server.use(helmet())
server.use(cors())
server.use(express.json())
const PORT = process.env.PORT || 3000

const router = require('./app/routes/router')
server.use('/api', router)


server.listen(PORT, ()=> {
    console.log(`Not the port ${PORT} running...`)
})