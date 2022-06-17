const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.x8o3y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
var bodyParser = require("body-parser");
const User = require("./user.js");
const jwt = require("jsonwebtoken");

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

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger API',
            version: '1.0.0',
        },
        components:{
            securitySchemes:{
                jwt:{
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header',
                    bearerFormat: 'JWT'
                }
            },
            security:[
                {
                    "jwt":[]
                }
            ]
        }
    },
    apis: ['./main.js'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

function generateAccessToken(payload) {
    return jwt.sign(payload,"super-max", {expiresIn: '1y'}); 
}

app.get('/', (req, res) => {
	res.send('Loading Bay Management System')
})

app.get('/registerManagement', (req,res) => {
    res.send('Register New Management')
})


app.get('/registerCompany', (req,res) => {
    res.send('Register New Company')
})

app.get('/registerWorker', (req,res) => {
    res.send('Register New Worker')
})

/**
 * @swagger
 * /registerManagement:
 *   post:
 *     description: Register Management
 *     tags: [Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Management Registered
 *       400:
 *         description: Username already exists
 */
app.post('/registerManagement', async(req, res) => {
    const reg = await User.registerManagement(req.body.username, req.body.password)
    if (reg == 'username already exists'){
        res.status(400).send(reg)}
    else{
        res.status(200).json(reg)
    }
})

/**
 * @swagger
 * /registerCompany:
 *   post:
 *     description: Register Company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company Registered
 *       400:
 *         description: Username already exists
 */
app.post('/registerCompany', async(req, res) => {
    const reg = await User.registerCompany(req.body.username, req.body.password, req.body.email)
    if (reg == 'username already exists'){
        res.status(400).send(reg)}
    else{
        res.status(200).json(reg)
    }
})

app.get('/loginCompany', (req,res) => {
    res.send('Login')
})

app.get('/loginManagement', (req,res) => {
    res.send('Login')
})

app.get('/loginWorker', (req,res) => {
    res.send('Login')
})

/**
 * @swagger
 * /loginManagement:
 *   post:
 *     description: Login Management
 *     tags: [Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Management Login Successful
 *       400:
 *         description: Username does not exists
 */
app.post('/loginManagement', async(req, res, next) => {
    //const { username, password } = req.body
    const log = await User.loginManagement(req.body.username, req.body.password)
    if (log == "password incorrect" || log == "Invalid username"){
        res.status(400).send(log)
    }
    else {
    res.status(200).json([{
        _id: log[0]._id,
        username: log[0].username,
        token: generateAccessToken({ username: log[0].username, role: "management" })
    }])}
})

/**
 * @swagger
 * /loginCompany:
 *   post:
 *     description: Login Company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company Login Successful
 *       400:
 *         description: Username does not exists
 */
app.post('/loginCompany', async(req, res, next) => {
    //const { username, password } = req.body
    const log = await User.loginCompany(req.body.username, req.body.password)
    if (log == "password incorrect" || log == "Invalid username"){
        res.status(400).send(log)
    }
    else {
    res.status(200).json([{
        _id: log[0]._id,
        username: log[0].username,
        email: log[0].email,
        token: generateAccessToken({ username: log[0].username, role: "company" })
    }])}
})

/**
 * @swagger
 * /loginWorker:
 *   post:
 *     description: Login Worker
 *     tags: [Worker]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Worker Login Successful
 *       400:
 *         description: Username does not exists
 */
app.post('/loginWorker', async(req, res, next) => {
    //const { username, password } = req.body
    const log = await User.loginWorker(req.body.username, req.body.password)
    if (log == "password incorrect" || log == "Invalid username"){
        res.status(400).send(log)
    }
    else {
    res.status(200).json([{
        _id: log[0]._id,
        username: log[0].username,
        phone_number: log[0].phone_number,
        day: log[0].day
    }])}
})

app.use((req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, 'super-max', (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
    });

/**
 * @swagger
 * /registerWorker:
 *   post:
 *     security:
 *       - jwt: []
 *     description: Register Worker
 *     tags: [Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Worker Registerd
 *       400:
 *         description: Username already exists
 */
app.post('/registerWorker', async(req, res) => {
    if(req.user.role=='management'){
        const reg = await User.registerWorker(req.body.username, req.body.password,req.body.phone_number)
        if (reg == 'username already exists'){
            res.status(400).send(reg)}
        else{
            res.status(200).json(reg)
        }}
    else {
        res.status(403).send('Unauthorised')}
    }
    )

/**
 * @swagger
 * /viewProduct:
 *   get:
 *     security:
 *       - jwt: []
 *     description: View Products
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: View Products
 */
app.get('/viewProduct', async(req, res) => {
    if(req.user.role=='company'){
        const pro = await User.viewProduct();
        res.status(200).json(pro);
    }
    else {
        res.status(403).send('Unauthorised')}
    }
)

/**
 * @swagger
 * /product:
 *   post:
 *     security:
 *       - jwt: []
 *     description: Create Product
 *     tags: [Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               status:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product Registerd
 *       400:
 *         description: Product already exists
 */
app.post('/product', async(req, res) => {
    if(req.user.role=='management'){
    const reg = await User.product(req.body.product_name, req.body.status,req.body.quantity)
    if (reg == "Product already exists"){
        res.status(400).send(reg)
    }
    else {
    res.status(200).json(reg)}
}
else res.status(403).send("Unauthorised")
})

/**
 * @swagger
 * /productUpdate:
 *   patch:
 *     security:
 *       - jwt: []
 *     description: Create Product
 *     tags: [Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               status:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product Updated
 *       400:
 *         description: Product does not exists
 */
app.patch('/productUpdate', async(req, res) => {
    if(req.user.role=='management'){
    const info = await User.updateProduct(req.body.product_name, req.body.status,req.body.quantity)
    if (info == "Product does not exist"){
        res.status(400).send(info)
    }
    else {
    res.status(200).json(info)
    }}
    else res.status(403).send("Unauthorised")
})

/**
 * @swagger
 * /deleteProduct:
 *   delete:
 *     security:
 *       - jwt: []
 *     description: Delete Product
 *     tags: [Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product Deleted
 *       400:
 *         description: Product does not exists
 */
app.delete('/deleteProduct', async(req, res) => {
    if(req.user.role=='management'){
    const info = await User.deleteProduct(req.body.product_name)
    if (info == "Product does not exist"){
        res.status(400).send(info)
    }
    else if(info == "Product deleted successfully"){
    res.status(200).send(info)
    }}
    else res.status(403).send("Unauthorised")
})

/**
 * @swagger
 * /deleteWorker:
 *   delete:
 *     security:
 *       - jwt: []
 *     description: Delete Worker
 *     tags: [Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Worker Deleted
 *       400:
 *         description: Worker does not exists
 */
app.delete('/deleteWorker', async(req, res) => {
    if(req.user.role=='management'){
    const info = await User.deleteWorker(req.body.username)
    if (info == "Worker does not exist"){
        res.status(400).send(info)
    }
    else if(info == "Worker deleted successfully"){
    res.status(200).send(info)
    }}
    else res.status(403).send("Unauthorised")
})

/**
 * @swagger
 * /loginday:
 *   post:
 *     security:
 *       - jwt: []
 *     description: Number of workers logged in
 *     tags: [Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *     responses:
 *       200:
 *         description: Number of workers logged in
 */
app.post('/loginday', async(req, res) => {
    if(req.user.role=='management'){
    const reg = await User.loginday(req.body.day)
    if(reg == "Invalid Input"){
        res.status(400).send("Invalid Input")
    }else
    res.status(200).json(reg)
}
else res.status(403).send("Unauthorised")
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});

})