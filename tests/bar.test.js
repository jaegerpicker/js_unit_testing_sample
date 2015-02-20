var chai = require('chai');
var sinon = require('sinon');
var bar = require('../src/bar.js');

var expect = chai.expect;

describe("Bar", function() {
    describe("Bar says hello", function() {
        it("should say: Hello <name_passed_in>!", function() {
            expect(bar.hello('Shawn')).to.equal('Hello Shawn!');
        });
        it("should throw an error if no name is passed in", function() {
            expect(function() { bar.hello(null); }).to.throw(Error);
        });
    });
    describe("Bar delays hello", function() {
        it("should delay saying hello by one second", function(done) {
            (bar.delayedHello('Shawn', function(err, name) {
                expect(name).to.equal("Hello Shawn!");
                done();
            }))
        });
    });
    describe("Bar prints your name", function() {
        it("should print your name to console and return true", function() {
            expect(bar.printName(function() {console.log('Shawn')})).to.equal(true);
        });
    });
    describe("Bar prints your name-mocked", function() {
        it("should not print your name to the console and return true", function() {
            var mock = sinon.mock(bar);
            mock.expects("printName").returns(false);
            var ret = bar.printName(function() { console.log('Shawn-Mock'); });
            expect(ret).to.equal(false);
            mock.verify();
        });
    });
});
