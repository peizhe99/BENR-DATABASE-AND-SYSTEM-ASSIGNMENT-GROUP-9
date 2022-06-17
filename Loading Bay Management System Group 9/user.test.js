const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.x8o3y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("Register Management", async () => {
		const res = await User.registerManagement("test", "test")
		expect(res).toEqual(
            expect.arrayContaining([
            {
              	_id : expect.anything(),
                username: expect.any(String),
              	password: expect.any(String)
            }
			])
        )
	});

	test("Register Management fail", async () => {
		const res = await User.registerManagement("test", "test")
		expect(res).toEqual(
        expect.any(String))
	});

    test("Register Company", async () => {
		const res = await User.registerCompany("test", "test","email")
		expect(res).toEqual(
            expect.arrayContaining([
            {
              	_id : expect.anything(),
                username: expect.any(String),
              	password: expect.any(String),
                email: expect.any(String)
            }
			])
        )
	});

    test("Register Company fail", async () => {
		const res = await User.registerCompany("test", "test","email")
		expect(res).toEqual(
        expect.any(String))
	});

    test("Register Worker", async () => {
		const res = await User.registerWorker("test", "test","0987")
		expect(res).toEqual(
            expect.arrayContaining([
            {
              	_id : expect.anything(),
                username: expect.any(String),
              	password: expect.any(String),
                phone_number: expect.any(String)
            }
			])
        )
	});

    test("Register worker fail", async () => {
		const res = await User.registerWorker("test", "test","0987")
		expect(res).toEqual(
        expect.any(String))
	});

    test("Login Management", async () => {
		const res = await User.loginManagement("test", "test")
		expect(res).toEqual(
            expect.arrayContaining([
            {
              	_id : expect.anything(),
                username: expect.any(String),
              	password: expect.any(String)
            }
			])
        )
	});

      test("Login Management fail password incorrect", async () => {
		const res = await User.loginManagement("test", "tset")
		expect(res).toEqual("password incorrect")
	});

    test("Login Management fail invalid username", async () => {
		const res = await User.loginManagement("tset", "tset")
		expect(res).toEqual("Invalid username")
	});

    test("Login Company", async () => {
		const res = await User.loginCompany("test", "test")
		expect(res).toEqual(
            expect.arrayContaining([
            {
              	_id : expect.anything(),
                username: expect.any(String),
              	password: expect.any(String),
                email: expect.any(String)
            }
			])
        )
	});

    test("Login Company fail password incorrect", async () => {
		const res = await User.loginCompany("test", "tset")
		expect(res).toEqual("password incorrect")
	});

    test("Login Company fail invalid username", async () => {
		const res = await User.loginCompany("tset", "test")
		expect(res).toEqual("Invalid username")
	});

    test("Login Worker", async () => {
		const res = await User.loginWorker("test", "test")
		expect(res).toEqual(
            expect.arrayContaining([
            {
              	_id : expect.anything(),
                username: expect.any(String),
              	password: expect.any(String),
                phone_number: expect.any(String)
            }
			])
        )
	});

    test("Login Worker fail password incorrect", async () => {
		const res = await User.loginWorker("test", "tset")
		expect(res).toEqual("password incorrect")
	});

    test("Login Worker fail invalid username", async () => {
		const res = await User.loginWorker("tset", "test")
		expect(res).toEqual("Invalid username")
	});

    test("Delete Worker", async () => {
		const res = await User.deleteWorker("test")
		expect(res).toEqual("Worker deleted successfully")
	});

    test("Delete Worker fail", async () => {
		const res = await User.deleteWorker("test1")
		expect(res).toEqual("Worker does not exist")
    });

    test("Create Product", async () => {
		const res = await User.product("test", "test",1)
		expect(res).toEqual(
            expect.arrayContaining([
            {
              	_id : expect.anything(),
                product_name: expect.any(String),
              	status: expect.any(String),
                quantity: expect.any(Number)
            }
			])
        )
	});

    test("Create product fail", async () => {
		const res = await User.product("test", "test",1)
		expect(res).toEqual("Product already exists")
	});

    test("Update Product", async () => {
		const res = await User.updateProduct("test", "tset",2)
		expect(res).toEqual(
            expect.arrayContaining([
            {
              	_id : expect.anything(),
                product_name: expect.any(String),
              	status: expect.any(String),
                quantity: expect.any(Number)
            }
			])
        )
	});

    test("Update product fail", async () => {
		const res = await User.updateProduct("test1", "test",2)
		expect(res).toEqual("Product does not exist")
	});

       test("View Product", async () => {
		const res = await User.viewProduct()
		expect(res).toEqual(
            expect.arrayContaining([
            {
              	_id : expect.anything(),
                product_name: expect.any(String),
              	status: expect.any(String),
                quantity: expect.any(Number)
            }
			])
        )
	});

        test("Delete Product", async () => {
		const res = await User.deleteProduct("test")
		expect(res).toEqual("Product deleted successfully")
	});

    test("Delete Product fail", async () => {
		const res = await User.deleteProduct("test1")
		expect(res).toEqual("Product does not exist")
    });


    test("Login Day", async () => {
		const res = await User.loginday("Friday")
		expect(res).toEqual(
			expect.any(Number)
		)
	});

	test("Login Day Invalid Input", async () => {
		const res = await User.loginday("Frday")
		expect(res).toEqual(
			expect.any(String)
		)
	});


});