class Camera
{
	constructor()
	{
		this.pos = createVector(VIEW_WIDTH/2, VIEW_HEIGHT/2)
		this.dir = createVector(1, 0)
		this.vel = createVector(0, 0)
		this.acc = createVector(0, 0)
		this.MAX_SPEED = 1
		this.fov = 60
		this.rays = []
		this.ray_per_degree = 5
	}

	draw()
	{
		stroke(255)
		fill(255)
		ellipse(this.pos.x, this.pos.y, 10)
		push()
		translate(this.pos.x, this.pos.y)
		stroke(0, 255, 0)
		line(0, 0, this.dir.x * 20, this.dir.y * 20)
		pop()
		// for (let ray of this.rays)
		// {
		// 	ray.draw()
		// }
	}

	update(dir)
	{
		// this.pos.set(x, y)
		this.dir.set(dir.sub(this.pos).normalize())
		this.pos.add(this.vel)
		// console.log(this.dir.heading())

		this.rays = []
		for (let angle = -Math.floor(this.fov / 2); angle < Math.floor(this.fov / 2); angle += 1/this.ray_per_degree)
		{
			this.rays.push(new Ray(this.pos, angle + degrees(this.dir.heading())))
		}
	}

	move(vel)
	{
		this.vel.add(vel)
	}

	look(bounds)
	{
		let render = Array(this.rays.length)

		for (let i = 0; i < this.rays.length; i++)
		{

			let closest_pt = null
			let closest_dist = Infinity
			let closest_ray = null

			for (let b of bounds)
			{
				let pt = this.rays[i].cast(b)
				if (pt)
				{
					const dist = p5.Vector.dist(this.pos, pt)
					if (dist < closest_dist)
					{
						closest_dist = dist
						closest_pt = pt
						closest_ray = this.rays[i]
						this.rays[i].d = dist
						this.rays[i].hit_boundary = Object.assign({}, b)
					}
				}
			}

			if (closest_pt)
			{
				// noStroke()
				// fill(0, 0, 180)
				// ellipse(closest_pt.x, closest_pt.y, 6, 6)
				stroke(255)
				line(this.pos.x, this.pos.y, closest_pt.x, closest_pt.y)
				render[i] = closest_ray
			}
		}

		// debugger 
		return render
	}

	render_view(bounds)
	{
		let render = this.look(bounds)
		// console.log(render)

		for(let i = 0; i < render.length; i++)
		{
			let perpendicular_dist = Infinity

			if (render[i])
			{
				// console.log("s")
				perpendicular_dist = render[i].d * Math.cos(this.dir.angleBetween(render[i].dir))
				// console.log(render[i].d)
			}


			let dist_to_proj_plane = -(VIEW_WIDTH/2) / Math.tan(this.fov/2)
			let rendered_height = WALL_HEIGHT / perpendicular_dist * dist_to_proj_plane // = tile_size / ray_distance * dist_to_proj_plane
			
			// if(rendered_height == 0) console.log("zero")

			push()

			translate(VIEW_WIDTH, 0)

			if (rendered_height)
			{

				let fill_color = color(	red(render[i].hit_boundary.colour)*rendered_height*2.5,
										green(render[i].hit_boundary.colour)*rendered_height*2.5,
										blue(render[i].hit_boundary.colour)*rendered_height*2.5)

				// let fill_color = 255

				fill(fill_color)
				stroke(fill_color)
				strokeWeight(1)
				rect(
					i * (VIEW_WIDTH/render.length),
					(VIEW_HEIGHT/2) - (rendered_height/2),
					VIEW_WIDTH/render.length, //strip width
					rendered_height
				)

				// fill(0, perpendicular_dist)
				// stroke(0, perpendicular_dist)
				// rect(
				// 	i * (VIEW_WIDTH/render.length),
				// 	(VIEW_HEIGHT/2) - (rendered_height/2),
				// 	VIEW_WIDTH/render.length, //strip width
				// 	rendered_height
				// )
			}

			pop()
		}
	}
}