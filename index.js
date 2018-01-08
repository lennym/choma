const Mocha = require('mocha');
const shuffle = require('lodash.shuffle');

const run = Mocha.prototype.run;
const each = Mocha.Suite.prototype.eachTest;

Mocha.prototype.run = function () {
  this.files = shuffle(this.files);
  return run.apply(this, arguments);
};

Mocha.Suite.prototype.eachTest = function () {
  this.tests = shuffle(this.tests);
  this.suites = shuffle(this.suites);
  return each.apply(this, arguments);
};
