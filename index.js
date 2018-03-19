'use strict';

const Mocha = require('mocha');
const seedrandom = require('seedrandom');
const color = require('chalk');

const run = Mocha.prototype.run;
const each = Mocha.Suite.prototype.eachTest;

const prng = (function() {
  const seed = process.env.CHOMA_SEED || createSeed(10);
  console.log(`${color.grey('choma')}: to re-use this ordering, run tests with ${color.yellow('CHOMA_SEED=' + seed)}`);
  return seedrandom(seed);
}());

Mocha.prototype.run = function () {
  shuffle(this.files);
  return run.apply(this, arguments);
};

Mocha.Suite.prototype.eachTest = function () {
  shuffle(this.tests);
  shuffle(this.suites);
  return each.apply(this, arguments);
};

function shuffle(array) {
  if (array == null || !array.length) return;

  let index = -1;
  const length = array.length;
  const lastIndex = length - 1;
  while (++index < length) {
    const rand = index + Math.floor(prng() * (lastIndex - index + 1));
    const value = array[rand];
    array[rand] = array[index];
    array[index] = value;
  }
}

function createSeed(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}
