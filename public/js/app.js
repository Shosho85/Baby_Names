var signupTemplate;
var loginTemplate;
var userTemplate;

$(function() {
	signupTemplate = Handlebars.compile($('#signup-template').html());
	loginTemplate = Handlebars.compile($('#login-template').html());
	userTemplate = Handlebars.compile($('#user-template').html());

	fetchAndRenderUsers();
	fetchAndRenderSession();

	$('body').on('click', '#signup-button', signupUser);
	$('body').on('click', '#login-button', login);

	// $('body').on('click', '#search-button', executeSearch);
});

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
var userInput = 'sho';
	
	request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=' + userInput + '&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			//------gives me the list of all names but also some 'google ad client' stuff
			// $('td').children().children().children().children().each(function(i, element) {
				$('div.pinkwide0').children().children().each(function(i, element) {
					var a = $(this);
					console.log(a.text());
				});
				$('div.pinkwide1').children().children().each(function(i, element) {
					var a = $(this).text();
					// console.log(a.text());
					console.log(a);
				});
				// $('div.pinkwide1').children().children().each(function(i, element) {
				// 	var a = $(this);
				// 	console.log(a.text());
				// });
		}
	});



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
}