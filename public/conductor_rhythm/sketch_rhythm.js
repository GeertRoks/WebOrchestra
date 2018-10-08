var socket;

// Values we're going to send to the server
var param1 = 0;
var param2 = 0;

var balls = [];
var ballSize = 200;
var ballRad = ballSize / 2;

function setup()
{
	createCanvas(displayWidth, displayHeight);
	socket = io.connect("http://localhost:3000/conductor_rhythm/");

	mouseX = width/2;
	mouseY = height/2;
	balls.push(new Ball);

	background(0);
	strokeWeight(10);
	stroke(255);
	fill(0, 50);
}

function draw()
{
	background(0, 50);

	for (var i=0; i<balls.length; i++)
		balls[i].display();

	// Stuur deze twee parameters door
	param1 = balls.length;
	param2 = param2 * 0.99;
}

function Ball()
{
	// Constructor
	this.x = mouseX;
	this.y = mouseY;
	this.xSpeed = random(-5, 5);
	this.ySpeed = random(-5, 5);
	this.strength = 1;
	this.killCount = 0;

	this.display = function()
	{
		stroke(10 * this.strength + 100, 10 * this.strength + 50, 100 + 20 * this.strength);
		ellipse(this.x, this.y, ballSize, ballSize);
		this.move();
		this.collide();
	};

	this.move = function()
	{
		this.x += this.xSpeed;
		this.y += this.ySpeed;

		// Check for screenborder collision
		if (this.x > (windowWidth - ballRad) || this.x < ballRad) this.xSpeed *= -1;
		if (this.y > (windowHeight - ballRad) || this.y < ballRad) this.ySpeed *= -1;
	}

	this.collide = function()
	{
		// Check with every existing ball
		for (var i=0; i<balls.length; i++)
		{
			var ballDist = dist(this.x, this.y, balls[i].x, balls[i].y);

			// Check for collision and if we're not comparing against ourselves
			if (ballDist > 0 && ballDist < ballSize)
			{
				// Absorb values of the ball we ran into
				this.strength += balls[i].strength;
				this.xSpeed += balls[i].xSpeed;
				this.ySpeed += balls[i].ySpeed;
				this.killCount += balls[i].killCount;

				// Remove the ball we ran into
				balls.splice(i, 1);
				ballDie();

				// Celebrate the victory
				this.killCount++;

				if (this.killCount > 5)
					balls.pop();
			}
		}
	}
}

function ballDie()
{
	param2 += 1;
}

function mousePressed()
{
	balls.push(new Ball());	
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight)
}