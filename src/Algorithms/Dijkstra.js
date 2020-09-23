// Returns all nodes in the order in which they were visited.
// Also makes nodes point back to their previous node,
// allowing us to compute the shortest path by backtracking
// from the finish node.
export function dijkstra(grid, startNode, finishNode) {
  startNode.distance = 0;
  const visitedNodesInOrder = [];
  const unvisitedNodes = getNodes(grid);
  let sortIt = true;

  while (!!unvisitedNodes.length) {
    if (sortIt) {
      quickSortByDistance(unvisitedNodes, 0, unvisitedNodes.length - 1);
    }

    const closestNode = unvisitedNodes.shift();

    // If the closest node is a wall, skip the node and the sorting
    // since none of the distances have changed
    if (closestNode.isWall) {
      sortIt = false;
      continue;
    }

    // If the closest node is at a distance of infinity,
    // we no longer have a way to continue on, therefore we stop
    if (closestNode.distance === Number.POSITIVE_INFINITY) {
      return visitedNodesInOrder;
    }

    sortIt = true;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbours(grid, closestNode);
  }
}

function updateUnvisitedNeighbours(grid, node) {
  const unVisitedNeighbours = getUnvisitedNeighbours(grid, node);
  for (let i = 0; i < unVisitedNeighbours.length; i++) {
    const neighbour = unVisitedNeighbours[i];
    neighbour.distance = node.distance + 1;
    neighbour.prevNode = node;
  }
}

function getUnvisitedNeighbours(grid, node) {
  const unVisitedNeighbours = [];
  const { row, col } = node;

  if (row > 0 && !grid[row - 1][col].isVisited) {
    unVisitedNeighbours.push(grid[row - 1][col]);
  }
  if (col > 0 && !grid[row][col - 1].isVisited) {
    unVisitedNeighbours.push(grid[row][col - 1]);
  }
  if (row < grid.length - 1 && !grid[row + 1][col].isVisited) {
    unVisitedNeighbours.push(grid[row + 1][col]);
  }

  if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited) {
    unVisitedNeighbours.push(grid[row][col + 1]);
  }

  return unVisitedNeighbours;
}

// Backtracks from the finishNode to find the shortest path.
// Only works after dijkstra is already called
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;

  while (currentNode != null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.prevNode;
  }

  return nodesInShortestPathOrder;
}

function quickSortByDistance(array, start, end) {
  if (start < end) {
    let partitionIdx = partition(array, start, end);
    quickSortByDistance(array, start, partitionIdx - 1);
    quickSortByDistance(array, partitionIdx + 1, end);
  }
}

function partition(array, start, end) {
  let pivot = array[end].distance;
  let partitionIdx = start;

  for (let i = start; i < end; i++) {
    if (array[i].distance <= pivot) {
      swap(array, i, partitionIdx);
      partitionIdx++;
    }
  }

  swap(array, partitionIdx, end);
  return partitionIdx;
}

function swap(array, idx1, idx2) {
  const temp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = temp;
}

function getNodes(grid) {
  const nodes = [];
  for (let i = 0; i < grid.length; i++) {
    const currentRow = grid[i];
    for (let j = 0; j < currentRow.length; j++) {
      nodes.push(currentRow[j]);
    }
  }

  return nodes;
}
