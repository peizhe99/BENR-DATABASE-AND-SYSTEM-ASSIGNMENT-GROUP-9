const supertest = require('supertest');
const request = supertest('http://localhost:3000');
const token_user = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvYm8iLCJyb2xlIjoibWFuYWdlbWVudCIsImlhdCI6MTY1NTM5NjExMCwiZXhwIjoxNjg2OTUzNzEwfQ.BSfZzLosV_EbH_5STQ2CjDffFcCCcd8TtCJqWbG6K6w"
const token_comp = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvYm8iLCJyb2xlIjoiY29tcGFueSIsImlhdCI6MTY1NTM5NTYyNywiZXhwIjoxNjg2OTUzMjI3fQ.B8v60eJJJAukEqz6-DvZBPz9YCb69Wc99FwTuU4Cfsk"

describe('Express Route Test', function () {
	it('Register Management', async () => {
		return request
			.post('/registerManagement')
			.send({username: 'user', password: "password"})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual(
					expect.arrayContaining([
						{
							_id : expect.anything(),
							username: expect.any(String),
							password: expect.any(String)
						}
					])
				);
		});
	});

	it('Register Management fail', async () => {
		return request
			.post('/registerManagement')
			.send({username: 'user', password: "password"})
			.expect('Content-Type', /text/)
			.expect(400).then(res => {
				expect(res.text).toEqual(
					expect.any(String)
					)}
				);
		});
	


	it('Register Company', async () => {
		return request
			.post('/registerCompany')
			.send({username: 'user', password: "password", email:"s"})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual(
					expect.arrayContaining([
						{
							_id : expect.anything(),
							username: expect.any(String),
							password: expect.any(String),
							email: expect.any(String)
						}
					])
				);
		});
	});
	
	it('Register Company fail', async () => {
		return request
			.post('/registerCompany')
			.send({username: 'user', password: "password"})
			.expect('Content-Type', /text/)
			.expect(400).then(res => {
				expect(res.text).toEqual(
					expect.any(String)
					)}
				);
		});
	

	it('Register Worker', async () => {
		return request
			.post('/registerWorker')
			.set("authorization", token_user)
			.send({username: 'user', password: "password" , phone_number:"0987654321"})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual(
					expect.arrayContaining([
						{
							_id : expect.anything(),
							username: expect.any(String),
							password: expect.any(String),
							phone_number: expect.any(String)
						}
					]

					)
				);
		});
	});

	it('Register Worker fail', async () => {
		return request
			.post('/registerWorker')
			.set("authorization", token_user)
			.send({username: 'user', password: "password"})
			.expect('Content-Type', /text/)
			.expect(400).then(res => {
				expect(res.text).toEqual(
					expect.any(String)
					)}
				);
		});
	
		it('Login Management', async () => {
			return request
				.post('/loginManagement')
				.send({username: 'user', password: "password"})
				.expect('Content-Type', /json/)
				.expect(200).then(res => {
					expect(res.body).toEqual(
						expect.arrayContaining([
							{
								_id : expect.anything(),
								username: expect.any(String),
								token : expect.anything(String)
							}
						])
					);
			});
		});

			it('Login Management fail', async () => {
		return request
			.post('/loginManagement')
			.send({username: 'user1', password: "password"})
			.expect('Content-Type', /text/)
			.expect(400).then(res => {
				expect(res.text).toEqual(
					expect.any(String)
					)}
				);
		});

		it('Login Company', async () => {
			return request
				.post('/loginCompany')
				.send({username: 'user', password: "password"})
				.expect('Content-Type', /json/)
				.expect(200).then(res => {
					expect(res.body).toEqual(
						expect.arrayContaining([
							{
								_id : expect.anything(),
								username: expect.any(String),
								email: expect.any(String),
								token : expect.anything(String)
							}
						])
					);
			});
		});

		it('Login Company fail', async () => {
			return request
				.post('/loginCompany')
				.send({username: 'user1', password: "password"})
				.expect('Content-Type', /text/)
				.expect(400).then(res => {
					expect(res.text).toEqual(
						expect.any(String)
						)}
					);
			});

			it('Login Worker', async () => {
				return request
					.post('/loginWorker')
					.send({username: 'user', password: "password"})
					.expect('Content-Type', /json/)
					.expect(200).then(res => {
						expect(res.body).toEqual(
							expect.arrayContaining([
								{
									_id : expect.anything(),
									username: expect.any(String),
									phone_number: expect.any(String)
								}
							])
						);
				});
			});
	
			it('Login Worker fail', async () => {
				return request
					.post('/loginManagement')
					.send({username: 'user1', password: "password"})
					.expect('Content-Type', /text/)
					.expect(400).then(res => {
						expect(res.text).toEqual(
							expect.any(String)
							)}
						);
				});

			it('Product', async () => {
			return request
			.post('/product')
			.set("authorization", token_user)
			.send({product_name: 'a', status: "load", quantity: 1})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual(
					expect.arrayContaining([
				{
					_id : expect.anything(),
					product_name: expect.any(String),
					status: expect.any(String),
					quantity: expect.any(Number)
				}])
				);
		});
	});

	it('Product register fail', async () => {
		return request
		.post('/product')
		.set("authorization", token_user)
		.send({product_name: 'a', status: "load", quantity: 1})
		.expect('Content-Type', /text/)
		.expect(400).then(res => {
				expect(res.text).toEqual(
					expect.any(String)
			);
		});
	});

		it('Product Update', async () => {
			return request
			.patch('/productUpdate')
			.set("authorization", token_user)
			.send({product_name:'a', status:"unload", quantity:0})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual(
					expect.arrayContaining([
				{
					_id : expect.anything(),
					product_name: expect.any(String),
					status: expect.any(String),
					quantity: expect.any(Number)
				}])
				);
		});
	});

		it('Product update fail', async () => {
		return request
		.patch('/productUpdate')
		.set("authorization", token_user)
		.send({product_name: 'b', status: "load", quantity: 1})
		.expect('Content-Type', /text/)
		.expect(400).then(res => {
				expect(res.text).toEqual(
					expect.any(String)
			);
		});
	});

		it('Delete Product', async () => {
		return request
		.delete('/deleteProduct')
		.set("authorization", token_user)
		.send({product_name: 'a'})
		.expect('Content-Type', /text/)
		.expect(200).then(res => {
				expect(res.text).toEqual(
					expect.any(String)
			);
		});
	});

	it('Delete Product fail', async () => {
		return request
		.delete('/deleteProduct')
		.set("authorization", token_user)
		.send({product_name: 'a1'})
		.expect('Content-Type', /text/)
		.expect(400).then(res => {
				expect(res.text).toEqual(
					expect.any(String)
			);
		});
	});

			it('Delete Worker', async () => {
		return request
		.delete('/deleteWorker')
		.set("authorization", token_user)
		.send({username:"user"})
		.expect('Content-Type', /text/)
		.expect(200).then(res => {
				expect(res.text).toEqual(
					expect.any(String)
			);
		});
	});

	it('Delete Worker fail', async () => {
		return request
		.delete('/deleteWorker')
		.set("authorization", token_user)
		.send({username:"user1"})
		.expect('Content-Type', /text/)
		.expect(400).then(res => {
				expect(res.text).toEqual(
					expect.any(String)
			);
		});
	});

	it('View Product', async () => {
	return request
	.get('/viewProduct')
	.set("authorization", token_comp)
	.expect('Content-Type', /json/)
	.expect(200).then(res => {
		expect(res.body).toEqual(
			expect.arrayContaining([
			{
				_id : expect.anything(),
				product_name: expect.any(String),
				status: expect.any(String),
				quantity: expect.any(Number)
			}])
			);
		});
	});

	it('Login Day', async () => {
	return request
	.post('/loginday')
	.set("authorization", token_user)
	.send({day:"Friday"})
	.expect('Content-Type', /json/)
	.expect(200).then(res => {
		expect(res.body).toEqual(
			expect.any(Number)
			)
		});
	});

	it('Login Day invalid input', async () => {
		return request
		.post('/loginday')
		.set("authorization", token_user)
		.send({day:"Frday"})
		.expect('Content-Type', /text/)
		.expect(400).then(res => {
			expect(res.text).toEqual(
			expect.any(String)
					);
			});
		});
	

});


