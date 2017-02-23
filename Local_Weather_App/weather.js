/*
	Author: Aaiz Ahmed
	Date: January 17, 2017
*/

function defaultWeather ()
{
	var key = '&APPID=e579c8ec4536594e206ab2b517e975af';    //D.C. ID: 4140963
    var url = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?id=4140963&units=imperial';
    url += key;
    
    $.getJSON(url, getDefaultWeather); 
}
    
function getDefaultWeather(data)	
{
	//Adding background image.
	var catogary = data["weather"][0]["main"];
	setBackground (catogary);

    //Adding Location
    $("#location").text(data["name"] + ', ' + data["sys"]["country"]);
	
	//Adding Temperature
	var temp = Math.round( data["main"]["temp"] );
	$("#tempVal").text(temp);

	//Adding Icon
	var iconUrl = 'http://openweathermap.org/img/w/' + data["weather"][0]["icon"] + '.png';
	var addIcon = '<img id="img1" src="' + iconUrl + '">';
	$("#weatherIcon").append(addIcon);

	//Adding details
	var arr =  data["weather"][0]["description"].split(' ');
	var finalDesc = '';
	for (var i = 0; i < arr.length; i++)
	{
		finalDesc += arr[i][0].toUpperCase() + arr[i].substring(1, arr[i].length) + ' ';  
	}

	$("#desc").text( finalDesc );
	$("#wind").append( data["wind"]["speed"] + " mph");
	$("#humi").append( data.main.humidity + " %");
  
} 

function getLocation()
{
  if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(getValues, error);
	}
	else
	{
		alert("Geolocation is not supported by your browser");
	}
}

function getValues(position)
{
	var lati  = position.coords.latitude;
    var longi = position.coords.longitude;

	var key = '&APPID=e579c8ec4536594e206ab2b517e975af';    
    var url = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?';    
    url += 'lat=' + lati + '&lon=' + longi + '&units=imperial' + key;
   
    $.getJSON(url, getWeather);   
}

function getWeather(data)
{
	//Adding background image.
	var catogary = data["weather"][0]["main"];
	setBackground (catogary);
    
    //Adding Location
    $("#location").text(data["name"] + ', ' + data["sys"]["country"]);
    	
	//Adding Temperature
	var temp = Math.round( data["main"]["temp"] );
	$("#tempVal").text(temp);

	//Adding Icon
	var iconUrl = 'http://openweathermap.org/img/w/' + data["weather"][0]["icon"] + '.png';
	var addIcon = '<img id="img1" src="' + iconUrl + '">';
	
	$("#weatherIcon").html(addIcon);

	//Capatalizing 1st letter of words in description.
	var arr =  data["weather"][0]["description"].split(' ');
	var finalDesc = '';
	for (var i = 0; i < arr.length; i++)
	{
		finalDesc += arr[i][0].toUpperCase() + arr[i].substring(1, arr[i].length) + ' ';  
	}

	//Adding weather details  thunderstorm with light drizzle
	$("#desc").text( finalDesc );
	$("#wind").text( "Wind " + data["wind"]["speed"] + " mph" );
	$("#humi").text( "Humidity " + data.main.humidity + " %");
}

function setBackground(pick)
{   
    switch (pick)
    {
    	case 'Clouds': 
    	{
    		document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AaizAhmed/Images/master/OverCast.jpg')";
    		break;
    	}
    	case 'Thunderstorm': 
    	{
    		document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AaizAhmed/Images/master/ThunderstormSkyTrees.jpg')";
    		
            //Changing weather display properties
            $("#geoInfo").css('color', 'white');
           
            $("#temp").css('background-color', 'white');
            $("#details").css('background-color', 'white');
           
            $("#temp").css('border-color', 'orange');
            $("#details").css('border-color', 'orange');
           
            break;
    	}
    	case 'Rain': 
    	{
        	document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AaizAhmed/Images/master/RainDropsSplashes.jpg')";
        		
            //Changing weather display properties FF7F00 = orange
           $("#geoInfo").css('color', '	#FF7F00');
           $("#temp").css('color', '	#FF7F00');
           $("#details").css('color', '	#FF7F00');

            break;
    	}
    	case 'Clear': 
    	{
    		document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AaizAhmed/Images/master/RainbowArch.jpg')";
    		break;
    	}
    	case 'Snow': 
    	{
    		document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AaizAhmed/Images/master/SnowSnowflak.jpg')";
    		
            //Changing weather display properties
            $("#temp").css('color', 'black');
            $("#details").css('color', 'black');
         
            break;
    	}
    	case 'Extreme': 
    	{
    		document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AaizAhmed/Images/master/Tornadoes.jpg')";
    		
            //Changing weather display properties
            $("#geoInfo").css('color', 'blue');
        
            $("#temp").css('color', 'red');
            $("#details").css('color', 'red');    
        
            break;
    	}
    	default: 
    	{
    		document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AaizAhmed/Images/master/weather-wallpaper-19.jpg')";
       		$("#details").css('font-weight', 'bold');   
        	$("#geoInfo").css('color', 'white');
    	}
    }
}

function convertTemp()
{
	var temp = document.getElementById("tempVal").innerHTML;

	if ($( "input[name='F/C']:checked" ).val() == 'C')
	{
		temp = Math.round( (temp - 32) * 5/9 );
	}
	else
	{
		temp = Math.round( (temp * 9/5) + 32 );
	}

	if (!isNaN(temp)) 	
	{	$("#tempVal").text(temp);	}
}

function error() 
{
    alert("Unable to retrieve your location");
}


// $("document").ready (function ()
// {   
//   if (window.location.protocol != "https:")
//    {
//             var msg = "For Current Location you need to use HTTPS.<br> Click here: ";
//                 msg += "<a target='_blank' href='https://codepen.io/AaizAhmed/full/PWbKNY/'>Local Weather</a>";

//           $("#httpError").html(msg);
//             defaultWeather();
//         } 
//       else 
//       { 
//             getLocation(); 
//       }

// } );