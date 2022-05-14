const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.yotw3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register(client,"test", "test")
		expect(res).toBe(0)
	})

	test("Duplicate username", async () => {
		const res = await User.register(client,"test", "test")
		expect(res).toBe(1)
	})

	test("User login invalid username", async () => {
		const res = await User.login(client,"test", "test")
		expect(res).toBe(0)
	})

	test("User login invalid password", async () => {
		const res = await User.login(client,"test", "test")
		expect(res).toBe(2)
	})

	test("User login successfully", async () => {
		const res = await User.login(client,"test", "test")
		console.log (res)
		expect(res[0].username).toBe("test")
	})
});