const express = require('express')
const router = express.Router()
const Bike = require('../models/Bike')


//add bikes
router.get('/new',(req, res)=>{
    res.render('bike-form')
})
router.post('/new',(req, res)=>{
    if(req.body.withCasco=='on')req.body.withCasco=true
    else req.body.withCasco = false
    Bike.create(req.body).then(bike=>{
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