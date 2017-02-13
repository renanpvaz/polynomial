import { pipe, filter, map, lastOf, join, notFalsy, reverse } from './util';

const sum = (a, b) => a + b;
const notZero = (number) => number !== 0;

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

const getExpoents = (terms) =>
  pipe(
    getExplicitExpoents,
    (expos) => [...expos, hasFirstDegreeTerm(terms) ? 1 : undefined],
    (expos) => [...expos, hasTI(terms) ? 0 : undefined]
  )(terms);

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

const toMonomial = (coeff, expo) => {
  const sign = coeff > 0 ? '+' : '';
  const suffix = expo !== 1 ? `x^${expo}` : 'x';

  return `${sign}${coeff}${expo > 0 ? suffix : ''}`;
};

const ruffini = (degree, root, ...coefficients) => {
  let columnValue = 0;

  return pipe(
    map(
      (coeff, i) => {
        const result = i === 0 ? coeff : coeff + columnValue;
        columnValue = result * root;

        return result;
      }
    ),
    filter(notFalsy),
    reverse,
    map((coeff, i) => toMonomial(coeff, degree - (i + 1))),
    join('')
  )(coefficients);
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
