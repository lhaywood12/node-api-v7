const daoCommon = require('./common/daoCommon')

const filmDao = {
    ...daoCommon,
    ...require('./api/filmDao')

    //const filmDao = Object.assign(daoCommon, require('./api/filmDao))
    //const filmDao = {...daoCommon, ...require('./api/filmDao)}
}

const actorDao = {...daoCommon, ...require('./api/actorDao')}
const countryDao = {...daoCommon, ...require('./api/countryDao')}

module.exports = {
    filmDao,
    actorDao,
    countryDao
}