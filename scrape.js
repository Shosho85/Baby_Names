var request = require('request');
var cheerio = require('cheerio');
var models = require('./models');
var Babyname = models.babynames;

// request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=sho&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
// 	if (!error && response.statusCode == 200) {
// 		var $ = cheerio.load(html);
// 		//------gives me the list of all names but also some 'google ad client' stuff
// 		// $('td').children().children().children().children().each(function(i, element) {
// 			$('div').children().children().children().each(function(i, element) {
// 				var a = $(this);
// 				console.log(a.text());
// 			});
// 	}
// });

// request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=sho&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
// 	if (!error && response.statusCode == 200) {
// 		var $ = cheerio.load(html);
// 		//------gives me the list of all names but also some 'google ad client' stuff
// 		// $('td').children().children().children().children().each(function(i, element) {
// 			$('td').children().next().next().next().next().children().children().each(function(i, element) {
// 				var a = $(this);
// 				console.log(a.text());
// 			});
// 	}
// });
// $(function() {
// 	$('body').on('click', '#search-input', executeSearch);
// })

// var executeSearch = function() {
// 	var userInput = $('#search-input').val();




//---------WORKS
//-----Able to put names into the datatables
// var userInput1 = 'mika';
	
// request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=' + userInput1 + '&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
// 	if (!error && response.statusCode == 200) {
// 		var $ = cheerio.load(html);
// 		//------gives me the list of all names but also some 'google ad client' stuff
// 		// $('td').children().children().children().children().each(function(i, element) {
// 			$('div.pinkwide0').children().children().each(function(i, element) {
// 				var a = $(this);
// 				var name = a.text().trim();
// 				if (name.length) {
// 					Babyname
// 						.create({
// 							babyname: name
// 						});
// 				} 
// 			});
// 	};
// });




//--------------------------------
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
// 				var a = $(this);
// 				// console.log(a.text());
// 				var name = a.text().trim();
// 				if (name.length) {
// 					Babyname
// 						.create({
// 							babyname: name
// 						});
// 				}
// 			});
// 	};
// });


// var userInput1 = 'sha';

// request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=' + userInput1 + '&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
// 	if (!error && response.statusCode == 200) {
// 		var $ = cheerio.load(html);
// 		//------gives me the list of all names but also some 'google ad client' stuff
// 		// $('td').children().children().children().children().each(function(i, element) {
// 			$('div.pinkwide0').children().children().each(function(i, element) {
// 				var a = $(this);
// 				var name = a.text().trim();
// 				console.log(name); 
// 			});
// 	};
// });

var userInput1 = 'sha';

request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=' + userInput1 + '&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		//------gives me the list of all names but also some 'google ad client' stuff
		// $('td').children().children().children().children().each(function(i, element) {
			$('div.pinkwide0').next().next().children().next().next().each(function(i, element) {
				var a = $(this);
				var name = a.text().trim();
				console.log(name); 
			});
	};
});