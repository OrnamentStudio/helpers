const { assert } = require('chai');
const { bindTo } = require('../lib/utils');


describe('utils', () => {
  it('bindTo', () => {
    const obj = {
      handler() { return this; },
      anotherHandler() { return this; },
    };

    bindTo(obj, 'handler', 'anotherHandler');

    const result1 = obj.handler();
    const result2 = obj.anotherHandler();

    assert.doesNotThrow(bindTo.bind(null, obj, 'undefined'));
    assert.equal(result1, obj, 'bound 1st func');
    assert.equal(result2, obj, 'bound 2nd func');
  });
});
