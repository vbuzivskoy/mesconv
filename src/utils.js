/* eslint-disable no-param-reassign */

export const addRatios = (graph, ratios) => {
  Object.entries(ratios).forEach(([parentUnit, childrenUnitsAndValues]) => {
    const existedChildrenUnitesAndValues = graph[parentUnit] || {};
    graph[parentUnit] = {
      ...existedChildrenUnitesAndValues,
      ...childrenUnitsAndValues,
    };
    Object.entries(childrenUnitsAndValues).forEach(([unit, value]) => {
      const existedUnitesAndValues = graph[unit] || {};
      graph[unit] = {
        ...existedUnitesAndValues,
        [parentUnit]: 1 / value,
      };
    });
  });
};

export const searchPath = (graph, startNode, goalNode) => {
  if (!graph[startNode] || !graph[goalNode]) {
    return [];
  }

  if (startNode === goalNode) {
    return [startNode];
  }

  const costs = { [startNode]: { cost: 0 } };
  const queue = [];
  const visited = [];
  queue.push(startNode);
  while (queue.length > 0) {
    const currentNode = queue.shift();
    const neighbours = Object.keys(graph[currentNode]);
    neighbours.forEach((neighbour) => {
      if (neighbour !== goalNode
        && !visited.includes(neighbour)
        && !queue.includes(neighbour)) {
        queue.push(neighbour);
      }
      const currentCost = costs[currentNode].cost + 1;
      if (neighbour !== costs[currentNode].parent
        && (!costs[neighbour] || currentCost < costs[neighbour].cost)) {
        costs[neighbour] = { cost: currentCost, parent: currentNode };
      }
    });
    visited.push(currentNode);
  }

  if (!costs[goalNode]) {
    return [];
  }

  const path = [goalNode];
  let parnetNode = costs[goalNode].parent;
  while (parnetNode !== startNode) {
    path.unshift(parnetNode);
    parnetNode = costs[parnetNode].parent;
  }

  return [startNode, ...path];
};

export const calcRatio = (graph, path) => {
  const result = path.reduce((acc, unit, index) => {
    if (index === path.length - 1) {
      return acc;
    }

    const nextUnit = path[index + 1];
    return acc * graph[unit][nextUnit];
  }, 1);

  return result;
};
