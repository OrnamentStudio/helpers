const { assert } = require('chai');
const {
  onFrameRequest,
} = require('../dom');


describe('dom', () => {
  it('onFrameRequest', () => {
    let queue = [];

    const processQueue = () => {
      queue.forEach(func => func());
      queue = [];
    };

    const requestAnimationFrame = (func) => {
      queue.push(func);
    };

    let callCount = 0;
    const callback = () => { callCount += 1; };
    const wrapperCallback = onFrameRequest({ requestAnimationFrame }, callback);

    wrapperCallback();
    wrapperCallback();
    wrapperCallback();
    processQueue();

    assert.equal(callCount, 1, 'called only once');

    wrapperCallback();
    wrapperCallback();
    wrapperCallback();
    processQueue();

    assert.equal(callCount, 2, 'called only once after last call');
  });
});
