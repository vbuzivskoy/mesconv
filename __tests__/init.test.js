import path from 'path';
import fs from 'fs';
import initBase from '../src/init';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Initialization tests', () => {
  test('Should work: default init', () => {
    const expectedResult = {
      m: { cm: 100 },
      cm: { m: 0.01, in: 0.4081632653061224 },
      in: { cm: 2.45, ft: 0.08333333333333333 },
      ft: { in: 12 },
    };
    const recievedResult = initBase();
    expect(recievedResult).toEqual(expectedResult);
  });

  test('Should work: extended init', () => {
    const extendFixtureFile = readFixture('extend.json');
    const extendFixtureData = JSON.parse(extendFixtureFile);
    const expectedResult = {
      m: { cm: 100, mm: 1000, km: 0.001 },
      cm: { m: 0.01, in: 0.4081632653061224 },
      in: { cm: 2.45, ft: 0.08333333333333333 },
      ft: { in: 12, yd: 0.3333333333333333 },
      yd: { ft: 3 },
      mm: { m: 0.001 },
      km: { m: 1000 },
    };
    const recievedResult = initBase(extendFixtureData);
    expect(recievedResult).toEqual(expectedResult);
  });
});
