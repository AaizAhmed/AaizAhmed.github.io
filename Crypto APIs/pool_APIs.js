/*
    Author: Aaiz N Ahmed
    Data: July 11, 2018
    */

    function addRow(table, item, value)
    {

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

   // Get the table for hub pool
   var table = document.getElementById("hub");

   addRow( table, "azminer", azHash );
   addRow( table, "Pool", pool );
   addRow( table, "Network", rate );

   addRow( table, "Block", block );
   addRow( table, "Difficulty", diff );
   addRow( table, "Workers", workers );

   addRow( table, "--------", "--------" );

   var confirmed = data["balance"]["confirmed"];
   var unconfirmed = data["balance"]["unconfirmed"];
   var recent = data["recent_credits_24hours"]["amount"];

   addRow( table, "Confirmed", confirmed );
   addRow( table, "Unconfirmed", unconfirmed );
   addRow ( table, "Last 24 Hours", recent);

   addRow( table, "--------", "--------" );

    // Get earnings for last seven dates
    var recent = data["recent_credits"];

    for (var idx = 0; idx < 7; idx++) 
    {
      var date   = recent[idx]["date"];
      var amount = recent[idx]["amount"];

      addRow( table, date, amount );
   }

   addRow( table, "--------", "--------" );
}


function nanoPool ()
{
   var address = 't1dFiLozmDYPFRvxG6sA1PmAedxVmjJLNzA';
   var url     = 'https://api.nanopool.org/v1/zec/user/:';
   url        += address;

   // var tag = document.createElement("script");
   // tag.src = url;

   // //Adding JS to the HTML header
   // document.getElementsByTagName("head")[0].appendChild(tag);

   $.getJSON(url, getNanoData);

}

function getNanoData(data)
{
   console.log(data);
}

function flyPool ()
{
   var address = 't1dFiLozmDYPFRvxG6sA1PmAedxVmjJLNzA/';
   var url     = 'https://api-zcash.flypool.org/miner/:';
   
   var urlStr  = url + address + "currentStats";

   $.getJSON(urlStr, function(data)
   {
      // console.log(data);

      var arr   = data["data"];
      var table = document.getElementById("fly");

      var azHash = arr["currentHashrate"]/1000;
      azHash = roundTwo(azHash) + " KH/s";

      var unconfirmed = arr["unconfirmed"];
      var unpaid = arr["unpaid"];
      var total = (unconfirmed + unpaid)/100000000;

      addRow( table, "azminer", azHash );
      addRow( table, "Unconfirmed", unconfirmed/100000000 );
      addRow( table, "Unpaid", unpaid/100000000 );
      addRow( table, "Total", total );

      addRow( table, "--------", "--------" );

   } );

   // Payout information
   urlStr = url + address + "payouts";

   $.getJSON(urlStr, function(data)
   {
      // console.log(data);

      var arr   = data["data"];
      var table = document.getElementById("fly");

      for (var idx = 0; idx < Math.min(arr.length, 7); idx++) 
      {
          var date   = arr[idx]["paidOn"];
          var amount = arr[idx]["amount"];
          
          amount = amount/100000000;
          date   = new Date(date*1000);

          addRow( table, date.toDateString(), amount );
      }

      addRow( table, "--------", "--------" );

   } );

   // Get Info about Rounds
   urlStr = url + address + "rounds";

   $.getJSON(urlStr, function(data)
   {
      // console.log(data);

      var arr   = data["data"];
      var table = document.getElementById("fly");
      var sum   = 0;

      for (var idx = 0; idx < arr.length; idx++) 
      {
          var block   = arr[idx]["block"];
          var amount = arr[idx]["amount"]/100000000;

          sum += amount;
          
          addRow( table, block, amount );
      }

      addRow( table, "Total", sum );

      addRow( table, "--------", "--------" );

   } );

}


// Run the functions
flyPool();
miningPoolHub();
// nanoPool();

