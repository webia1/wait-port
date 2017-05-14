const assert = require('assert');
const extractTarget = require('./extract-target');

describe('extractTarget', () => {
  it('should throw if no target is provided', () => {
    assert.throws(() => extractTarget(), /target/);
  });

  it('should throw if more than one separator is used', () => {
    assert.throws(() => extractTarget('host:port:wtf'), /invalid/);
  });

  it('should throw if a non-numeric port target is provided', () => {
    assert.throws(() => extractTarget('808O', /number/));
  });

  it('should throw if a non-numeric :port target is provided', () => {
    assert.throws(() => extractTarget(':808O', /number/));
  });

  it('should throw if a non-numeric host:port target is provided', () => {
    assert.throws(() => extractTarget('host:808O', /number/));
  });

  it('should extract a valid port', () => {
    const { port, host } = extractTarget('8080');
    assert.strictEqual(port, 8080);
    assert.strictEqual(host, undefined);
  });

  it('should extract a valid :port', () => {
    const { port, host } = extractTarget(':8080');
    assert.strictEqual(port, 8080);
    assert.strictEqual(host, undefined);
  });

  it('should extract a valid host:port', () => {
    const { port, host } = extractTarget('127.0.0.1:8080');
    assert.strictEqual(port, 8080);
    assert.strictEqual(host, '127.0.0.1');
  });
});