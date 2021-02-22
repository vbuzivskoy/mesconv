import path from 'path';
import fs from 'fs';
import convertRatio from '../src/convert';
import initBase from '../src/init';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let ratioBase;

beforeEach(() => {
  ratioBase = initBase();
});

describe('Convertion tests', () => {
  test('Should work: simple convertion', () => {
    const taskFixtureFile = readFixture('m_to_ft.json');
    const taskFixtureData = JSON.parse(taskFixtureFile);
    const expectedResult = { unit: 'ft', value: 1.7 };
    const recievedResult = convertRatio(ratioBase, taskFixtureData);
    expect(recievedResult).toEqual(expectedResult);
  });

  test('Should work: the same unit', () => {
    const taskFixtureFile = readFixture('m_to_m.json');
    const taskFixtureData = JSON.parse(taskFixtureFile);
    const expectedResult = { unit: 'm', value: 0.33 };
    const recievedResult = convertRatio(ratioBase, taskFixtureData);
    expect(recievedResult).toEqual(expectedResult);
  });

  test('Should throw error of format', () => {
    const taskFixtureFile = readFixture('bad_convert.json');
    const taskFixtureData = JSON.parse(taskFixtureFile);
    const errorMessage = 'Incorrent convertion task format (convert_to is a required field)';
    expect(() => convertRatio(ratioBase, taskFixtureData))
      .toThrow(errorMessage);
  });

  test('Should recieve unable convert error', () => {
    const taskFixtureFile = readFixture('yd_to_mm.json');
    const taskFixtureData = JSON.parse(taskFixtureFile);
    const errorMessage = "Unable to convert 'yd' to 'mm'";
    expect(() => convertRatio(ratioBase, taskFixtureData))
      .toThrow(errorMessage);
  });
});
