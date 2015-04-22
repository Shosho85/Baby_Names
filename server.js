var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var models = require('./models');
var session = require('express-session');
var bcrypt = require('bcrypt');

var User = models.users;
var Babyname = models.babynames;
var Description = models.descriptions;
// var Popularity = models.popularities;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.use(session({
	secret: 'nooneknows',
	saveUninitialized: false,
	resave: false
}));

var restrictAccess = function(req, res, next) {
	var sessionID = parseInt(req.session.currentUser);
	var reqID = parseInt(req.params.id);
	sessionsID === reqID ? next() : res.status(401).send({ err: 401, msg: 'You do not have access' });
};

var authenticate = function(req, res, next) {
	req.session.currentUser ? next() : res.status(400).send({err: 400, msg: 'Unauthorized User'});
};





//-----------endpoints for USERS----------------
//index
app.get('/users', function(req, res) {
	User
		.findAll({ include: [Babyname] })
		.then(function(users) {
			res.send(users);
		});
});

//show
app.get('/users/:id', function(req, res) {
	User
		.findOne({
			where: { id: req.params.id },
			include: [Babynames]
		})
		.then(function(userBabynames) {
			res.send(userBabynames);
		});
});

//create
app.post('/users', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	bcrypt.hash(password, 10, function(err, hash) {
		User
			.create({
				username: username,
				password_digest: hash
			})
			.then(function(user) {
				res.send(user);
			});
	});
});

app.put('/users/:id', function(req, res) {
	User
		.findOne(req.params.id)
		.then(function(users) {
			users
				.update(req.body)
				.then(function(updatedUser) {
					res.send(updatedUser);
				});
		});
});

//delete
app.delete('/users/:id', function(req, res) {
	User
		.findOne(req.params.id)
		.then(function(user) {
			user
				.destroy()
				.then(function(destroyedUser) {
					res.send(destroyedUser);
				});
		});
});
//--------------------------------------------------

//-----------endpoints for BABYNAMES----------------
//index
app.get('/babynames', function(req, res) {
	Babyname
		.findAll()
		.then(function(babynames) {
			res.send(babynames);
		});
});

//show
app.get('/babynames/:id', function(req, res) {
	Babyname
		.findOne({
			where: { id: req.params.id },
			include: [Description]
		})
		.then(function(babynameDescription) {
			res.send(babynameDescription.descriptions);
		});
});

//create
app.post('/babynames', function(req, res) {
	Babyname
		.create(req.body)
		.then(function(newBabyname) {
			console.log(newBabyname);
			res.send(newBabyname);
		});
});

//delete
app.delete('/babynames/:id', function(req, res) {
	Babyname
		.findOne(req.params.id)
		.then(function(babyname) {
			babyname
				.destroy()
				.then(function(destroyedBabyname) {
					res.send(desroyedBabyname);
				});
		});
});
//--------------------------------------------------



//---------SEEMS LIKE YOU DON'T NEED THIS
// app.get('/users/:id', authenticate, restrictAccess, function(req, res) {
// 	User
// 		.findOne({
// 			wehre: { id: req.params.id },
// 			include: [Babyname]
// 		})
// 		.then(function(user) {
// 			res.send(user);
// 		})
// });

app.get('/users/:id/babynames', authenticate, restrictAccess, function(req, res) {
	Post.findAll({
		where: { user_id: req.params.id }
	})
	.then(function(babynames) {
		res.send(babynames);
	});
});

app.post('/users/:id/babynames', authenticate, restrictAccess, function(req, res) {
	Babyname
	.create({
		user_id: req.params.id
	})
	.then(function(babyname) {
		res.send(babyname);
	});	
});

app.put('/users/:id/babynames', authenticate, restrictAccess, function(req, res) {
	User
		.findOne({
			where: { user_id: req.params.id },
			include: [ Babynames ]
		})
		.then(function(user) {
			user
				.update({
					username: req.body.username
				})
		})
})

//----------USER SESSION--------------

app.post('/sessions', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	User
		.findOne({ 
			where: { username: username }
		})
		.then(function(user) {
			if (user) {
				bcrypt.compare(password, user.password_digest, function(err, result) {
					if(result) {
						req.session.currentUser = user.id;
						res.send(user);
					} else {
						res.status(400);
						res.sed({ err: 400, msg: 'Wrong Password' }) ;
					}
				});
			} else {
				res.status(400);
				res.send({ err: 400, message: '' });
			}
		});
});


app.delete('/sessions', function(req, res) {
	delete req.session.currentUser;
	res.send('Successfully Logged Out');
});

app.get('/current_user', function(req, res) {
	var userID = req.session.currentUser;
	User.findOne(userID)
			.then(function(user) {
				res.send(user);
			});
});
//-------------------------------------






app.listen(3000, function() {
	console.log('Listening on port 3000...');
})