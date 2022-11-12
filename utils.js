const cAbs = (c) => {
	if (c.x < 0)
		c.x *= -1;
	if (c.y < 0)
		c.y = -c.y;
	return (c);
};

const add = (a, b) => {
	const c = {};

	c.x = a.x + b.x;
	c.y = a.y + b.y;
	return (c);
};

const sqr = (a) => {
	const c = {};

	c.x = a.x * a.x - a.y * a.y;
	c.y = 2 * a.x * a.y;
	return (c);
};

const mod = (a) => Math.sqrt(a.x * a.x + a.y * a.y);

const revImaginary = (c) => ({ y: c.y * -1,x: c.x });

const mapPoint = (env) => {
	const c = {};

	c.x = ((env.x - WIN_SIZE / 2) / WIN_SIZE * (env.r)) * 2 + env.off_x;
	c.y = ((env.y - WIN_SIZE / 2) / WIN_SIZE * (env.r)) * 2 + env.off_y;
	return (c);
};

const move = (env, key) => {
	if (key == KEY_UP) env.off_y -= env.r / 10;
	else if (key == KEY_DOWN) env.off_y += env.r / 10;
	else if (key == KEY_RIGHT) env.off_x += env.r / 10;
	else if (key == KEY_LEFT) env.off_x -= env.r / 10;
	drawFractal(env);
};

const resetParams = (env) => {
	env.color = {
		r: 17,
		g: 0,
		b: 0
	};
	env.r = 2;
	env.off_x = 0;
	env.off_y = 0;
};

const drawPixel = (ctx, x, y, color) => {
	const roundedX = Math.round(x);
	const roundedY = Math.round(y);
	ctx.fillStyle = color || '#000';
	ctx.fillRect(roundedX, roundedY, 1, 1);
}

const changeFractal = (key, env) => {
	env.fractal = key;
	resetParams(env);
};

const initEnv = (env) => {
	env.lock = -1;
	env.r = 2;
	env.color = {
		r: 17,
		g: 0,
		b: 0
	};
	env.all = [];
	env.all[JULIA] = juliaSet;
	env.all[MANDELBROT] = mandelbrotSet;
	env.all[BUFFALO] = buffaloSet;
	env.all[TRICORN] = tricornSet;
	resetParams(env);
};

const addColor = (key, env) => env.color[COLOR_KEYS[key]] = (env.color[COLOR_KEYS[key]] + 17) % 256;

const subColor = (key, env) => env.color[COLOR_KEYS[key]] = (env.color[COLOR_KEYS[key]] - 17) < 0 ? 255 : (env.color[COLOR_KEYS[key]] - 17);

const initComplex = (x, y) => {
	const z = {};

	z.x = x;
	z.y = y;
	return (z);
};

const calculateFractal = (env) => {
	let	z = initComplex(0, 0);

	for (let i = 0; mod(z) <= 4 && i < ITERATIONS; ++i) {
		z = env.all[env.fractal](z, env);
		if (mod(z) >= 4) return (i);
	}
	return (0);
};

const setPixel = (env, res) => {
	env.img.data[(env.y * env.img.width * 4) + env.x * 4] = env.color.r * res % 256;
	env.img.data[(env.y * env.img.width * 4) + (env.x * 4) + 1] = env.color.g * res % 256;
	env.img.data[(env.y * env.img.width * 4) + (env.x * 4) + 2] = env.color.b * res % 256;
	env.img.data[(env.y * env.img.width * 4) + (env.x * 4) + 3] = 255;
}

const drawFractal = (env) => {
	env.ctx.clearRect(0, 0, canvas.width, canvas.height);

	env.img = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for (env.x = 0; env.x < WIN_SIZE; ++env.x) {
		for (env.y = 0; env.y < WIN_SIZE; ++env.y) {
			const res = calculateFractal(env);
			setPixel(env, res);
		}
	}

	env.ctx.putImageData(env.img, 0, 0);
};
