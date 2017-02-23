/*
	Author: Aaiz N Ahmed
	Date:   Feb 16, 2017
*/

function increment(num)
{
	if (num === 0)
	{
		var time = Number( $('#break').text() );
		time++;

		if (time == 11) // Can't go above 10 mins
		{	return;		}

		$('#break').text( ('0' + time).slice(-2) );
	}
	else
	{
		var time = Number( $('#session').text() );
		time++;

		if (time == 61) // Can't go above 60 mins
		{	return;		}

		$('#session').text( ('0' + time).slice(-2) );
		$('#timeLeft').text(('0' + time).slice(-2) + ':00');
	}
}

function decrement(num)
{
	if (num === 0)
	{
		var time = Number( $('#break').text() );
		time--;

		if (time === 0)
		{	return;		}

		$('#break').text( ('0' + time).slice(-2) );
	}
	else
	{
		var time = Number( $('#session').text() );
		time--;

		if (time === 0)
		{	return;		}

		$('#session').text( ('0' + time).slice(-2) );
		$('#timeLeft').text( ('0' + time).slice(-2) + ':00');
	}
}

function reset()
{
	clearInterval(timeLeft);
	onBreak = false;

	$('#break').text( 05 );
	$('#session').text( 25 );
	$('#info').text('Session');
	$('#timeLeft').text( '25:00' );

	$('#stop').addClass('hide');
	$('#start').removeClass('hide');
}

function statCounter(endTime)
{
	// Date.parse() gives current time in milli seconds.	
	var currentTime = endTime - Date.parse( new Date() );

	var seconds = Math.floor( (currentTime/1000) % 60 );
	var minutes = Math.floor( (currentTime/1000/60) % 60 );
	var hours = Math.floor( (currentTime/(1000*60*60)) % 24 );
  	var days = Math.floor( currentTime/(1000*60*60*24) );

	var formatTime = [currentTime, days, hours, minutes, seconds]; 
	
	return formatTime;
}

// Global variables
var timeLeft; 
var onBreak = false;

function startSession()
{
	$('#info').text('Session');

	var timeMilliSec;
	var minutes = Number ( $('#timeLeft').text().substring(0, 2) );
	var seconds = Number ( $('#timeLeft').text().substring(3, 5) );

	if ( minutes === 0 && seconds === 0 )
	{
		timeMilliSec = Number( $('#session').text() ) * (1000*60);
	}
	else
	{
		//Converting the time user added to milli seconds.
		timeMilliSec = minutes*60*1000 + seconds*1000;
	}

	var endTime = timeMilliSec + Date.parse( new Date() );
	//var endTime = Date.parse( new Date() ) + 5000;

    function updateClock() 
	{
	    var time = statCounter( endTime );
	    
	    var str = ('0' + time[3]).slice(-2) + ':' + ('0' + time[4]).slice(-2); 
		
		$('#timeLeft').text( str );

		if (time[0] <= 0)
		{
			clearInterval(timeLeft);
			
			var audio = new Audio('https://raw.githubusercontent.com/AaizAhmed/Images/master/Computer_Magic.mp3');
			audio.play();

			onBreak = true;
			startBreak();
		}
    }

    timeLeft = setInterval(updateClock, 1000);    
}

function startBreak()
{
	$('#info').text('Break');

	var timeMilliSec;
	var minutes = Number ( $('#timeLeft').text().substring(0, 2) );
	var seconds = Number ( $('#timeLeft').text().substring(3, 5) );

	if ( minutes === 0 && seconds === 0 )
	{
		timeMilliSec = Number( $('#break').text() ) * (1000*60);
	}
	else
	{
		timeMilliSec = minutes*60*1000 + seconds*1000;
	}

	var endTime = timeMilliSec + Date.parse( new Date() );
	//var endTime = Date.parse( new Date() ) + 5000;

    function updateClock() 
	{
	    var time = statCounter( endTime );
	    var str = ('0' + time[3]).slice(-2) + ':' + ('0' + time[4]).slice(-2); 
		$('#timeLeft').text( str );

		if (time[0] <= 0)
		{
			clearInterval(timeLeft);

			var audio = new Audio('https://raw.githubusercontent.com/AaizAhmed/Images/master/Bell-tone.mp3');
			audio.play();

			onBreak = false;
			startSession();
		}
    }

   timeLeft = setInterval(updateClock, 1000);
}

function start()
{
	$('#start').addClass('hide');
	$('#stop').removeClass('hide');

	if ( onBreak === false)
	{
		//console.log( "Working!" );
		startSession();
	}
	else
	{
		//console.log( "Chilling!" );
		startBreak();
	}	
}

function stop()
{
	$('#stop').addClass('hide');
	$('#start').removeClass('hide');
	
	clearInterval(timeLeft);
}

$(document).ready( function()
{
	$('#timeLeft').text('25:00');
	$('#stop').addClass('hide');

});