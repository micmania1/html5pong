var Background = function(game)
{
	this.game = game;
	this.color = "#000000";
}

Background.prototype.__toString = function()
{
	return "Background";
}

Background.prototype.update = function(currentTime)
{
}

Background.prototype.draw = function()
{
	this.game.drawRectangle(this.color, 0, 0, this.game.client.width, this.game.client.height);
	
	this.game.context.fillStyle = '#333333';
	this.game.context.font = 'bold 80px sans-serif';
	this.game.context.textBaseline = 'middle';
	this.game.context.textAlign = 'center';
	
	
	if(typeof(this.game.opponent) != "undefined" && typeof(this.game.player) != "undefined")
	{
		this.game.drawRectangle("#333333", 0, this.game.client.height/2, this.game.client.width, 1);
		this.game.context.fillText(this.game.opponent.score, this.game.client.width/2, this.game.client.height/4);
		this.game.context.fillText(this.game.player.score, this.game.client.width/2, (this.game.client.height - (this.game.client.height/4)));
	}
	else
	{
		this.game.context.font ='bold 50px sans-serif';
		this.game.context.fillStyle = '#FF0000';
		this.game.context.fillText("START THE GAME BELOW", this.game.client.width/2, this.game.client.height/2);
	}
}