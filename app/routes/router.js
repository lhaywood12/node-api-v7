const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000

// Building the api
router.get('/', (req, res)=> {
    res.json ({
        'All Films': `http://localhost:${PORT}/api/film`,
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Countries': `http://localhost:${PORT}/api/country`
    })
})

//api film
router.use('/film', require('./api/filmRoutes'))

//api/actor
router.use('/actor', require('./api/actorRoutes'))

//api/country
router.use('/country', require('./api/countryRoutes'))

module.exports = router