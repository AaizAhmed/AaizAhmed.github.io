/*
	Author: Aaiz N Ahmed
	Data: January 20, 2017
*/

function getInput ()
{
	$("#displayWiki").empty();

	//Get input value and remove spaces
	var str = document.getElementById('inputBox').value;	 
	var words = str.replace(/\s+/g, '');

	var wikiUrl = 'http://www.wikipedia.org/w/api.php?action=opensearch&search=';
	wikiUrl += words + '&limit=12&namespace=0&callback=getArticles';

	var tag = document.createElement("script");
	tag.src = wikiUrl;

	//Adding JS to the HTML header
	document.getElementsByTagName("head")[0].appendChild(tag);
}

function getArticles(data)
{
	//Moving button and text box to display articles.
	$("#randomArticle").css('margin-top', '1%');
	$("#box").css('margin-top', '1%');

	var titles = data[1];
	var desc = data[2];
	var urls = data[3];

	for(i in urls)
	{
		var display = '<a href="' + urls[i] + '" target="_blank">';
		display += '<div class="makeBox"><h4>' + titles[i] + '</h4><br>' + desc[i] + '</div>';
		display += '</a>';

		$('#displayWiki').append(display);
	}
}

function addInputBox()
{
	//Hide Search icon.
	$("#searchIcon").addClass('hide');

	 document.getElementById('inputBox').value = "";
	$("#inputWrapper").removeClass('hide');
}

function addButton()
{
	if ( document.getElementById("closeIcon") == null) 
	{
		//Creating a button
		var button = document.createElement("button");
	    button.innerHTML = "Clear";
		button.id = "closeIcon";
		$(button).addClass('btn btn-danger');

		//Adding trigger.
		$(button).click(addSearchIcon);

		//Adding the button
		$("#closeIconWrapper").append(button);
	}	
	else
	{
		$("#closeIconWrapper").removeClass('hide');
	}	
}

function addSearchIcon()
{
	//Hiding button and text box	
	$("#closeIconWrapper").addClass('hide');
	$("#inputWrapper").addClass('hide');
	$("#displayWiki").empty();
	$("#randomArticle").css('margin-top', '15%');

	$("#searchIcon").removeClass('hide');
}

document.addEventListener('DOMContentLoaded', function()
{
  if (window.location.protocol != "http:")
   {
        var msg = "To search for data you need to use HTTP.<br> Click here: ";
            msg += "<a target='_blank' href='http://codepen.io/AaizAhmed/full/bgqWKR/'>Wikipedia Viewer</a>";
     
     	$("#httpError").html(msg);
   }
  
	$(document).keyup(function (event) 
	{ 
		if ( $("#inputBox").is(":focus") ) 
		{  
			addButton();
		}		

		if( (event.keyCode == 13) ) 
		{
		    getInput();
		}
	});

});
