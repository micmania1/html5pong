var Player = function(game)
{
	this.game = game;
	this.paddle = new Paddle(this);
	this.updateTime = new Date().getTime();
	this.keyset = "player_1";
	
	// Setup the paddle
	// Position the player at the bottom of the screen in the center
	this.default_position = { x: (this.game.client.width/2) - (this.paddle.width/2), y: this.game.client.height - (this.paddle.height + 10) }
	this.paddle.position = { x: this.default_position.x, y: this.default_position.y }
	
	this.score = 0;
}

Player.prototype.__toString = function()
{
	return "Player";
}

Player.prototype.update = function(currentTime)
{
	if(!this.game.keysPressed.paused)
	{
		var elapsedTime = currentTime - this.updateTime;

		if(this.keyset == "player_1")
		{
			if(this.game.keysPressed.left)
			{
				this.paddle.velocity.x = -800;
			} 
			else if (this.game.keysPressed.right)
			{
				this.paddle.velocity.x = 800;
			}
			else
			{
				this.paddle.velocity.x = 0;
			}
		}
		else if (this.keyset == "player_2")
		{
			if(this.game.keysPressed.p2_left)
			{
				this.paddle.velocity.x = -800;
			} 
			else if (this.game.keysPressed.p2_right)
			{
				this.paddle.velocity.x = 800;
			}
			else
			{
				this.paddle.velocity.x = 0;
			}
		}
		this.paddle.update(currentTime);
	}
	this.updateTime = currentTime;
}

Player.prototype.draw = function()
{
	this.paddle.draw();
}

Player.prototype.resetLevel = function()
{
	// Position the player at the bottom of the screen in the center
	this.paddle.position = 
	{
		x: this.default_position.x,
		y: this.default_position.y
	}
	this.paddle.resetLevel();
}