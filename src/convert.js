/* eslint-disable camelcase */

import * as yup from 'yup';
import { searchPath, calcRatio } from './utils';

export default (ratioGraph, task) => {
  const schema = yup.object().shape({
    distance: yup.object()
      .shape({
        unit: yup.string().required().min(1),
        value: yup.number().required(),
      })
      .defined(),
    convert_to: yup.string().required().min(1),
  });

  try {
    schema.validateSync(task, { strict: true });
  } catch (error) {
    throw new Error(`Incorrent convertion task format (${error.message})`);
  }

  const { distance: { unit, value }, convert_to } = task;

  const path = searchPath(ratioGraph, unit, convert_to);

  if (path.length === 0) {
    throw new Error(`Unable to convert '${unit}' to '${convert_to}'`);
  }

  if (path.length === 1) {
    return { unit, value: Math.round(value * 100) / 100 };
  }

  const convertationRatio = calcRatio(ratioGraph, path);
  const resultedValue = convertationRatio * value;

  return { unit: convert_to, value: Math.round(resultedValue * 100) / 100 };
};
