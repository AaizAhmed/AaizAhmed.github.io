
function addMore()
{
	var str = '<tr> <td> <input type="text"> </td>';
		str += '<td> <input type="text"> </td>';
		str += '<td> <input type="text"> </td></tr>';		   
			  
	for (var i = 0; i < 5; i++) 
	{
		$('#inputDisplay').append( str );				
	}
}

function roundTwo(x)    
{     
  return Number(Math.round(x +'e2')+'e-2');     
}

function doCalculation()
{

	var table = document.getElementById('inputDisplay');

	var total = 0

    for (var r = 1, n = table.rows.length; r < n; r++) 
    {
       for (var c = 1; c < 2; c++) 
       {
           var num = table.rows[r].cells[c].children[0].value;

           var regEx = /[^\d]/g;   

           if ( num.match(regEx) )
           {
           		alert("Wrong input: Row " + r + " Col 2");
           		return;
           		console.log("Test passed!");
           		console.log(num);
           }    
           
           if (num != "")
           {
           		num += '.';

           		var tmp = table.rows[r].cells[c+1].children[0].value;

           		if (tmp.match(regEx))
           		{
           			alert("Wrong input: Row " + r + " Col 3");
           			return;
           		}

           		num += tmp;

           		total += roundTwo(num);
           }
       }
    }

    $("#result").html("<u> Total: " + total + "</u>");
}

$(document).ready( function()
{
	var d = new Date();
	var str = d.getMonth()+1 + '-' + d.getDate() + '-' + d.getFullYear();;

	$('#date').append(str);
});