const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const User = require('../models/User')
users.use(cors())
process.env.SECRET_KEY = 'secret'

//Registration

users.post('/register', (req,res)=>{

    userData = {
        full_name  : req.body.full_name,
        email : req.body.email,
        password : req.body.password,
        enabled : 1
    }

    User.findOne({
        where : {
            email : userData.email
        }
    }).then((user)=>{

        if(user){
            //user exists
            res.send({
                'email' : 'duplicated'
            })
        }
        else{
            //Bycrypting password
            bcrypt.hash(req.body.password, 10 , (err,hash)=>{
                userData.password = hash
                User.create(userData).then(created => {
                    
                    //generating JWT
                    let token = jwt.sign(created.dataValues, process.env.SECRET_KEY)
                    res.json({ token: token })
                })
                .catch(err => {
                  res.json({
                      'error: ' : err
                    })
                })
              })
        }
    }).catch(err =>{
        res.json({
            'err' : err
        })
    })
})


users.post('/login', (req,res)=>{
    User.findOne({
        where :{
            email : req.body.email
        }
    }).then(user =>{
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                //login correct
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY)
                res.json({
                    token: token 
                })
            }else{
                //password incorrect
                res.sendStatus(403)
            }
        }else{
            //email not found
            res.sendStatus(404)
        }
    }).catch(err=>{
        res.json({
            'err' : err
        })
    })
})



module.exports = users