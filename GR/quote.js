
/*
	Author:  Aaiz
	Date:    April 19, 2017
        Updated: Jan 14, 2018 for Mi Amor :)
*/
var quotes = [

	 "Gabriela is a great girl and has a big heart. | Friend",

   "Gabriela likes to dance and hangout with friends. | Anonymous",

   "Gabriela is a very caring person and wants to help out. | Classmate",

   "Gabriela is a beautiful gal with sexy lips and attractive eyes. | Baltimore Sun",

   "Gabriela's smile will make your day. | Anonymous", 

   "Gabriela has a great sense of humor. Sometimes I can't stop laughing. | Aaiz",

   "Gabriela is a beauty queen. | Anonymous",

   "Anywhere Gabriela goes people line up to get her autograph and guys turn around " + 
   "to have a glimpse of her beauty. | People Magazine",

   "I will defiantly use Gabriela as a model for the clothes that I design. She is very beautiful, " + 
   "confident and will be great for my brand.  | A Fashion Show Designer",

   "Gabriela has sexy lips and a great figure, we would love to do a photoshoot with her. | Playboy",
   
   "Playboy edition featuring Gabriela will sell like hot cakes! | Playboy",
   
   "Gabriela is very kind hearted. | Friend",
   
   "Gabriela is very smart and one of my best student. | Professor",
   
   "Gabriela can do anything she wants in life, she is funny, smart and confident. " +
   "She may even have a great future is public service. | New York Times" 

];

function randomQuote() 
{
  var index = Math.floor(Math.random() * quotes.length);

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
