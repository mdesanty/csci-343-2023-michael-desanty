async function add(a, b) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a === undefined || b === undefined)
        reject(new Error('Both a and b are required.'));

      if (isNaN(a) || isNaN(b))
        reject(new Error('Both a and b must be numbers.'));

      a = parseFloat(a);
      b = parseFloat(b);

      const sum = a + b;
      resolve(sum);
    }, 0);
  });

  return promise;
}

async function subtract(a, b) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a === undefined || b === undefined)
        reject(new Error('Both a and b are required.'));

      if (isNaN(a) || isNaN(b))
        reject(new Error('Both a and b must be numbers.'));

      a = parseFloat(a);
      b = parseFloat(b);
      const difference = a - b;

      resolve(difference);
    }, 0);
  });

  return promise;
}

async function sum(num) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num === undefined)
        reject(new Error('At least one num value is required.'));

      const nums = (num instanceof Array ? num : [num]);

      let sum = 0;
      nums.forEach(n => {
        if (isNaN(n))
          reject(new Error('All num values must be numbers'));

        sum += parseFloat(n);
      });

      resolve(sum);
    }, 0);
  });

  return promise;
}

module.exports = {
  add,
  subtract,
  sum
};