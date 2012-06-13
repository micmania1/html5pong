var Ball = function(game)
{
	this.game = game;
	this.updateTime = new Date().getTime();
	
	this.width = 10;
	this.height = 10;
	this.position = { x:0, y:0 }
	this.velocity = { x:0, y:0 }
	this.state = "start";
	
	this.resetLevel();
	this.color = "#00FF00";
}

Ball.prototype.__toString = function()
{
	return "Ball";
}


Ball.prototype.update = function(currentTime)
{		
	if(!this.game.keysPressed.paused)
	{
		this.checkCollisions();	
		
		// When the ball resets, we want to pause for a bit
		if((currentTime - this.startTime) > 1000)
		{
			this.state = "moving";
			var elapsedTime = currentTime - this.updateTime;
			this.position.x += this.velocity.x * (elapsedTime/1000);
			this.position.y += this.velocity.y * (elapsedTime/1000);
		}
		else
		{
			this.state = "still";
		}
	}
	this.updateTime = currentTime;
}

Ball.prototype.draw = function()
{
	this.game.drawRectangle(this.color, this.position.x, this.position.y, this.width, this.height);
}

Ball.prototype.checkCollisions = function()
{	
	// Check to see if the ball is outside of the canvas area (on y-axis only)
	if (this.position.y < (0-this.height))
	{
		this.game.player.score++;
		this.game.resetLevel();
	}
	else if (this.position.y > this.game.client.height)
	{
		this.game.opponent.score++;
		this.game.resetLevel();
	}
	
	// Check for collisions with the sidewall
	if((this.position.x < 0) || (this.position.x > (this.game.client.width-this.width)))
	{
		if(this.state != "collidingSidewall")
		{
			// Reverse the direction
			this.velocity.x *= -1;
			if(this.position.x < 0)
			{
				this.position.x = 0;
			}
			else
			{
				this.position.x = this.game.client.width-this.width;
			}
			
			this.state = "collidingSidewall";
		}
	}
	else
	{
		this.state = "moving";
	}
	
	// Check for collision with the paddle
	var min_x = this.game.player.paddle.position.x;
	var max_x = min_x + this.game.player.paddle.width;
	var min_x_opp = this.game.opponent.paddle.position.x;
	var max_x_opp = min_x_opp + this.game.opponent.paddle.width;
	
	// Check for collisions with the players paddle
	if(((this.position.y+this.height) >= this.game.player.paddle.position.y) && (this.position.x >= min_x && this.position.x <= max_x))
	{
		this.position.y = (this.game.player.paddle.position.y - this.height+1);
		this.game.player.paddle.hitBall();
	} 
	else if(((this.position.y) <= (this.game.opponent.paddle.position.y+this.game.opponent.paddle.height)) && (this.position.x >= min_x_opp && this.position.x <= max_x_opp))
	{
		this.position.y = (this.game.opponent.paddle.position.y + this.game.opponent.paddle.height+1);
		this.game.opponent.paddle.hitBall();
	}
}

Ball.prototype.resetLevel = function()
{
	this.state = "start";
	this.position =
	{
		x: (this.game.client.width / 2) - (this.width / 2),
		y: (this.game.client.height / 2) - (this.height / 2)
	}
	
	var randomX = (Math.floor(Math.random()*50) + 100) * 2;
	this.velocity = 
	{
		x: (Math.floor(Math.random()*2) == 0) ? randomX : randomX*-1,
		y: (Math.floor(Math.random()*2) == 0) ? 150 : -150
	}
	
	this.startTime = new Date().getTime();
}