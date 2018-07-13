/*
    Author: Aaiz N Ahmed
    Data: July 11, 2018
    */

    function addRow(table, item, value)
    {

    // Create an empty <tr> element and add it to the table:
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

 function round(x, y)    
 {     
  // Number() can also be used in place of parseFloat()
  return parseFloat(Math.round(x +'e'+y)+'e-'+y);     
}


function miningPoolHub()
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

   // Do not show this Pool info on webpage if the hashrate is zero.
   if ( data["raw"]["personal"]["hashrate"] == 0 )
   {
      $("#h_hub").addClass("hide");
      $("#hub").addClass("hide");

      // No pool info needed so just return.
      return;
   }

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
   var total = confirmed + unconfirmed;

   addRow( table, "Confirmed", confirmed );
   addRow( table, "Unconfirmed", unconfirmed );
   addRow( table, "Total", total );
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


function nanoPool()
{
   var address = 't1dFiLozmDYPFRvxG6sA1PmAedxVmjJLNzA';
   var url     = 'https://api.nanopool.org/v1/zec/user/';
   url        += address;

   $.getJSON(url, function(data)
   {
      // console.log(data);

      var arr = data["data"];

      // Do not show this Pool info on webpage if the hashrate is zero.
      if ( arr["hashrate"] == 0 )
      {
         $("#h_nano").addClass("hide");
         $("#nano").addClass("hide");

         // No pool info needed so just return.
         return;
      }

      var table = document.getElementById("nano");

      var confirmed = arr["balance"];
      var unconfirmed = arr["unconfirmed_balance"];
      var total = parseFloat(confirmed) + parseFloat(unconfirmed);
      
      var azHash = roundTwo( arr["hashrate"]/1000 ) + " KH/s";

      addRow( table, "azminer", azHash );
      addRow( table, "Confirmed", confirmed );
      addRow( table, "Unconfirmed", unconfirmed );
      addRow( table, "Total", total );

      addRow( table, "--------", "--------" );

      url = "https://api.nanopool.org/v1/zec/approximated_earnings/" + arr["hashrate"];

      $.getJSON(url, function(data)
      {
         var coinsHour = data["data"]["hour"]["coins"];
         var coinsDay  = data["data"]["day"]["coins"];

         addRow (table, "Coins per Hour", round(coinsHour, 8));
         addRow (table, "Coins per Day", round(coinsDay, 8));

         addRow( table, "--------", "--------" );
      } );

   } );

}


function flyPool()
{
   var address = 't1dFiLozmDYPFRvxG6sA1PmAedxVmjJLNzA/';
   var url     = 'https://api-zcash.flypool.org/miner/:';
   
   var urlStr  = url + address + "currentStats";

   $.getJSON(urlStr, function(data)
   {
      // console.log(data);

      var arr = data["data"];

      // Do not show this Pool info on webpage if the hashrate is zero.
      if ( arr["currentHashrate"] == 0 )
      {
         $("#h_fly").addClass("hide");
         $("#fly").addClass("hide");

         // No pool info needed so just return.
         return;
      }

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

      var coins = arr["coinsPerMin"]*60;
      addRow (table, "Coins per Hour", round(coins, 8));
      
      coins = coins*24;
      addRow (table, "Coins per Day", round(coins, 8));
      
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

      for (var idx = 0; idx < arr["length"]; idx++) 
      {
          // var block  = arr[idx]["block"];
          var amount = arr[idx]["amount"];

          sum   += amount;
          // amount = amount/100000000;
          
          // addRow( table, block, amount );
      }

      var len = arr["length"];
      sum = sum/100000000;

      var avg = sum/len;

      addRow( table, "Total", sum );
      addRow( table, "Rounds", len );
      addRow( table, "Average", round(avg, 8) );

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

}


// Run the functions
flyPool();
miningPoolHub();
nanoPool();
