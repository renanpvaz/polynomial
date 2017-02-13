import { merge } from './util';
import {
  getCoefficients,
  sum,
  getExpoents,
  bhaskara,
} from './math-util';


export default function Polynomial(entry) {
  const roots = [];
  const computed = merge(
    getCoefficients(entry),
    getExpoents(entry)
  );
  const degree = computed.length - 1;

  return {
    numericalValueFor(x) {
      return computed
        .map((coeff, expo) => coeff * Math.pow(x, expo))
        .reduce(sum);
    },
    getComputed() {
      return computed;
    },
    findRoots() {
      if (degree === 1) {
        return findFirstDegreeRoot(monomials);
      } else if (degree === 2) {
        return bhaskara(...computed.reverse());
      }
    }
  };
}
