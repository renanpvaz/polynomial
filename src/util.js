const pipe = (...functions) => data =>
  functions.reduce((value, func) => func(value), data);

const map = f => x =>
  Array.prototype.map.call(x, f);

const filter = f => x =>
  Array.prototype.filter.call(x, f);

const join = str => x =>
  Array.prototype.join.call(x, str);

const reverse = x =>
  Array.prototype.reverse.call(x);

const lastOf = (arr) => arr[arr.length - 1];

const notFalsy = (val) => !!val;

const merge = (values, indexes) => {
  const newArr = [];

  indexes.forEach((index, i) => {
    newArr[index] = values[i];
  });

  return newArr;
};

export { pipe, map, filter, lastOf, merge, join, notFalsy, reverse };
