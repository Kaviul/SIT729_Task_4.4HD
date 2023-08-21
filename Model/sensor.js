const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dataSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    time: {
        type: Date
    },

    sensorData: {
        type: String

    },

}, {timestamps: true})



const Sensor = mongoose.model('data', dataSchema)
module.exports = Sensor

