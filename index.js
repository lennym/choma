const Mocha = require('mocha');
const shuffle = require('lodash.shuffle');

const run = Mocha.prototype.run;

Mocha.prototype.run = function () {
  this.files = shuffle(this.files);
  return run.apply(this, arguments);
};
