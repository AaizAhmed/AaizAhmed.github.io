
/*
	Author: Aaiz
	Date: April 19, 2017
*/
var quotes = [

	"Michelle is a great girl and has a big heart. | Friend",

   "Michelle is a very caring person and wants to help out. | Classmate",

   "Michelle is a beautiful gal with sexy lips and attractive eyes. | Baltimore Sun",

   "Michelle's smile will make your day. | Anonymous", 

   "Michelle has a great sense of humor. Sometimes I can't stop laughing. | Aaiz",

   "Michelle is a beauty queen. | Anonymous",

   "Anywhere Michelle goes people line up to get her autograph and guys turn around " + 
   "to have a glimpse of her beauty. | People Magazine",

   "I will defiantly use Michelle as a model for the clothes that I design. She is very beautiful, " + 
   "confident and will be great for my brand.  | A Fashion Show Designer",

   "Michelle has sexy lips and a great figure, we would love to do a photoshoot with her. | Playboy",
   
   "Playboy edition featuring Michelle will sell like hot cake! | Playboy",
   
   "Michelle is very kind hearted. | Friend",
   
   "Michelle is very smart and one of my best student. | Professor",
   
   "Michelle can do anything she wants in life, she is funny, smart and confident. " +
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
  var tweetUrl = 'https://twitter.com/share?text=' +
    encodeURIComponent(text) +
    '&url=' + '\nMichelle';
  
  window.open(tweetUrl);
}

 randomQuote() ;
