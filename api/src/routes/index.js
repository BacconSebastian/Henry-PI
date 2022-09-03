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
            image: e.flags[0],
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
                attributes: ['name', 'duration', 'difficulty', 'season'],
                through: {
                    attributes: []
                }
            }
        }
    )
}

const getAllInfo = async () => {
    const apiInfo = await getInfoApi()

    for (let i = 0; i < apiInfo.length; i++) {
        let findedCountry = await Country.findByPk(apiInfo[i].id)
        if (findedCountry == null) {
            Country.create({
                id: apiInfo[i].id,
                name: apiInfo[i].name,
                image: apiInfo[i].image,
                continent: apiInfo[i].continent ? apiInfo[i].continent : "This country does not have continent",
                capital: apiInfo[i].capital? apiInfo[i].capital[0] : "This country does not have capital",
                subregion: apiInfo[i].subregion ? apiInfo[i].subregion : "This country does not have subregion",
                area: apiInfo[i].area,
                population: apiInfo[i].population
            })
        }
    }

    const dbInfo = await getInfoDb()

    return dbInfo
}

const getActivities = async () => {
    return await Activity.findAll()
}

router.get('/countries', async (req, res) => {
    const { name } = req.query

    const allCountries = await getAllInfo()

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

        const activityCreated = await Activity.findAll({
            where: {name: name}
        })
    
        for (let i = 0; i < countries.length; i++) {
            let country = await Country.findByPk(countries[i])
            country.addActivity(activityCreated)
        }
    
        return res.send('Activity created successfully')
    } else {
        return res.send('This activity already exists')
    }
})


module.exports = router;
