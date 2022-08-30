const { Router } = require('express')
const axios = require('axios')
const { Country, Activity } = require('../db')


const router = Router();

const getInfoApi = async () => {
    const urlApi = await axios.get('https://restcountries.com/v3/all')
    const InfoApi = urlApi.data.map(e => {
        return {
            id: e.cca3,
            name: e.name.common,
            img: e.flags[0],
            continent: e.region,
            capital: e.capital,
            subregion: e.subregion,
            area: e.area,
            population: e.population
        }
    })
    return InfoApi
}

const getInfoDb = async () => {
    return await Country.findAll(
        {
            include: {
                model: Activity,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        }
    )
}

const getAllInfo = async () => {
    const apiInfo = await getInfoApi()
    const dbInfo = await getInfoDb()
    const allInfo = apiInfo.concat(dbInfo)

    return allInfo
}

const getActivities = async () => {
    return await Activity.findAll()
}

router.get('/countries', async (req, res) => {
    const { name } = req.query

    const allCountries = await getAllInfo()

    allCountries.sort((a, b) => {
        if (a.name > b.name) {
            return 1
        } else if (b.name > a.name) {
            return -1
        } else {
            return 0
        }
    })

    if (name) {
        const country = allCountries.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        country.length ? res.status(200).send(country) : res.status(404).send('This country does not exist')
    } else {
        res.status(200).send(allCountries)
    }
})

router.get('/activities', async (req, res) => {

    const allActivities = await getActivities()

    res.send(allActivities)
})

router.get('/countriesAZ', async (req, res) => {

    const allCountries = await getAllInfo()

    res.send(allCountries)
})

router.get('/countries/:countryId', async (req, res) => {
    const { countryId } = req.params

    const allCountries = await getAllInfo()

    if (countryId) {
        const country = allCountries.filter(e => e.id.toLowerCase() == countryId.toLowerCase())
        country.length ? res.status(200).send(country) : res.status(404).send('We do not have any country with this code id')
    }

})

router.post('/activity', async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body

    for (let i = 0; i < countries.length; i++) {
        let countryToRelate = await Country.findByPk(countries[i])
        console.log('PK: ' + countries[i] + ' Result: ' + countryToRelate)
    }

    if (!name || !difficulty) {
        return res.status(400).send('Activity needs name and difficulty')
    }

    const allActivities = await getActivities()

    const activity = allActivities.filter(e => e.name.toLowerCase() == name.toLowerCase())

    if (!activity.length) {
        await Activity.create({
            name,
            difficulty,
            duration,
            season
        })
    
        return res.send('Activity created successfully')
    } else {
        return res.send('This activity already exists')
    }
})


module.exports = router;
