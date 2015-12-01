//Examples for Bolt
//
//Pure Javascript Method - Load Now
//When executed this will create an instance of the Bolt Player
//Once the player is created it will call "playerInit()" ^Or any function that you specify.
//data-onready returns the playerID as a string in the callback once ready
//Note: Specifiying a data-onready Function that does not exist may lead to page errors

//** Begin Example 1 **//
var makePlayer =  function () {
	try{
		console.log('Making Player');
		var script = document.createElement('script');
		script.src = '//cdn.playwire.com/bolt/js/zeus/embed.js';
		script.type = 'text/javascript';
		script.id = 'script';
		script.setAttribute('data-config', 'http://path-to-your-config.com/config.json'); //replace with actual JSON url provided in Playwire Admin
		script.setAttribute('data-css', 'http://cdn.playwire.com/bolt/js/zeus/skins/default.css');  //Default CSS (See Admin for more options)
		script.setAttribute('data-width', '100%'); //Set at 100% for Responsive Player (Height must be 100% as well)
		script.setAttribute('data-height', '100%'); //Set at 100% for Responsive Player (Height must be 100% as well)
		script.setAttribute('data-id', 'AnyUniqueName'); //Unique Name (ID) for your player
		script.setAttribute('data-autoload', 'false'); 	
		script.setAttribute('data-onready', 'playerInit'); 
		document.body.appendChild(script); //Append to DOM with your method of choice 
	}catch(e){
		console.log(e);
	}
}

var playerInit = function (playerID) {
	Bolt.on( playerID, Bolt.BOLT_CONTENT_COMPLETE, function(){
		console.info('Bolt Player ' + playerID + ' Initialized' );
	});
}

makePlayer();
//** End Example 1 **//

//
//
//Pure Javascript Method - Lazy Load
//When executed this will create an instance of the Bolt Player. But the player will not be rendered on the DOM automatically. 
//Once the makePlayer() function is fired it will load the Bolt API and register a player instance. 
//We use the Bolt.renderPlayer() method to initialize the instance that we previously registered 
//Data-Onready attribtue and Bolt.renderPlayer are mutually exclusive and should not be used together
//This method does reuqire us to make sure the Bolt object is available before rendering. Note the timer function

//** Begin Example 2 **//
var makePlayer =  function () {
	try{
		console.log('Making Player');
		var script = document.createElement('script');
		script.src = '//cdn.playwire.com/bolt/js/zeus/embed.js';
		script.type = 'text/javascript';
		script.id = 'script';
		script.setAttribute('data-config', 'http://path-to-your-config.com/config.json'); //replace with actual JSON url provided in Playwire Admin
		script.setAttribute('data-css', 'http://cdn.playwire.com/bolt/js/zeus/skins/default.css');  //Default CSS (See Admin for more options)
		script.setAttribute('data-width', '100%'); //Set at 100% for Responsive Player (Height must be 100% as well)
		script.setAttribute('data-height', '100%'); //Set at 100% for Responsive Player (Height must be 100% as well)
		script.setAttribute('data-id', 'AnyUniqueName'); //Unique Name (ID) for your player
		script.setAttribute('data-autoload', 'true'); 
		document.body.appendChild(script); //Append to DOM with your method of choice 
		
		//Timer Function 
		var checkForBolt = setInterval(function(){
			if(window.Bolt){ //Bolt object is registered to window
				if(window.Bolt.embeds['playerID']){
					clearInterval(checkForBolt); //remove timer. 
					playerInit('playerID'); //Our Player is registered and ready to be rendered whenever we choose
				}
			}
		},50);
		
	}catch(e){
		console.log(e);
	}
}

var playerInit = function (playerID) {
	Bolt.renderPlayer(playerID, function(){
		console.info('Bolt Player ' + playerID + ' Initialized' );
	})
}

makePlayer();
//** End Example 2 **//