function splitTerms(monomials) {
  return monomials
    .replace(/\-|\+/g, match => `,${match}`)
    .split(',')
    .reverse()
    .map(m => parseInt(m.split('x')[0]));
}

function ƒ(x) {
    return {
      of(polynomial) {
        return polynomial.map((coeff, expo) => coeff * Math.pow(x, expo));
      }
    }
}

function Polynomial(entry) {
  const terms = splitTerms(entry);
  const degree = terms.length - 1;

  const props = {
    terms,
    entry,
    degree
  };

  return {
  };
}
