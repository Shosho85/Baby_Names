var expect = require('chai').expect;
		request = require('request');

	describe('user', function() {

		describe('GET /users', function() {
			it('returns status code of 200', function(done) {
				request({
					uri: 'http://localhost:3000/users',
					method: 'GET'
				},
				function(error, resonse, body) {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});

			it('returns an array', function(done) {
				request({
					uri: 'http://localhost:3000/users', 
					method: 'GET'
				},
				function(error, response, body) {
					var users = JSON.parse(body);
					expect(users).to.be.an('array');
					done();
				});
			});
		});

		describe('GET /babynames', function() {
			it('returns status code of 200', function(done) {
				request({
					uri: 'http://localhost:3000/babynames',
					method: 'GET'
				},
				function(error, response, body) {
					expect(response. statusCode).to.equal(200);
					done();
				});
			});

			it('returns an array', function(done) {
				request({
					uri: 'http://localhost:3000/babynames',
					method: 'GET'
				},
				function(error, response, body) {
					var babynames = JSON.parse(body);
					expect(babynames).to.be.an('array');
					done();
				});
			});
		});
	});