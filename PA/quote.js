
/*
	Author: Aaiz
	Date: April 19, 2017
*/
var quotes = [

	"Portia is a great girl and has a big heart. | Friend",

   "Portia is a very caring person and wants to help out. | Classmate",

   "Portia is a beautiful gal with sexy lips and attractive eyes. | Baltimore Sun",

   "Portia's smile will make your day. | Anonymous", 

   "Portia has a great sense of humor. Sometimes I can't stop laughing. | Aaiz",

   "Portia is a beauty queen. | Anonymous",

   "Anywhere Portia goes people line up to get her autograph and guys turn around " + 
   "to have a glimpse of her beauty. | People Magazine",

   "I will defiantly use Portia as a model for the clothes that I design. She is very beautiful, " + 
   "confident and will be great for my brand.  | A Fashion Show Designer",

   "Portia has sexy lips and a great figure, we would love to do a photoshoot with her. | Playboy",
   
   "Playboy edition featuring Portia will sell like hot cakes! | Playboy",
   
   "Portia is very kind hearted. | Friend",
   
   "Portia is very smart and one of my best student. | Professor",
   
   "Portia can do anything she wants in life, she is funny, smart and confident. " +
   "She may even have a great future is public service. | New York Times" 

];

function randomQuote() 
{
  var index = Math.floor( Math.random() * (quotes.length - 0) ) + 0;

  var quoteText = quotes[index].split('|');

	$('#quote').text( quoteText[0] );
   $('#author').text( quoteText[1] );
}

function tweetIt () 
{
  var text = document.getElementById('quote').innerText;
  var author = document.getElementById('author').innerText;
  var tweetUrl = 'https://twitter.com/share?text=' +
    encodeURIComponent(text) +
    '&url=' + author;
  
  window.open(tweetUrl);
}

 randomQuote() ;
