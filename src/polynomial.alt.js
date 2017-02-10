import { merge } from 'util';
import {
  getCoefficients,
  getExplicitExpoents,
  hasFirstDegreeTerm,
  hasTI,
  sum,
} from 'math-util';

export default function Polynomial(entry) {
  const computed = merge(
    getCoefficients(entry),
    [
      ...getExplicitExpoents(entry),
      hasFirstDegreeTerm(entry) ? 1 : undefined,
      hasTI(entry) ? 0 : undefined
    ]
  );

  const numericalValueFor = (x) => computed
    .map((coeff, expo) => coeff * Math.pow(x, expo))
    .reduce(sum);

  return {
    numericalValueFor,
    getComputed: () => computed,
  };
}
