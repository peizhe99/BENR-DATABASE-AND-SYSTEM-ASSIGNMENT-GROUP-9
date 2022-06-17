var md6 = require('md6-hash');
let users;
let manage;
let worker;
let products;
const dy = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

class User {
	static async injectDB(conn) {
		users = await conn.db("datass").collection("company");
		manage = await conn.db("datass").collection("management");
		worker = await conn.db("datass").collection("worker");
		products = await conn.db("datass").collection("product");
	}

	static async product(product_name, status,quantity) {
		return products.find({product_name:product_name}).count().then(async res =>{
		if (res==1){
			return "Product already exists";
		}
		else if (res==0){
		await products.insertOne({product_name:product_name,status:status,quantity:quantity});
		return await products.find({product_name:product_name}).toArray();
		//return "Product added successfully";
	}
		});
	}

	static async updateProduct(product_name,status,quantity){
		return products.find({product_name:product_name}).count().then(async res =>{
			if (res==1){
				await products.updateOne({product_name:product_name},{$set:{status:status,quantity:quantity}});
				return await products.find({product_name:product_name}).toArray();
		
			}
			else if (res==0){
				return "Product does not exist";
		}
			});
	}

	static async registerManagement(username, password) {
		// TODO: Check if username exists
		return manage.find({username:username}).count().then(async res =>{
		if (res==1){
			return "username already exists";
		}
		else if (res==0){
			var hashpass = md6(password);
			// TODO: Hash password
			await manage.insertOne({username:username,password:hashpass});
			return await manage.find({username:username}).toArray();
			//return "Management registered successfully";
			// TODO: Save user to database
		}});
		}

	static async registerCompany(username, password,email) {
		// TODO: Check if username exists
		return users.find({username:username}).count().then(async res =>{
		if (res==1){
			return "username already exists";
		}
		else if (res==0){
			var hashpass = md6(password);
			// TODO: Hash password
			await users.insertOne({username:username,password:hashpass,email:email});
			return await users.find({"username":username}).toArray();
			//return "Company registered successfully";
			// TODO: Save user to database
		}});	
	}

	static async registerWorker(username, password,phone_number) {
		// TODO: Check if username exists
		return worker.find({username:username}).count().then(async res =>{
		if (res>0){
			return "username already exists";
		}
		else{
			var hashpass = md6(password);
			// TODO: Hash password
			await worker.insertOne({username:username,password:hashpass,phone_number:phone_number});
			return await worker.find({"username":username}).toArray();
			//return "Worker registered successfully";
			// TODO: Save user to database
		}});	
	}

	static async loginManagement(username, password) {
		// TODO: Check if username exists
		var hashpass = md6(password);
		var ps= await manage.find({"username":username,"password":hashpass}).count();
		return manage.find({"username":username}).count().then(res =>{
		if (res==1){
			//TODO: Validate password
			if (ps==1){
				return manage.find({"username":username}).toArray();
				//TODO: Return user object
			}
			else {
				return "password incorrect";
			}
			
		}
		else if (res==0){
			return "Invalid username";
		}});
	}


	static async loginCompany(username, password) {
		// TODO: Check if username exists
		var hashpass = md6(password);
		var ps= await users.find({"username":username,"password":hashpass}).count();
		return users.find({"username":username}).count().then(res =>{
		if (res==1){
			//TODO: Validate password
			if (ps==1){
				return users.find({"username":username}).toArray();
				//TODO: Return user object
			}
			else {
				return "password incorrect";
			}
			
		}
		else if (res==0){
			return "Invalid username";
		}
		});
	}

	static async loginWorker(username, password) {
		// TODO: Check if username exists
		var hashpass = md6(password);
		var ps= await worker.find({"username":username,"password":hashpass}).count();
		var res = await worker.find({"username":username}).count();
		if (res==1){
			//TODO: Validate password
			if (ps==1){
				const d = new Date();
				let day = dy[d.getDay()];
				worker.updateOne({username:username},{$set:{"day":day}})
				return worker.find({"username":username}).toArray();
				//TODO: Return user object
			}
			else {
				return "password incorrect";
			}
			
		}
		else if (res==0){
			return "Invalid username";
		}};

	static async deleteWorker(username) {
			return worker.find({username:username}).count().then(res =>{
				if (res==1){
					worker.deleteOne({username:username});
					return "Worker deleted successfully";
				}
				else if (res==0){
					return "Worker does not exist";
			}
				});
		}
	

	static async viewProduct() {
		const pro = await products.find({}).toArray();
		return pro;
	}

	static async deleteProduct(product_name){
		return products.find({product_name:product_name}).count().then(res =>{
			if (res==1){
				products.deleteOne({product_name:product_name});
				return "Product deleted successfully";
			}
			else if (res==0){
				return "Product does not exist";
		}
			});
	}

	static async loginday(day){
		if(dy.includes(day)){
		const log = await worker.find({day:day}).count()
		return log;}
		else 
		return "Invalid Input"
	}
		
}

module.exports = User;