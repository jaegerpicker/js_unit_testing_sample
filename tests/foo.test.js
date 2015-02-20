var chai = require('chai');
var expect = chai.expect;
var foo = require('../src/foo.js');

describe('Foo', function() {
    describe('Foo exports', function() {
        it("should foo", function() {
            //hi
            expect(foo).to.equal('foo');
        });
    });
});
