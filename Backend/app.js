const express = require('express')
const bodyParser = require('body-parser')
const cors=require('cors')
const helmet = require('helmet')

const sequelize=require('./util/database')
const userRoutes=require('./routes/user')
const chatRoutes=require('./routes/chats')
const groupsRoutes=require('./routes/groups')

const Users=require('./models/users')
const Chats=require('./models/chats')
const Groups = require('./models/groups')

const app=express();

app.use(cors())
app.use(helmet())

app.use(bodyParser.json({extended:false}))
app.use(bodyParser.urlencoded({extended:false}))

app.use(userRoutes)
app.use(chatRoutes)
app.use(groupsRoutes)

Users.hasMany(Chats)
Chats.belongsTo(Users)

Users.hasMany(Groups)
Groups.belongsTo(Users)

Groups.hasMany(Chats)
Chats.belongsTo(Groups)

sequelize
// .sync({ force: true })
.sync()
.then(response=>{
    console.log(response)
    app.listen(process.env.PORT , ()=>console.log("Server started running on Port: 3000"))
}).catch(err=>console.log(err))
