
/*
	Author: Aaiz
	Date: January 16, 2017
*/
var quotes = [

	"Don't cry because it's over, smile because it happened.",

	 "Be yourself; everyone else is already taken.",

	 "A room without books is like a body without a soul.",

	 "The moral arc of the universe bends at the elbow of justice.",

	 "Defeat may serve as well as victory to shake the soul and let the glory out.",

	 "Dreams and dedication are a powerful combination.",

	 "Each time we face our fear, we gain strength, courage and confidence in the doing."
];

var quoteAuthor = [

	"Dr. Seuss", "Oscar Wilde", "Marcus Tullius Cicero", "Martin Luther King, Jr.",

	"Edwin Markham", "William Longgood", "Theodore Roosevelt"
];

function randomQuote() 
{
  var index = Math.floor( Math.random() * (quotes.length - 0) ) + 0;

	$('#quote').text( quotes[index] );
    $('#author').text( quoteAuthor[index] );
}

function tweetIt () 
{
  var text = document.getElementById('quote').innerText;
  var tweetUrl = 'https://twitter.com/share?text=' +
    encodeURIComponent(text) +
    '&url=' + 'http://codepen.io/AaizAhmed/';
  
  window.open(tweetUrl);
}

 randomQuote() ;
