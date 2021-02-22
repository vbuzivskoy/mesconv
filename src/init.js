import { addRatios } from './utils';

const defaultRatios = {
  m: { cm: 100 },
  in: { cm: 2.45 },
  ft: { in: 12 },
};

export default (extendTask = {}) => {
  const ratioGraph = {};

  addRatios(ratioGraph, defaultRatios);

  const { extend } = extendTask;
  if (extend) {
    addRatios(ratioGraph, extend);
  }

  return ratioGraph;
};
