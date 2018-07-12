/*
	Author: Aaiz N Ahmed
	Data: July 11, 2018
*/

function addRow(item, value)
{
    // Find a <table> element with id="myTable":
    var table = document.getElementById("hub");

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow();

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = item;
    cell2.innerHTML = value; 
}


function roundTwo(x)    
{     
  // Number() can also be used in place of parseFloat()
  return parseFloat(Math.round(x +'e2')+'e-2');     
}


function miningPoolHub ()
{
	var key = '&api_key=f99acd02310748f3453e4ee02565dfc6eae6ae15942d483ab8e7add0ab2a878a';
  var url = 'https://zcash.miningpoolhub.com/index.php?page=api&action=getdashboarddata';
  url += key + "&callback=getHubData";
    
  var tag = document.createElement("script");
	tag.src = url;

	//Adding JS to the HTML header
	document.getElementsByTagName("head")[0].appendChild(tag);

}


function getHubData(data)	
{
   // console.log(data);

   data = data["getdashboarddata"]["data"];

   var netHashrates = data["network"];

   var rate = roundTwo(netHashrates["hashrate"]) + " MH/s";
   var block = netHashrates["block"];
   var diff = roundTwo( netHashrates["difficulty"] );


    var azHash = data["raw"]["personal"]["hashrate"] + " KH/s";
    var pool   = data["pool"]["hashrate"];
    pool = roundTwo(pool) + " MH/s";
    
    var workers = data["pool"]["workers"];

    addRow("azminer", azHash);
    addRow("Pool", pool)
    addRow( "Network", rate );

    addRow( "Block", block );
    addRow( "Difficulty", diff );
    addRow( "Workers", workers );

    addRow( "--------", "--------" );

    var confirmed = data["balance"]["confirmed"];
    var unconfirmed = data["balance"]["unconfirmed"];
    var recent = data["recent_credits_24hours"]["amount"];

    addRow( "Confirmed", confirmed );
    addRow( "Unconfirmed", unconfirmed );
    addRow ( "Last 24 Hours", recent);

    addRow( "--------", "--------" );

    // Get earnings for last seven dates
    var recent = data["recent_credits"];

    for (var idx = 0; idx < 7; idx++) 
    {
      var date   = recent[idx]["date"];
      var amount = recent[idx]["amount"];

      addRow( date, amount );
    }

    addRow( "--------", "--------" );
}


miningPoolHub();
