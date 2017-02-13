const compose = (...functions) => data =>
  functions.reduce((value, func) => func(value), data);

const map = f => x =>
  Array.prototype.map.call(x, f);

const filter = f => x =>
  Array.prototype.filter.call(x, f);

const lastOf = (arr) => arr[arr.length - 1];

const merge = (values, indexes) => {
  const newArr = [];

  indexes.forEach((index, i) => {
    newArr[index] = values[i];
  });

  return newArr;
};

export { compose, map, filter, lastOf, merge };
