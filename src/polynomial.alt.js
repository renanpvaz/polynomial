import { merge } from './util';
import {
  getCoefficients,
  sum,
  getExpoents,
  bhaskara,
} from './math-util';


export default function Polynomial(entry) {
  let roots = [];
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
      let newRoots;

      if (degree === 1) {
        newRoots = [findBinomialRoot(computed)];
      } else if (degree === 2) {
        newRoots = bhaskara(...computed.reverse())
      } else if (degree > 2) {
        newRoots = (Polynomial(ruffini(degree, -2, computed))).findRoots();
      }

      newRoots.forEach((root) => roots.includes(root) ? null : roots.push(root));
      return roots;
    }
  };
}
