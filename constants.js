const canvas = document.getElementById('fractal');

const KEY_Q = 'q';
const KEY_W = 'w';
const KEY_E = 'e';
const KEY_A = 'a';
const KEY_S = 's';
const KEY_D = 'd';
const KEY_L = 'l';

const NUMPAD_ZERO = '0';

const COLOR_KEYS = {
	'q': 'r',
	'w': 'g',
	'e': 'b',
	'a': 'r',
	's': 'g',
	'd': 'b'
};

const KEY_LEFT = 'arrowleft';
const KEY_RIGHT = 'arrowright';
const KEY_UP = 'arrowup';
const KEY_DOWN = 'arrowdown';

const WIN_SIZE = canvas.width;
const ZOOM = 1.1;
const ITERATIONS = 125;

const BUFFALO = 1;
const MANDELBROT = 2;
const TRICORN = 3;
const JULIA = 4;
