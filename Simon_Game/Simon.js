/*
    Simon: This file implements an Simon sound game in which 
           the player needs to repeat the sounds in the order
           they are played in.

    Author: Aaiz N Ahmed
    Date: 03-23-2017
*/

var audio_one = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
// audio_one.play();

var audio_two = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audio_three = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audio_four = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

$('.switch-slot').on('click', function () 
{
	var is_on = $('#switch').hasClass('switch-on');

	if (!is_on)
	{	
		$("#switch").addClass('switch-on');
		$('.score').css('color', '#DC0D29');

	}
	else
	{
		$("#switch").removeClass('switch-on');
		$('.score').css('color', '#430710');

	}
});

$('#strict').on('click', function() 
{
	var is_on = $('#mode').hasClass('red');

	if (!is_on)
	{
		$('#mode').addClass('red');
		$('#mode').css('background-color', '#FC0102');
	}
	else
	{
		$('#mode').removeClass('red');
		$('#mode').css('background-color', '#32050C');
	}
});

$('.score').css('color', '#430710');
$('#start').css('background-color', 'red');
