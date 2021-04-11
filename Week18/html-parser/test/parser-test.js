var assert = require('assert');
// var add = require('../add.js').add;
// var mul = require('../add.js').mul;
import { parseHTML } from '../src/parser.js'

describe("parse html", () => {
  it('<a></a>', function () {
    let tree = parseHTML('<a></a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].children.length, 0);
  });
  it('<a />', function () {
    let tree = parseHTML('<a />');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].children.length, 0);
  });
  it('<a/>', function () {
    let tree = parseHTML('<a/>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<>', function () {
    let tree = parseHTML('<>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].type, "text");
  });

  it('<></>', function () {
    let tree = parseHTML('<></>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].type, "text");
  });

  it('<A />', function () {
    let tree = parseHTML('<A />');
    assert.strictEqual(tree.children[0].tagName, 'A');
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a href="aaa"></a>', function () {
    let tree = parseHTML('<a href="aaa"></a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });
  it('<a href= "aaa" ></a>', function () {
    let tree = parseHTML('<a href= "aaa" ></a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a href = "aaa" ></a>', function () {
    let tree = parseHTML('<a href = "aaa" ></a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a href="aaa">link</a>', function () {
    let tree = parseHTML('<a href="aaa">link</a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
  });

  it('<a href="//time.geekbang.org" class="cls" ></a>', function () {
    let tree = parseHTML('<a href="//time.geekbang.org" class="cls" ></a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a href="aaa"  class="cls" ></a>', function () {
    let tree = parseHTML('<a href="aaa"  class="cls" ></a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a href ></a>', function () {
    let tree = parseHTML('<a href ></a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a href id></a>', function () {
    let tree = parseHTML('<a href ></a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a href id></a>', function () {
    let tree = parseHTML('<a href id></a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });


  it('<a id=i ></a>', function () {
    let tree = parseHTML('<a id=i ></a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a id=abc></a>', function () {
    let tree = parseHTML('<a id=abc></a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a id=abc/>', function () {
    let tree = parseHTML('<a id=abc/>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a id=\'abc\'/>', function () {
    let tree = parseHTML('<a id=\'abc\'/>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('Exception case: <a id="abc""\>', function () {
    function fn(params) {
      parseHTML('<a id="abc""/>');
    }
    assert.throws(fn);
  });


  it('Exception case: <a id="abc"></b>', function () {
    function fn(params) {
      parseHTML('<a id="abc"></b>');
    }
    assert.throws(fn);
  });
})
