// credits: http://stackoverflow.com/a/33015975
function pipe (firstFn /* ...restFns */) {
  var _ = null;
  var _slice = Array.prototype.slice;
  var restFns = _slice.call(arguments, 1) || [];


  return function exec_fns() {
    var args = _slice.call(arguments, 0, 1);

    return restFns.reduce(function(acc, fn) {
      return fn.call(_, acc);
    }, firstFn.apply(_, args));
  }
}

// HELPERS

function findFactors(val) {
  const num = Math.abs(parseInt(val));

  return Array(num).fill(1)
    .map((n, i) => n + i).filter(n => !(num % n));
}

function ruffini(root, coefficients, degree = 3) {
  const nextPolynomial = lowerDegree(root, coefficients).map((coeff, i) => {
    return (`${coeff >= 0 ? '+' : ''}${coeff}x^${degree - (i + 1)}`).replace('x^0', '');
  }).join('');

  return Polynomial(nextPolynomial);
}

function lowerDegree(root, coefficients) {
  const newCoefficients = [];
  let columnValue;

  coefficients.forEach((coefficient, i) => {
    let result;

    if (i === 0) {
      result = coefficient;
    } else {
      result = coefficient + columnValue;
    }

    columnValue = result * root;
    newCoefficients.push(result);
  });

  return newCoefficients.filter(c => c !== 0);
}

function Δ(a, b = 0, c = 0) {
  return (
    Math.pow(b, 2) - (4 * a * c)
  );
}

function bhaskara(a, b = 0, c = 0) {
  return [
    (-b + Math.sqrt(Δ(a, b, c))) / (2 * a),
    (-b - Math.sqrt(Δ(a, b, c))) / (2 * a)
  ];
}

function hasVariable(term) {
  return term.includes('x');
}

function splitTerms(terms) {
  return terms
    .replace(/\-/g, ',-')
    .replace(/\+/g, ',+')
    .split(',')
    .filter(t => !!t)
    .map(t => t.includes('^') ? t : `${t}^1`);
}

function invertSign(term) {
  return parseInt(term) * (-1);
}

function getCoefficient(term) {
  return parseInt(term.toString().split('x')[0]);
}

function sumCoefficients(termA, termB) {
  return getCoefficient(termA) + getCoefficient(termB);
}

function isolateVariables(terms) {
  return {
    rightSide: terms.filter(hasVariable),
    leftSide: terms.filter((t) => !hasVariable(t)).map(invertSign)
  };
}

function findDegree(monomials) {
  return parseInt(
    monomials
      .map((monomial) => monomial.split('^')[1] || '1')
      .sort()[monomials.length - 1]
  );
}

function findFirstDegreeRoot(terms) {
  const equation = isolateVariables(terms);
  const rightTerm = equation.rightSide.map(sumCoefficients);

  return equation.leftSide / rightTerm;
}

function findThreeOrMoreDegreeRoots(terms, degree) {
  const monomials = splitTerms(terms);
  const positivePossibleRoots = findFactors(monomials[monomials.length - 1]);
  const possibleRoots = [
    ...positivePossibleRoots,
    ...positivePossibleRoots.map(invertSign)
  ];

  const root = possibleRoots.find((val) => {
    return getNumericalValueFor.call({ monomials }, val) === 0;
  });

  return (ruffini(root, monomials.map(getCoefficient), degree)).findRoots();
}

function sanitizeExponentiations(expression) {
  let newExpression = expression;
  const exponentiations = expression.match(/[-0-9]+\^[-0-9]+|\([^]*\)\^[-0-9]+/g);

  exponentiations.forEach(exponentiation => {
    const [base, exponent] = exponentiation.split('^');
    newExpression = newExpression.replace(
      exponentiation,
      exponent === 1 ? base : `+Math.pow(eval(${base}), ${exponent})`
    );
  });

  return newExpression;
}

function replaceX(monomials, value) {
  return monomials.map(
    (m) => m.replace('x', `*(${value}`) + (m.includes('x') ? ')' : '')
  ).join('');
}


// METHODS

function getNumericalValueFor(value) {
  return eval(
    sanitizeExponentiations(replaceX(this.monomials, value))
  );
}

function findRoots() {
  if (this.degree === 1) {
    return findFirstDegreeRoot(this.monomials);
  } else if (this.degree === 2) {
    return bhaskara(
      ...this.monomials.map(getCoefficient)
    );
  } else if (this.degree > 2) {
    return findThreeOrMoreDegreeRoots(this.terms, this.degree);
  }
}

function Polynomial(terms) {
  const monomials = splitTerms(terms);
  const degree = findDegree(monomials);

  const props = {
    terms,
    monomials,
    degree
  };

  return {
    getNumericalValueFor: getNumericalValueFor.bind(props),
    findRoots: findRoots.bind(props),
    toString: () => terms,
  };
}
