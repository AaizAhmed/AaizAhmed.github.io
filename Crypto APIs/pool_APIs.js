/*
	Author: Aaiz N Ahmed
	Data: July 11, 2018
*/

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

function iterateRecursively(object, callbackFunction) {

    // Walk through object
    for (var keyName in object) {

        // If the given parameter is an object, call the function over and 
        // over again, till you get a string or number
        if (typeof object[keyName] === 'object') 
        {
        		// console.log(keyName + ":");

            iterateRecursively(object[keyName], callbackFunction);
        } 
        else 
        {
            console.log(keyName + " = " + object[keyName]);
        }
    }
}

function getHubData(data)	
{

   console.log(data);

   var test = data["getdashboarddata"]["data"];

   iterateRecursively(data);

 //    $("#hub").append(test);

}

miningPoolHub();
