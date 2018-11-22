const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bikeSchema = new Schema({
    modelo:String,
    photoURL:String,
    price:Number,
    rodada:Number,
    withCasco:Boolean
},{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
})

module.exports = mongoose.model('Bike', bikeSchema)



