const juliaSet = (z, env) => add(sqr(z), env.c);
const mandelbrotSet = (z, env) => add(sqr(z), mapPoint(env));
const buffaloSet = (z, env) => add(cAbs(sqr(z)), mapPoint(env));
const tricornSet = (z, env) => add(revImaginary(sqr(z)), mapPoint(env));
