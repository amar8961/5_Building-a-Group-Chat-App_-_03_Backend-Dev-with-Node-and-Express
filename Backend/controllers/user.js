const Users=require('../models/users')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Generate Token
function generateToken(email){
    return (jwt.sign({email:email}, process.env.JWT_SECRETKEY))
}

// Sign up
exports.createUser=(req, res, next)=>{
    console.log(req.body)
    bcrypt.hash(req.body.password, saltRounds).then((hash)=>{
        console.log(hash)
        Users.findOrCreate({
            where: {email:req.body.email},
            defaults: {
                name: req.body.name,
                email: req.body.email,
                phone:req.body.phone,
                password: hash,
        }}).then(response=>{
            res.status(201).send(response)
        }).catch(err=>console.log(err))
    });
}

// Sign in
exports.findUser=(req, res, next)=>{
    const creds=JSON.parse(req.params.creds)
    Users.findOne({where: {email:creds.email}})
    .then(response=>{
        if (response==null || response==''){
            res.status(200).send({code:0})
        }else{
            bcrypt.compare(creds.password, response.password).then((result)=>{
                if(result){
                    res.status(200).send({code:1, token:generateToken(creds.email)})
                }else{
                    res.status(200).send({code:2})
                }
            });
        }
    }).catch(err=>console.log(err))
}