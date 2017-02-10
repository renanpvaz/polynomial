const compose = (...functions) => data =>
  functions.reduce((value, func) => func(value), data);

const map = f => x =>
  Array.prototype.map.call(x, f);

const filter = f => x =>
  Array.prototype.map.call(x, f);

const lastOf = (arr) => arr[arr.length - 1];

const getExplicitExpoents = (terms) =>
  terms.match(/\^[0-9]/g).map((m) => parseInt(m.substr(1, 1)));

const getCoefficients = (terms) =>
  compose(
    splitOnSigns,
    map(term => parseInt(term)),
    map(term => isNaN(term) ? 1 : term)
  )(terms);

const hasTI = (terms) =>
  compose(
    splitOnSigns,
    lastOf,
    (lastTerm) => !lastTerm.includes('x')
  )(terms);

const hasFirstDegreeTerm = (terms) =>
  compose(
    splitOnSigns,
    filter(term => !term.includes('^') && term.includes('x'))
  )(terms);

const splitOnSigns = (expression) =>
  expression.replace(/\-|\+/g, match => `,${match}`).split(',');

const merge = (values, indexes) => {
  const newArr = [];

  indexes.forEach((index, i) => {
    newArr[index] = values[i];
  });

  return newArr;
};

// function ƒ(x) {
//     return {
//       of(polynomial) {
//         return polynomial.map((coeff, expo) => coeff * Math.pow(x, expo));
//       }
//     }
// }

function Polynomial(entry) {
  const computed = merge(
    getCoefficients(entry),
    [
      ...getExplicitExpoents(entry),
      hasFirstDegreeTerm(entry) ? 1 : undefined,
      hasTI(entry) ? 0 : undefined
    ]
  );

  return {
    numericalValueFor: (x) => ƒ(x).of(terms),
    computed
  };
}
