import { pipe, filter, map, lastOf } from './util';

const sum = (a, b) => a + b;

const getExplicitExpoents = (terms) =>
  terms.match(/\^[0-9]/g).map((m) => parseInt(m.substr(1, 1)));

const getCoefficients = (terms) =>
  pipe(
    splitOnSigns,
    map(term => parseInt(term)),
    map(term => isNaN(term) ? 1 : term)
  )(terms);

const hasTI = (terms) =>
  pipe(
    splitOnSigns,
    lastOf,
    (lastTerm) => !lastTerm.includes('x')
  )(terms);

const hasFirstDegreeTerm = (terms) =>
  pipe(
    splitOnSigns,
    filter(term => !term.includes('^') && term.includes('x'))
  )(terms);

const splitOnSigns = (expression) =>
  expression.replace(/\-|\+/g, match => `,${match}`).split(',');

const findFactors = (number) =>
  pipe(
    Math.abs,
    Array,
    (arr) => arr.fill(1),
    map(sum),
    filter(n => !(number % n))
  )(number);

const Δ = (a, b = 0, c = 0) => Math.pow(b, 2) - (4 * a * c);

const bhaskara = (a, b = 0, c = 0) => {
  const delta = Δ(a, b, c);
  const roots = [
    (-b + Math.sqrt(delta)) / (2 * a),
    (-b - Math.sqrt(delta)) / (2 * a)
  ];

  return roots[0] === roots[1] ? [roots.shift()] : roots;
};

export {
  bhaskara,
  Δ,
  findFactors,
  splitOnSigns,
  hasFirstDegreeTerm,
  hasTI,
  getCoefficients,
  getExplicitExpoents,
  sum
};
