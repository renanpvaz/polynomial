import { expect } from 'chai';
import { findFactors, Δ, bhaskara } from './util.js';

describe('#findFactors()', () => {
  it('should find all three factors of 4', () => {
    expect([1, 2, 4]).to.deep.equal(findFactors(4));
  });

  it('should have 1 as a factor', () => {
    const randomInteger = Math.round(Math.random() * 10);

    expect(findFactors(randomInteger)).to.include(1);
  });

  it('should find 1 and itself, when prime', () => {
    const randomIndex = Math.round(Math.random() * 10);
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    const selected = primes[randomIndex];

    expect(findFactors(selected)).to.deep.equal([1, selected]);
  });
});

describe('#Δ()', () => {
  it('should calculate correctly', () => {
    expect(Δ(1, 1, 1)).to.equal(-3);
  });

  it('should use 0 as default for b and c', () => {
    expect(Δ(1)).to.equal(0);
  });

  it('should need at least one param', () => {
    expect(Δ()).to.be.NaN;
  });
});

describe('#bhaskara()', () => {
  it('should find only one root when Δ = 0', () => {
    expect(bhaskara(1, 2, 1)).to.deep.equal([-1]);
  });

  it('should not accept negative deltas', () => {
    expect(bhaskara(1, 1, 1)).to.deep.equal([NaN, NaN]);
  });

  it('should find two roots when Δ > 0', () => {
    expect(bhaskara(1, 0, -1).length).to.equal(2);
  });

  it('should find two different roots when Δ > 0', () => {
    expect(bhaskara(-1, 2, 0)[0]).to.equal(0);
    expect(bhaskara(-1, 2, 0)[1]).to.equal(2);
  });
});
