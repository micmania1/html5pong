var Paddle = function(parent)
{	
	this.parent = parent;
	this.updateTime = new Date().getTime();
	
	this.width = 100;
	this.height = 10;
	
	this.position = { x:0, y:0 }
	this.velocity = { x:0, y:0 }
	this.color = "#FFFFFF";
}

Paddle.prototype.__toString = function()
{
	return "Paddle";
}


Paddle.prototype.update = function(currentTime)
{	
	if(!this.parent.game.keysPressed.paused)
	{
		this.checkCollisions();
		
		var elapsedTime = currentTime - this.updateTime;
		this.position.x += this.velocity.x * (elapsedTime/1000);
		this.position.y += this.velocity.y * (elapsedTime/1000);
	}
	this.updateTime = currentTime;
}

Paddle.prototype.draw = function()
{
	this.parent.game.drawRectangle(this.color, this.position.x, this.position.y, this.width, this.height);
}

Paddle.prototype.checkCollisions = function()
{	
	if(this.position.x > (this.parent.game.client.width - this.width))
	{
		this.position.x = (this.parent.game.client.width - this.width);
	}
	else if(this.position.x < 0)
	{
		this.position.x = 0;
	}
}

Paddle.prototype.hitBall = function()
{	

	if(this.parent.game.ball.state != "coliding")
	{
		this.parent.game.ball.state = "colliding";
		
		// The ball has hit the paddle
		this.parent.game.ball.velocity.y *= -1;
		
		// Increase the speed
		this.parent.game.ball.velocity.x *= 1.1;
		this.parent.game.ball.velocity.y *= 1.1;
	}
}

Paddle.prototype.resetLevel = function()
{
}