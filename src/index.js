import fs from 'fs';
import initRatioBase from './init';
import convertRatio from './convert';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

export default (convertTaskFilePath, extendTaskFilePath) => {
  try {
    const convertTaskFile = readFile(convertTaskFilePath);
    const convertTaskData = JSON.parse(convertTaskFile);

    let extendTaskData = {};
    if (extendTaskFilePath) {
      const extendTaskFile = readFile(extendTaskFilePath);
      extendTaskData = JSON.parse(extendTaskFile);
    }

    const ratioBase = initRatioBase(extendTaskData);
    const convertedData = convertRatio(ratioBase, convertTaskData);

    return JSON.stringify(convertedData);
  } catch (error) {
    return JSON.stringify({ error: error.message });
  }
};
