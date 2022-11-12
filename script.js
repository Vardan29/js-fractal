const ctx = canvas.getContext("2d");

const init = () => {
	const env = {
		ctx,
		fractal: 2,
		c: initComplex(0.284, -0.120)
	};
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	initEnv(env);
	drawFractal(env);

	document.addEventListener('keydown', (e) => onKeyPress(e, env), false);
	canvas.addEventListener('mousemove', (e) => onMouseMove(e, env), false);
	window.addEventListener('wheel', (e) => onScroll(e, env), false);
};

init();
