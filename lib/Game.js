var Game = function(canvas_id)
{
	this.fps = 10; // Frames per second; limits the loop speed
	
	var canvas = document.getElementById(canvas_id);
	this.context = canvas.getContext("2d");
	this.client = { width: canvas.width, height: canvas.height };
	this.number_of_players = 2;
	this.difficulty = 5;
	this.state = "start";
	
	// Controls
	this.keysPressed = 
	{
		"left" : false,
		"up" : false,
		"right" : false,
		"down" : false,
		"paused" : false
	}	

	// Define controls
	var keysPressed = this.keysPressed;
	document.onkeydown = function(event)
	{
		var keyCode;
		
		if(event == null) {
			keyCode = window.event.keyCode;
		} else {
			keyCode = event.keyCode;
		}
		
		
		switch (keyCode)
		{
			case 37:
				keysPressed.left = true;
				break;
			case 39:
				keysPressed.right = true;
				break;
			case 65:
				keysPressed.p2_left = true;
				break;
			case 68:
				keysPressed.p2_right = true;
				break;
			case 80:
				keysPressed.paused = (keysPressed.paused == false) ? true : false;
				break;
		}
	}
	
	document.onkeyup = function(event)
	{
		var keyCode;
		
		if(event == null) {
			keyCode = window.event.keyCode;
		} else {
			keyCode = event.keyCode;
		}
		
		switch (keyCode)
		{
			case 37:
				keysPressed.left = false;
				break;
			case 39:
				keysPressed.right = false;
				break;
			case 65:
				keysPressed.p2_left = false;
				break;
			case 68:
				keysPressed.p2_right = false;
				break;
		}
	}
	
	// Add the background
	this.background = new Background(this);
	
	var game = this;
	this.game = this;
	var main = setInterval(function()
	{
		game.update();
		game.draw();
	}, this.fps);
}

Game.prototype.__toString = function()
{
	return "Game";
}

Game.prototype.update = function()
{
	var timestamp = new Date().getTime();

	this.background.update(timestamp);
	if(this.state == "play")
	{
		this.player.update(timestamp);
		this.opponent.update(timestamp);
		this.ball.update(timestamp);
	}
}

Game.prototype.draw = function()
{
	if(this.state == "play")
	{
		if(!this.keysPressed.paused)
		{
			this.background.draw();	
			this.player.draw();
			this.opponent.draw();
			this.ball.draw();
		}
		else
		{
			this.context.fillStyle = '#FF0000';
			this.context.font = 'bold 80px sans-serif';
			this.context.textBaseline = 'middle';
			this.context.textAlign = 'center';
			
			this.context.fillText("Paused", this.client.width/2, this.game.client.height/2);

		}
	}
	else if (this.state == "start")
	{
		this.background.draw();
	}
}

Game.prototype.drawRectangle = function(color, x, y, width, height)
{
	this.context.fillStyle = color;
	this.context.fillRect(x, y, width, height);
}

Game.prototype.start = function()
{	
	// Add Game Objects
	this.player = new Player(this);
	
	// Add opponent (2 player optional)
	if(this.number_of_players == 2)
	{
		this.opponent = new Player(this);
		this.opponent.keyset = "player_2";
		this.opponent.default_position = { x: (this.client.width/2) - (this.opponent.paddle.width/2), y: 10 }
		this.opponent.paddle.position = this.opponent.default_position;
	}
	else
	{
		this.opponent = new Opponent(this);
		this.opponent.difficulty = this.difficulty;
	}
	
	// Add the ball
	this.ball = new Ball(this);
	
	this.state = "play";
}

Game.prototype.restart = function()
{
	this.player.score = 0;
	this.opponent.score = 0;
	this.resetLevel();
}

Game.prototype.resetLevel = function()
{
	this.keysPressed.left = false;
	this.keysPressed.right = false;
	this.keysPressed.up = false;
	this.keysPressed.down = false;
	this.keysPressed.paused = false;
	this.state = "play";
	
	this.opponent.resetLevel();
	this.player.resetLevel();
	this.ball.resetLevel();
}