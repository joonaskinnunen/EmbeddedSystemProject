const temperatureRouter = require('express').Router()
const Temperature = require('../models/temperature')
require('dotenv').config()

temperatureRouter.get('/', async (request, response) => {
  const temperatures = await Temperature.find({})
  response.json(temperatures.map(temperature => temperature.toJSON()))
})

module.exports = temperatureRouter