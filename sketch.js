const VIEW_WIDTH = 500
const VIEW_HEIGHT = 500
const WALL_HEIGHT = 100

let walls = []
let ray
let player

function setup()
{
	createCanvas(VIEW_WIDTH * 2, VIEW_HEIGHT)
	// walls.push(new Boundary(VIEW_WIDTH/2, 0, VIEW_WIDTH/2, VIEW_HEIGHT))
	for (let i = 0; i < 6; i++)
	{
		walls.push(new Boundary(createVector(random(VIEW_WIDTH),random(VIEW_HEIGHT)),
								createVector(random(VIEW_WIDTH), random(VIEW_HEIGHT)),
								color(random([0,1]), random([0,1]), random([0,1]))
								)

		)
	}
	player = new Camera()
}

function draw()
{
	background(50)
	stroke(255, 255, 0)
	strokeWeight(2)
	line(VIEW_WIDTH, 0, VIEW_WIDTH, VIEW_HEIGHT)
	strokeWeight(1)

	player.update(createVector(mouseX, mouseY))
	player.render_view(walls)

	draw_bounds()
	player.draw()
	// console.log(player.vel.x + " : " + player.vel.y)
}

function draw_bounds()
{
	for(let wall of walls)
	{
		wall.draw()
	}
}

function keyPressed()
{
	switch(keyCode)
	{
		case 87:
			// console.log("w")
			player.move(createVector(0, -1).mult(player.MAX_SPEED))
			break
		case 65:
			// console.log("a")
			player.move(createVector(-1, 0).mult(player.MAX_SPEED))
			break
		case 83:
			// console.log("s")
			player.move(createVector(0, 1).mult(player.MAX_SPEED))
			break
		case 68:
			// console.log("d")
			player.move(createVector(1, 0).mult(player.MAX_SPEED))
			break
	}
}

function keyReleased()
{
	switch(keyCode)
	{
		case 87:
			// console.log("w")
			player.move(createVector(0, -1).mult(player.MAX_SPEED).mult(-1))
			break
		case 65:
			// console.log("a")
			player.move(createVector(-1, 0).mult(player.MAX_SPEED).mult(-1))
			break
		case 83:
			// console.log("s")
			player.move(createVector(0, 1).mult(player.MAX_SPEED).mult(-1))
			break
		case 68:
			// console.log("d")
			player.move(createVector(1, 0).mult(player.MAX_SPEED).mult(-1))
			break
	}
}