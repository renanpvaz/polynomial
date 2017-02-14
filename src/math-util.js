import { pipe, filter, map, lastOf, join, notFalsy, reverse, Maybe, match } from './util';

const sum = (a, b) => a + b;
const notZero = (number) => number !== 0;

const Δ = (a, b = 0, c = 0) => Math.pow(b, 2) - (4 * a * c);

const bhaskara = pipe(
  Δ,
  Math.sqrt,
  (val) => [(-b + val) / (2 * a), (-b - val) / (2 * a)],
  (roots) => roots[0] === roots[1] ? [roots.shift()] : roots
);

const splitOnSigns = pipe(
  (exp) => exp.replace(/\-|\+/g, match => `,${match}`),
  (exp) => exp.split(','),
  filter(notFalsy)
);

const getExplicitExpoents = pipe(
  match(/\^[0-9]/g),
  Maybe.of,
  map(m => parseInt(m.substr(1, 1)))
);

const getCoefficients = pipe(
  splitOnSigns,
  map(term => parseInt(term)),
  map(term => isNaN(term) ? 1 : term)
);

const hasTI = pipe(
  splitOnSigns,
  lastOf,
  (lastTerm) => !lastTerm.includes('x')
);

const hasFirstDegreeTerm = pipe(
  splitOnSigns,
  filter(term => !term.includes('^') && term.includes('x'))
);

const getExpoents = pipe(
  getExplicitExpoents,
  (expos) => [...expos, hasFirstDegreeTerm(terms) ? 1 : undefined],
  (expos) => [...expos, hasTI(terms) ? 0 : undefined]
);

const findFactors = pipe(
  Math.abs,
  Array,
  (arr) => arr.fill(1),
  map(sum),
  filter(n => !(number % n))
);

const toMonomial = (coeff, expo) => {
  const sign = coeff > 0 ? '+' : '';
  const suffix = expo !== 1 ? `x^${expo}` : 'x';

  return `${sign}${coeff}${expo > 0 ? suffix : ''}`;
};

const ruffini = (degree, root, coefficients) => {
  let columnValue = 0;

  return pipe(
    reverse,
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

const findBinomialRoot = (terms) =>
  pipe(
    reverse,
    ([a, TI]) => (parseInt(TI) * (-1)) / parseInt(a)
  )(terms);

export {
  bhaskara,
  Δ,
  findBinomialRoot,
  findFactors,
  splitOnSigns,
  hasFirstDegreeTerm,
  hasTI,
  getCoefficients,
  getExplicitExpoents,
  sum
};
