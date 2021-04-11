var assert = require('assert');
// var add = require('../add.js').add;
// var mul = require('../add.js').mul;
import { add, mul } from '../add.js'

describe("add function testing", () => {
  it('1 + 2 shoulc be 3', function () {
    assert.equal(add(1, 2), 3);
  });

  it('5 + 6 shoulc be 11', function () {
    assert.equal(add(5, 6), 11);
  });
  it('5 * 6 shoulc be 30', function () {
    assert.equal(mul(5, 6), 30);
  });


})
