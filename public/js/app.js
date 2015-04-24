var signupTemplate;
var loginTemplate;
var userTemplate;

$(function() {
	console.log('Loaded');

	// this.template = Handlebars.compile($('#babyname-template').html());

	$('body').on('click', '#search-button', searchName);
	$('body').on('click', '#signup-button', signupUser);
	$('body').on('click', '#login-button', login);

	signupTemplate = Handlebars.compile($('#signup-template').html());
	loginTemplate = Handlebars.compile($('#login-template').html());
	userTemplate = Handlebars.compile($('#user-template').html());

	fetchAndRenderUsers();
	fetchAndRenderSession();
	
});


//SEARCH NAME FUNCTION
// $(function() {
// 	console.log('Loaded the searchName function');
// 	$('body').on('click', '#search-button', searchName);

// });

// var searchName = function() {
// 	var userInput1 = $('#search-input').val();
// 	$.ajax({
// 		url: 'http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=' + userInput1,
// 		method: 'GET',
// 		dataType: 'jsonp'
// 	}).done(function(){
// 		if (!error && response.statusCode == 200) {
// 			var $ = cheerio.load(html);
// 			$('div.pinkwide1').children().children().each(function(i, element) {
// 				var a = $(this).text();
// 				// console.log(a.text());
// 				console.log(a);
// 			});
// 		}
// 	});
// };


var searchName = function() {

	// var userInput = $('#search-input').val();

		console.log('Trying to get the list of the babynames');

		var query = 'http://localhost:3000/babynames';

		$.ajax({
			url: query,
			method: 'GET',
			dataType: 'json',
			data: {
				'babyname': 'all'
			},
		})
		.then(function (babynames) {
			console.log(babynames);

			$('#namelist').append('LIST OF NAMES');
			
			for (var i = 0; i < 10; i++ ) {

				// Make an p tag with jQuery
				var p = $('<p>');

				// set the html of the p tag with jQuery to the babyname
				var names = (babynames[i].babyname);


				p.html(names);
				// if ($("(p:contains:sha)")) {
				// 	$('#namelist').append(p);
				// }
				// append the p tag to the body, using jQuery
				// (p).find('sho');

				$('#namelist').append(p);

			}

		});

		// .done(function(babyname) {
		// 	var lengths = $(babyname).map(function() {
		// 		return this.length;
		// 	});
		// 	// request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=' + userInput1 + '&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
		// 	// 	if (!error && response.statusCode == 200) {
		// 	// 		var $ = cheerio.load(html);
		// 	// 		//------gives me the list of all names but also some 'google ad client' stuff
		// 	// 		// $('td').children().children().children().children().each(function(i, element) {
		// 	// 			$('div.pinkwide0').children().children().each(function(i, element) {
		// 	// 				var a = $(this);
		// 	// 				var name = a.text().trim();
		// 	// 				console.log(name);
		// 	// 			});
		// 	// 	}
		// 	// });
		// });
};


//----------------------------------------------
//NOT SURE IF THIS EXECUTE FUNCTION WILL WORK
// var executeSearch = function() {

// 	var userInput = $('#search-input').val();
// 	$.get('/babynames').done(function(babynames) {

		
// 		request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=' + userInput + '&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
// 			if (!error && response.statusCode == 200) {
// 				var $ = cheerio.load(html);
// 				//------gives me the list of all names but also some 'google ad client' stuff
// 				// $('td').children().children().children().children().each(function(i, element) {
// 					$('div.pinkwide0').children().children().each(function(i, element) {
// 						var a = $(this);
// 						console.log(a.text());
// 					});
// 					$('div.pinkwide1').children().children().each(function(i, element) {
// 						var a = $(this);
// 						alert(a.text());
// 					});
// 					// $('div.pinkwide1').children().children().each(function(i, element) {
// 					// 	var a = $(this);
// 					// 	console.log(a.text());
// 					// });
// 			}
// 		});
// 	});
	
// };
//-----------------------------------------------


var fetchAndRenderUsers = function() {
	$.get('/users').done(renderUsers);
};

var renderUsers = function(users) {
	$('#users').empty();
	users.forEach(renderUser);
};

var renderUser = function(user) {
	$('#users').append(
		$('<li>').append(user.username + ' ' + user.password_digest));
};

var fetchAndRenderSession = function() {
  $.get('/current_user').done(function(user) {
    if (user) {
      $('#session').html(userTemplate(user));
    } else {
      $('#session').html(loginTemplate());
    }
  }).fail(function(jqXHR) {
    if (jqXHR.status === 404) {
      $('#session').html(loginTemplate());
    }
  });
};

var signupUser = function() {
	var username = $('#signup-username').val();
	var password = $('#signup-password').val();

	$.post('/users', {
		username: username,
		password: password
	})
	.done(function() {
		alert('Session!');
		$('#signup-username').val('');
		$('#signup-password').val('');
	})
	.fail(function() {
		alert('Fail');
	});
};


var login = function() {
	var username = $('#login-username').val();
	var password = $('#login-password').val();

	$.post('/sessions', {
		username: username,
		password: password
	}).done(fetchAndRenderSession).fail(function(response) {
		var err = response.responseJSON;
		alert(err.err + ' - ' + err.msg);
	});
};

var logout = function() {
	$.ajax({
		url: '/sessions', 
		method: 'DELETE',
	}).done(fetchAndRenderSession);
};



// var userInput1 = 'sho';
	
// request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=' + userInput1 + '&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
// 	if (!error && response.statusCode == 200) {
// 		var $ = cheerio.load(html);
// 		//------gives me the list of all names but also some 'google ad client' stuff
// 		// $('td').children().children().children().children().each(function(i, element) {
// 			$('div.pinkwide0').children().children().each(function(i, element) {
// 				var a = $(this);
// 				console.log(a.text());
// 			});
// 			// $('div.pinkwide1').children().children().each(function(i, element) {
// 			// 	var a = $(this).text();
// 			// 	// console.log(a.text());
// 			// 	console.log(a);
// 			// });
// 			// $('div.pinkwide1').children().children().each(function(i, element) {
// 			// 	var a = $(this);
// 			// 	console.log(a.text());
// 			// });
// 	};
// });

// var userInput2 = 'sha';
// request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=' + userInput2 + '&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
// 	if (!error && response.statusCode == 200) {
// 		var $ = cheerio.load(html);
// 		//------gives me the list of all names but also some 'google ad client' stuff
// 		// $('td').children().children().children().children().each(function(i, element) {
// 			// $('div.pinkwide0').children().children().each(function(i, element) {
// 			// 	var a = $(this);
// 			// 	console.log(a.text());
// 			// });
// 			$('div.pinkwide1').children().children().each(function(i, element) {
// 				var a = $(this).text();
// 				// console.log(a.text());
// 				console.log(a);
// 			});
// 			// $('div.pinkwide1').children().children().each(function(i, element) {
// 			// 	var a = $(this);
// 			// 	console.log(a.text());
// 			// });
// 	};
// });