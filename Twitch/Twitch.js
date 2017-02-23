/*
	Aaiz N Ahmed
	January 23, 2017
	https://wind-bow.gomix.me/twitch-api
*/

function getData()
{
	var channelList = ["freecodecamp", "ESL_SC2", "gamingSC2", "cretetion", 
						"storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

	for (i in channelList)
	{
		var statusUrl = 'https://wind-bow.gomix.me/twitch-api/streams/';
	    statusUrl += channelList[i] + '?callback=getStatus';

	    tag = document.createElement("script");
		tag.src = statusUrl;
		document.getElementsByTagName("head")[0].appendChild(tag);	
	}
}

function useChannelUrl(data)
{	
    if (data["status"] !== 404)
    {
    	//Getting the table and adding a row.
    	var table = document.getElementById("offline");
		var row = table.insertRow(0);

		//Adding columns in the row.
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);

		var channelName = data["display_name"];
		var aTag = document.createElement("a");
		aTag.setAttribute('href', data["url"]);
		aTag.setAttribute('target', '_blank');
		aTag.innerHTML = channelName;
		
		var img = document.createElement("IMG");
	    img.setAttribute("src", data["logo"]);
	    img.setAttribute("width", "55");
	    img.setAttribute("width", "55");

		//Adding data in the columns/cells.
		cell1.append(img);
		cell2.append(aTag);
		cell3.innerHTML = "Offline";
	}
	else
	{		
		//Getting the table and adding a row.
    	var table = document.getElementById("offline");
		var row = table.insertRow(0);

		//Adding columns in the row.
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);

		var name = data["message"].split('\'');

		cell1.append("Not Found");
		cell2.append(name[1]);
		cell3.append("This channel does not exist.");
	}
	
}

function getStatus(data)
{
	if (data.stream == null)
	{
		var tmp = data["_links"]["channel"];
		var name = tmp.substring(38, tmp.length);

		var channelUrl = "https://wind-bow.gomix.me/twitch-api/channels/";
		channelUrl += name + '?callback=useChannelUrl';

		var tag = document.createElement("script");
		tag.src = channelUrl;
		document.getElementsByTagName("head")[0].appendChild(tag);	

	}
	else
	{
		//Getting table and adding a row.
		var table = document.getElementById("online");
		var row = table.insertRow(0);

		//Adding columns inside the row
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);

		var channelName = data["stream"]["channel"]["display_name"];	
		var gameDesc = data["stream"]["channel"]["game"] + ': ' + data["stream"]["channel"]["status"];

		var aTag = document.createElement("a");
		aTag.setAttribute('href', data["stream"]["channel"]["url"]);
		aTag.setAttribute('target', '_blank');
		aTag.innerHTML = channelName;
		
		var img = document.createElement("IMG");
	    img.setAttribute("src", data["stream"]["channel"]["logo"]);
	    img.setAttribute("width", "55");
	    img.setAttribute("width", "55");

	    //Adding data in the columns/cells.
		cell1.append(img);
		cell2.append(aTag);
		cell3.append(gameDesc);	
	}
}

getData();

$(document).ready(function () 
	{
		$("#on").click( function() 
		{
			$("#offline").addClass('hide');
			$("#online").removeClass('hide');
		});

		$("#off").click( function()
		{
			$("#online").addClass('hide');
			$("#offline").removeClass('hide');
		});

		$("#all").click( function()
		{
			$("#online").removeClass('hide');
			$("#offline").removeClass('hide');
		});

	});