var Opponent = function(game)
{
	this.game = game;
	this.paddle = new Paddle(this);
	this.updateTime = new Date().getTime();
	
	// Setup the paddle
	this.paddle.position = 
	{
		x: (this.game.client.width/2) - (this.paddle.width/2),
		y: 10
	}
	
	this.difficulty = 5;
	this.score = 0;
	this.state = "still";
}

Opponent.prototype.__toString = function()
{
	return "Opponent";
}


Opponent.prototype.update = function(currentTime)
{	
	if(!this.game.keysPressed.paused)
	{
		var elapsedTime = currentTime - this.updateTime;
		
		if((this.game.ball.position.x > this.paddle.position.x+(this.paddle.width/2)) && (this.game.ball.velocity.x > 0) && (this.paddle.position.x < (this.game.client.width - this.paddle.width)))
		{
			this.paddle.velocity.x = 100*this.difficulty;
			if(this.paddle.velocity.x > this.game.ball.velocity.x)
			{
				// No point running faster than the ball - makes it look laggy
				this.paddle.velocity.x = this.game.ball.velocity.x;
			}
		}
		else if ((this.game.ball.position.x < this.paddle.position.x+(this.paddle.width/2)) && (this.game.ball.velocity.x < 0) && (this.paddle.position.x > 0))
		{
			this.paddle.velocity.x = -100*this.difficulty;
			if(this.paddle.velocity.x < this.game.ball.velocity.x)
			{
				// No point running faster than the ball - makes it look laggy
				this.paddle.velocity.x = this.game.ball.velocity.x;
			}
		}
		else
		{
			this.paddle.velocity.x = 0;
		}
	}
	this.paddle.update(currentTime);
	this.updateTime = currentTime;
}

Opponent.prototype.draw = function()
{
	this.paddle.draw();
}



Opponent.prototype.resetLevel = function()
{
	// Position the player at the bottom of the screen in the center
	this.paddle.position = 
	{
		x: (this.game.client.width/2) - (this.paddle.width/2),
		y: 10
	}
	this.paddle.resetLevel();
}