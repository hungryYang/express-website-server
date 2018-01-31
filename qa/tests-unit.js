const fortune = require('../lib/fortune');
const expect = require('chai').expect;

suite('Fortune cookie tests',()=>{
  test('getFortune() should return a fortune',()=>{
    expect(typeof  fortune.getFortunes() === 'string');
  });
});