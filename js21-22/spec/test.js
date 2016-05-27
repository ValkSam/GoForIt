/**
 * Created by Valk on 26.05.2016.
 */
var t1 = require('../src/jsFromTaskJs1/task1.js');
var t2 = require('../src/jsFromTaskJs1/task2.js');

describe("A suite", function() {
    var nameArray = ['1Вася', 'Петя', 'Ли'];
    it("test pow", function() {
        //prepare
        //act
        //assert
        expect(t1.pow(2, 4)).toEqual(Math.pow(2, 4));
        expect(t1.pow(-2, 4)).toEqual(Math.pow(-2, 4));
        expect(t1.pow(-2, 3)).toEqual(Math.pow(-2, 3));
        expect(t1.pow(2, 1)).toEqual(Math.pow(2, 1));
        expect(t1.pow(2, 0)).toEqual(Math.pow(2, 0));
        expect(t1.pow(0, 3)).toEqual(Math.pow(0, 3));
        expect(t1.pow(2, -4)).toEqual(Math.pow(2, -4));
        expect(t1.pow(-2, -5)).toEqual(Math.pow(-2, -5));
        expect(t1.pow(-3, 5555)).toEqual(Math.pow(-3, 5555));
        expect(t1.pow(-2, "a")).toEqual(Math.pow(-2, "a"));
        expect(t1.pow("-2s", 2)).toEqual(Math.pow("-2s", 2));
        expect(t1.pow(null, 2)).toEqual(Math.pow(null, 2));
        expect(t1.pow(2, null)).toEqual(Math.pow(2, null));
        expect(t1.pow(undefined, 2)).toEqual(Math.pow(undefined, 2));
        expect(t1.pow(2, undefined, 2)).toEqual(Math.pow(2, undefined));
    });
    it("test nameInput testing", function() {
        expect(t2.testNameInput(nameArray[0])).toBe(false);
        expect(t2.testNameInput(nameArray[1])).toBe(true);
        expect(t2.testNameInput(nameArray[2])).toBe(false);
    });
    it("test name testing", function() {
        expect(t2.checkName(nameArray, 'Петя')).toBe(true);
        expect(t2.checkName(nameArray, 'петя')).toBe(true);
        expect(t2.checkName(nameArray, 'ПЕТЯ')).toBe(true);
        expect(t2.checkName(nameArray, 'Машя')).toBe(false);
    });
});