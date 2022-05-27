const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.yotw3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
var bodyParser = require("body-parser");
const User = require("./user.js");


client.connect(async err => {
    if(err){
        console.log(err.message)
        return
    }
     console.log('Connected to MongoDB')
     await User.injectDB(client);


const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// const database = await client.db('datass').collection("company")
// await database.find({"username":"user"}).toArray().then(data => { 
//     console.log(data)
// });


app.get('/', (req, res) => {
	res.send('Loading Bay Management System')
})

app.get('/register', (req,res) => {
    res.send('Register New User')
})

app.post('/register', async(req, res) => {
    //const { username, password } = req.body
    const reg = await User.register(req.body.username, req.body.password)
    res.status(200).json(reg)
})

app.get('/login', (req,res) => {
    res.send('Login')
})
app.post('/login', async(req, res, next) => {
    //const { username, password } = req.body
    const log = await User.login(req.body.username, req.body.password)
    res.status(200).json(log)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});

})
