import {
  pipe,
  curry,
  filter,
  map,
  lastOf,
  join,
  notFalsy,
  reverse,
  Maybe,
  match,
} from './util';

const sum = (a, b) => a + b;
const notZero = (number) => number !== 0;

const bhaskara = (a, b, c) => {
  const delta = Math.sqrt(Math.pow(b, 2) - (4 * a * c));
  const roots = [
    (-b + delta) / (2 * a),
    (-b - delta) / (2 * a)
  ];

  return roots[0] === roots[1] ? [roots.shift()] : roots;
};

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

const getIntegersUntil = pipe(
  Math.abs,
  Array,
  (arr) => arr.fill(1),
  map(sum)
);

const findFactors = pipe(
  Math.abs,
  Array,
  (arr) => arr.fill(1),
  map(sum),
  filter((n, i, arr) => !(arr[arr.length - 1] % n))
);

const toMonomial = (coeff, expo) => {
  const sign = coeff > 0 ? '+' : '';
  const suffix = expo !== 1 ? `x^${expo}` : 'x';

  return `${sign}${coeff}${expo > 0 ? suffix : ''}`;
};

const findBinomialRoot = pipe(
  reverse,
  ([a, TI]) => (parseInt(TI) * (-1)) / parseInt(a)
);

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


export {
  bhaskara,
  findBinomialRoot,
  findFactors,
  splitOnSigns,
  hasFirstDegreeTerm,
  hasTI,
  getCoefficients,
  getExplicitExpoents,
  sum
};
