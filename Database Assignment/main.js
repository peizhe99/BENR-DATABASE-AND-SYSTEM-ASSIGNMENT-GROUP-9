const MongoClient = require("mongodb").MongoClient;
const User = require("./user");
const username = "user";
const password = "password";

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.yotw3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
	User.register(client,username, password);
	User.login(client,username, password);
})