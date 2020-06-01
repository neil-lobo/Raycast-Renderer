class Boundary
{
	constructor(a, b, col)
	{
		this.a = a
		this.b = b
		this.colour = col
	}

	draw()
	{
		stroke(255, 0, 0)
		line(this.a.x, this.a.y, this.b.x, this.b.y)
	}
}