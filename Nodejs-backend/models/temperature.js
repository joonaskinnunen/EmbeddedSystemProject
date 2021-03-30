const mongoose = require('mongoose')

const temperatureSchema = new mongoose.Schema({
    time: {
      type: Date,
    },
    temperature: {
      type: Number
    },
    humidity: {
      type: Number
    },
    lightness: {
      type: Number
    },
    pollution: {
      type: Number
    },
    distance: {
      type: Number
    }
  })
  
  temperatureSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('temperature', temperatureSchema, "temperatures")