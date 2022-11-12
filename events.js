const onScroll = (e, env) => {
	const delta = Math.sign(e.deltaY);
	if (delta > 0) {
		env.off_x += (e.layerX - WIN_SIZE / 2) / WIN_SIZE * 2 * (env.r - env.r / ZOOM);
		env.off_y += (e.layerY - WIN_SIZE / 2) / WIN_SIZE * 2 * (env.r - env.r / ZOOM);
		env.r /= ZOOM;
	} else if (delta < 0) {
		env.off_x += (e.layerX - WIN_SIZE / 2) / WIN_SIZE * 2 * (env.r - env.r * ZOOM);
		env.off_y += (e.layerY - WIN_SIZE / 2) / WIN_SIZE * 2 * (env.r - env.r * ZOOM);
		env.r *= ZOOM;
	}
	drawFractal(env);
	return (0);
};

const onMouseMove = ({ clientX, clientY }, env) => {
	if (env.lock < 0 || env.fractal != JULIA) {
		return (0);
	}
	env.c.x = (clientX - WIN_SIZE / 2) / WIN_SIZE * 2 * env.r + env.off_x;
	env.c.y = -((clientY - WIN_SIZE / 2) / WIN_SIZE * 2 * env.r + env.off_y);
	drawFractal(env);
	return (0);
};


const onKeyPress = (event, env) => {
	const keyName = event.key.toLowerCase();

	if (keyName == KEY_L) env.lock *= -1;
	else if (keyName == NUMPAD_ZERO) resetParams(env);
	else if (keyName >= '1' && keyName < '5') changeFractal(+keyName, env);
	else if (keyName === KEY_Q || keyName === KEY_W || keyName === KEY_E) addColor(keyName, env);
	else if (keyName === KEY_A || keyName === KEY_S || keyName === KEY_D) subColor(keyName, env);
	else if (keyName === KEY_UP || keyName === KEY_DOWN || keyName === KEY_LEFT || keyName === KEY_RIGHT) move(env, keyName);
	else return (0);
	drawFractal(env);
}
