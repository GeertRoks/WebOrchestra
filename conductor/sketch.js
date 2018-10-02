var param1 = 0;
var param2 = 0;

var balls = [];
var ballSize = 200;
var ballRad = ballSize / 2;

function setup()
{
	createCanvas(windowWidth, windowHeight);

	mouseX = width/2;
	mouseY = height/2;
	balls.push(new Ball());

	background(0);
	noStroke();
}

function draw()
{
	background(50, 5);

	for (var i=0; i<balls.length; i++)
	{
		balls[i].display();
	}

	param1 = balls.length;
	param2 = 0;
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight)
}


function Ball()
{
	// Constructor
	this.x = mouseX;
	this.y = mouseY;
	this.xSpeed = random(-5, 5);
	this.ySpeed = random(-5, 5);
	this.strength = 1;

	this.display = function()
	{
		fill(25 * this.strength, 25 * this.strength, 200 + 20 * this.strength);
		ellipse(this.x, this.y, ballSize, ballSize);
		fill(0);
		ellipse(this.x, this.y, ballSize - 25, ballSize - 25);
		this.move();
		this.collide();
	};

	this.move = function()
	{
		/*
		this.x = (this.x + this.xSpeed) % windowWidth;
		this.y = (this.y + this.ySpeed) % windowHeight;

		if (this.x < 0) this.x = windowWidth;
		if (this.y < 0) this.y = windowHeight;
		*/
		this.x += this.xSpeed;
		this.y += this.ySpeed;

		// Check for screenborder collision
		if (this.x > (windowWidth - ballRad) || this.x < ballRad) this.xSpeed *= -1;
		if (this.y > (windowHeight - ballRad) || this.y < ballRad) this.ySpeed *= -1;	// down
	}

	this.collide = function()
	{
		for (var i=0; i<balls.length; i++)
		{
			var ballDist = dist(this.x, this.y, balls[i].x, balls[i].y);

			// Check for collision
			if (ballDist > 0 && ballDist < ballSize)
			{
				// Absorb values of the ball we ran into
				this.strength += balls[i].strength;
				this.xSpeed += balls[i].xSpeed;
				this.ySpeed += balls[i].ySpeed;

				// Remove the ball we ran into
				balls.splice(i, 1);
			}
		}
	}
}

function mousePressed()
{
	balls.push(new Ball());	
}