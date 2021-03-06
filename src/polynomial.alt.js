import { merge } from './util';
import {
  getCoefficients,
  sum,
  getExpoents,
  bhaskara,
  getNumericalValue,
  findPossibleRoots,
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
      return getNumericalValue(computed, x);
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
    },

    _findHigherIndexRoots() {
      const possibleRoots = findPossibleRoots(computed[0]);
      const root = possibleRoots.find(val => this.numericalValueFor(val) === 0);



    }
  };
}
