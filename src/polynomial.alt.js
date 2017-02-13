import { merge } from './util';
import {
  getCoefficients,
  sum,
  getExpoents,
} from './math-util';


export default function Polynomial(entry) {
  const computed = merge(
    getCoefficients(entry),
    getExpoents(entry)
  );

  return {
    numericalValueFor(x) {
      return computed
        .map((coeff, expo) => coeff * Math.pow(x, expo))
        .reduce(sum);
    },
    getComputed: () => computed,
  };
}
