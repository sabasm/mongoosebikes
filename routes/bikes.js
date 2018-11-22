const express = require('express')
const router = express.Router()
const Bike = require('../models/Bike')

router.get('/new',(req, res)=>{
    Bike.create({
        modelo:'ejercicio at home', 
        photoURL:'https://cdn.shopify.com/s/files/1/0692/8675/products/circle_bike_b8.jpg?v=1512975974',
        price:5000,
        rodada:26,
        withCasco:false
     }).then(bike=>{
         res.redirect('/bikes')
     }).catch(e=>console.log(e))
})
//bikes list
router.get('/bikes',(req, res)=>{
    const {search, withCasco} = req.query
    //const search = req.query.search
    //filtros
    
        //buscador
    if(search){
        Bike.find({modelo:{$regex:search,$options:'i'}})
        .then(bikes=>{
            res.render('bikes-list',{bikes})
        }).catch(e=>console.log(e))
    }else if(withCasco){
        Bike.find({withCasco})
        .then(bikes=>{
            res.render('bikes-list',{bikes})
        }).catch(e=>{
            console.log(e)
        })
    }else{
        Bike.find()
        .then(bikes=>{
            res.render('bikes-list',{bikes})
        }).catch(e=>console.log(e))
    }
    
})

//bikes detail
router.get('/bikes/:perro',(req, res)=>{
    const {perro} = req.params
    //const id = req.params.id
    Bike.findById(perro)
        .then(bike=>{
            res.render('bike-detail', bike)
        }).catch(e=>console.log(e))
})

module.exports = router