var request = require('request');
var cheerio = require('cheerio');

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

var userInput1 = 'sho';
	
request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=' + userInput1 + '&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		//------gives me the list of all names but also some 'google ad client' stuff
		// $('td').children().children().children().children().each(function(i, element) {
			$('div.pinkwide0').children().children().each(function(i, element) {
				var a = $(this);
				console.log(a.text());
			});
			// $('div.pinkwide1').children().children().each(function(i, element) {
			// 	var a = $(this).text();
			// 	// console.log(a.text());
			// 	console.log(a);
			// });
			// $('div.pinkwide1').children().children().each(function(i, element) {
			// 	var a = $(this);
			// 	console.log(a.text());
			// });
	};
});

var userInput2 = 'sha';
request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=' + userInput2 + '&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		//------gives me the list of all names but also some 'google ad client' stuff
		// $('td').children().children().children().children().each(function(i, element) {
			// $('div.pinkwide0').children().children().each(function(i, element) {
			// 	var a = $(this);
			// 	console.log(a.text());
			// });
			$('div.pinkwide1').children().children().each(function(i, element) {
				var a = $(this).text();
				// console.log(a.text());
				console.log(a);
			});
			// $('div.pinkwide1').children().children().each(function(i, element) {
			// 	var a = $(this);
			// 	console.log(a.text());
			// });
	};
});

	
// }



// request('http://www.baby-names-and-stuff.com/search/?advanced=1&criteria=3&minletter=0&maxletter=0&srchtype=0&orgn=&gndr=0&q=z&button.x=0&button.y=0&button=Sign+In', function(error, response, html) {
// 	if (!error && response.statusCode == 200) {
// 		var $ = cheerio.load(html);
// 		//------gives me the list of all names but also some 'google ad client' stuff
// 		// $('td').children().children().children().children().each(function(i, element) {
// 			$('a').children().each(function(i, element) {
// 				var a = $(this);
// 				console.log(a.text());
// 			});
// 	}
// });



// request('https://news.ycombinator.com', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var $ = cheerio.load(html);
//     var parsedResults = [];
//     $('span.comhead').each(function(i, element){
//       // Select the previous element
//       var a = $(this).prev();
//       // Get the rank by parsing the element two levels above the "a" element
//       var rank = a.parent().parent().text();
//       // Parse the link title
//       var title = a.text();
//       // Parse the href attribute from the "a" element
//       var url = a.attr('href');
//       // Get the subtext children from the next row in the HTML table.
//       var subtext = a.parent().parent().next().children('.subtext').children();
//       // Extract the relevant data from the children
//       var points = $(subtext).eq(0).text();
//       var username = $(subtext).eq(1).text();
//       var comments = $(subtext).eq(2).text();
//       // Our parsed meta data object
//       var metadata = {
//         rank: parseInt(rank),
//         title: title,
//         url: url,
//         points: parseInt(points),
//         username: username,
//         comments: parseInt(comments)
//       };
//       // Push meta-data into parsedResults array
//       parsedResults.push(metadata);
//     });
//     // Log our finished parse results in the terminal
//     console.log(parsedResults);
//   }
// });