const { def, pluck, compose, applyDelimeter, newLigne, processData, header, emptyArray } = require('../index.js');

// test
const fields = ['name', 'city', 'info'];
const rows = [
  { name: 'name1', city: 'city', info: 'some other info' },
  { name: 'name2', city: 'city3', info: 'some other info1' },
  { name: 'name3', city: 'city3', info: 'some other info' },
];

describe('unit test for converting data to csv format', () => {
  it('first dumb test', () => {
    expect(true).toBe(true);
  }),
    it('test head method return first element in array', () => {
      const tab = [1, 2, 3, 4];
      const result = header(tab);
      expect(result).toBe(1);
    });
  it('test for empty array function ', () => {
    const emptyTab = [];
    const shouldBeTrue = emptyArray(emptyTab);
    expect(shouldBeTrue).toBeTruthy();
    const notATable = 3;
    expect(emptyArray(notATable)).toBeFalsy();
  });
  it('test for def function', () => {
    const isUndefined = def(undefined);
    const isNotUndefined = def('string');
    expect(isUndefined).toBeFalsy();
    expect(isNotUndefined).toBeTruthy();
  });
  it('test for pluck function (function get value from object by given key ', () => {
    const objTest = { name: 'abdelwahed', age: 34 };
    const name = pluck('name', objTest);
    const age = pluck('age', objTest);
    expect(age).toBe(34);
    expect(name).toBe('abdelwahed');
  });
  it('test for compose function given list of functions to compse return one function', () => {
    const add1 = x => x + 1;
    const multiByTwo = x => x * 2;
    // create a function for add1 then multByTwo
    const result = compose(multiByTwo, add1);
    expect(typeof result === 'function').toBeTruthy();
    expect(result(1)).toBe(4);
  });
  it('test for applyDelimeter function with default delimeter', () => {
    const str = ['name', 'city', 'info'];
    const result = applyDelimeter(str);
    expect(result).toBe('name,city,info');
  });
  it('test for applyDelimeter function with delimeter assigned ', () => {
    const str = ['name', 'city', 'info'];
    const result = applyDelimeter(str, '\t');
    expect(result).toBe('name\tcity\tinfo');
  });
  it('test for newLigne function to create new add \n for each row', () => {
    const tab = ['1', '2', '3'];
    const result = newLigne(tab);
    const correctResult = '1\n2\n3';
    expect(result).toBe(correctResult);
  });
});

describe('test for processed data', () => {
  it('test procces data method on empty data ', () => {
    const result = processData([], []);
    expect(result).toEqual([]);
  });
  it('test procces data method with header passed', () => {
    const fields = ['name', 'city', 'info'];
    const rows = [
      { name: 'name1', city: 'city', info: 'some other info' },
      { name: 'name2', city: 'city3', info: 'some other info1' },
      { name: 'name3', city: 'city3', info: 'some other info' },
    ];
    const result = processData(rows, fields);
    const mustBe = [
      ['name1', 'city', 'some other info'],
      ['name2', 'city3', 'some other info1'],
      ['name3', 'city3', 'some other info'],
    ];
    expect(result).toEqual(mustBe);
  });
});
