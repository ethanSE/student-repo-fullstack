/* eslint-disable no-else-return */
/** Exercise 01 - Fizzbuzz

Write a program that writes all the numbers from 1 to 100, with some exceptions:
- For numbers divisible by 3, print “fizz”
- For numbers divisible by 5 (but not 3), print “buzz”
- For numbers divisible by 3 and 5, print “fizzbuzz”

Use console.log() to write the proper output to the command line.

* */
const branch = (i) => {
  if (i % 15 === 0) {
    return 'fizzbuzz';
  } else if (i % 3 === 0) {
    return 'fizz';
  } else if (i % 5 === 0) {
    return 'buzz';
  } else {
    return i;
  }
};

const fizzbuzz = () => {
  const a = Array.from(new Array(100).keys(), (n) => branch(n + 1));
  a.forEach((e) => console.log(e));
};

fizzbuzz();
