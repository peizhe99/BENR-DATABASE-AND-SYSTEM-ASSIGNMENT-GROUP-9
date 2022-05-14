let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("datass").collection("company");
	}

	static async register(conn,username, password) {
		users = await conn.db("datass").collection("company");
		// TODO: Check if username exists
		//users.aggregate([{$match : { "username": username }},{$count:"username"}]).toArray().then(res =>{console.log(res);
		return users.find({username:username}).count().then(res =>{
		if (res==1){
			console.log("username already exists");
			return 1;
		}
		else if (res==0){
			console.log("New user registration");
			var newpassword = password.split("");
			var hashpass = [];
			for(let i = newpassword.length - 1; i >= 0; i--){
				//console.log(newpassword[i]);
				hashpass.push(password[i]);
			}
			//console.log(hashpass);
			var hashpass = hashpass.join("");
			// TODO: Hash password
			users.insertOne({username:username,password:hashpass});
			return 0;
			// TODO: Save user to database
		}});
		

		
	}

	static async login(conn,username, password) {
		users = await conn.db("datass").collection("company");
		// TODO: Check if username exists
		var newpassword = password.split("");
			var hashpass = [];
			for(let i = newpassword.length - 1; i >= 0; i--){
				hashpass.push(password[i]);
			}
			var hashpass = hashpass.join("");
			console.log(hashpass); 
		
		var ps= await users.find({"username":username,"password":hashpass}).count();
		return users.find({"username":username}).count().then(res =>{
		if (res==1){
			console.log("Hi "+username);
			//TODO: Validate password
			if (ps==1){
				console.log("Login succcessful!");
				return users.find({"username":username}).toArray();
				//TODO: Return user object
			}
			else {
				console.log("password incorrect");
				return 2;
			}
			
		}
		else if (res==0){
			console.log("Invalid username");
			return 0;
		}



		});
		
	}
}

module.exports = User;