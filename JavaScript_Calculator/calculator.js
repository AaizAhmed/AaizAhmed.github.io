
var stack = new Array();
var equalsUsed = false;

function allClear()
{
	stack = [];
	$('#displayPrevious').text('');
	$('#displayCurrent').text('0');
}

function clearEntry()
{
	// Changing current display only.
	$('#displayCurrent').text('0');
}

function addText(str)
{
	var value =  document.getElementById('displayCurrent').innerHTML;

	// Gets rid to the Zero when using the calculator for the first time.
	if ( value.length == 1 && value[0] == '0' ) 
	{
		$('#displayCurrent').text('');
	}

	if ( equalsUsed )
	{
		equalsUsed = false;
		return $('#displayCurrent').text( str );
	}

	var regEx = /^[+-/x]/;  //To only display numbers after selecting the operator.

	if ( regEx.test(value) ) 
	{
		$('#displayCurrent').text('');
	}

	$('#displayCurrent').append( str );
}

function addOperators(operator)
{
	var value =  document.getElementById('displayCurrent').innerHTML;

	var regEx = /^[+-/x]/;  //To make sure that only 1 operator is added at a time.

	if ( regEx.test(value) ) 
	{
		if (value != operator)
		{
			stack.pop();
			stack.push(operator);
			
			var output = stack.toString().replace(/,/g, '');
			$('#displayPrevious').text( output );
			
			return $('#displayCurrent').text( operator );
		}

		else return;	//If it is the same opetator do nothing. 
	}

	stack.push( Number(value) );
	stack.push(operator);

	var output = stack.toString().replace(/,/g, '');
	$('#displayPrevious').text( output );

	$('#displayCurrent').text( operator );
}

function addDecimal(str)
{	
	var value =  document.getElementById('displayCurrent').innerHTML;
	var regEx = /^[+-/x]/;  

	if ( equalsUsed )
	{
		equalsUsed = false;
		$('#displayCurrent').text('0');  		
	}

	if ( regEx.test(value) ) 
	{
		$('#displayCurrent').text('0');   //Removes the operator and replaces it with a Zero.
	}

	$('#displayCurrent').append( str );
}

function postfixAlgorithm()
{
	var regEx = /^[+-/x]/;

 	var postfix = new Array();
 	var operatorArray = new Array();

 	for (var i = 0; i < stack.length; i++)
 	{
 		if (regEx.test( stack[i] ) )
 		{
 			//Now apply the operant rules
 			var tmp = operatorArray[ operatorArray.length - 1];

			// Remove the top operator and add it to the postfix if following conditions are true.
 			// Same symbols or Same precedence + and -
 			if ( tmp == stack[i] || (tmp == '+' && stack[i] == '-') || (tmp == '-' && stack[i] == '+' ) )
 			{
 				postfix.push( operatorArray.pop() );
 			}

 			// Same precedence x and /
 			if ( (tmp == 'x' && stack[i] == '/') || (tmp == '/' && stack[i] == 'x' ) )
 			{
 				postfix.push( operatorArray.pop() );
 			}

 			// If incoming has lower precedence 
 			if ( (tmp == 'x' && stack[i] == '+') || (tmp == 'x' && stack[i] == '-' ) || 
 				 (tmp == '/' && stack[i] == '+') || (tmp == '/' && stack[i] == '-' ) )
 			{
 				postfix.push( operatorArray.pop() );
 			}

 			// Push the new operator.
 			operatorArray.push( stack[i] );
 		}
 		else
 		{
 			postfix.push( stack[i] );
 		}
 	}

 	// Remove the remaining operators from the stack and add them to postfix. 
 	while ( operatorArray.length > 0 )
 	{
 		postfix.push( operatorArray.pop() );
 	}

	//console.log( postfix );

	var calculate = new Array();	// Use a stack to do calculations.

	var length = postfix.length;

	for (var i = 0; i < length; i++)
	{
		if ( regEx.test( postfix[i] ) === false )
		{
			calculate.push( postfix[i] );
			//console.log( calculate );
		}
		else
		{
			var num2 =  calculate.pop();
			var num1 =  calculate.pop();

			if ( postfix[i] == 'x' )
			{
				calculate.push (num1 * num2);
			}
			if ( postfix[i] == '/' )
			{
				calculate.push (num1 / num2);
			}
			if ( postfix[i] == '+' )
			{
				calculate.push (num1 + num2);
			}
			if ( postfix[i] == '-' )
			{
				calculate.push (num1 - num2);
			}
		}		
	}

	equalsUsed = true;

	return Number( calculate[0] );
}

function doCalculation()
{
	var value =  document.getElementById('displayCurrent').innerHTML;

	if ( stack.length <= 1)
	{
		return;
	}

	var regEx = /^[+-/x]/;  

	if ( regEx.test(value) ) 
	{	
		return;	//If it is an opetator do nothing. 
	}

	stack.push( Number(value) );	//Add the most recent value to the stack

	var output = stack.toString().replace(/,/g, '');

	var result = postfixAlgorithm();
	
	output += '=' + result;

	stack = new Array();

	$('#displayPrevious').text( output );
	$('#displayCurrent').text(result);
}

$(document).ready( function()
{
	$('#displayPrevious').text('0');
	$('#displayCurrent').text('0');
});