
function findFactors(val) {
  const num = Math.abs(parseInt(val));

  return Array(num).fill(1)
    .map((n, i) => n + i).filter(n => !(num % n));
}

function Δ(a, b = 0, c = 0) {
  return (
    Math.pow(b, 2) - (4 * a * c)
  );
}

function bhaskara(a, b = 0, c = 0) {
  const results = [
    (-b + Math.sqrt(Δ(a, b, c))) / (2 * a),
    (-b - Math.sqrt(Δ(a, b, c))) / (2 * a)
  ];

  return results[0] === results[1] ? [results.shift()] : results;
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

export { findFactors, Δ, bhaskara, sanitizeExponentiations };
