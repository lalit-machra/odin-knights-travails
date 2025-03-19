function validSteps(loc) {
  let x, y;
  if (typeof loc === 'string') {
    loc = [+loc[0], +loc[1]];
  }
  [x, y] = loc;
  let stepsArr = [];
  let xArr = [2, -2];
  let yArr = [1, -1];
  xArr.forEach((xVal) => {
    yArr.forEach((yVal) => {
      if ((x + xVal >= 0) && (x + xVal < 8)
        && (y + yVal >= 0) && (y + yVal < 8)) {
          stepsArr.push(((x + xVal).toString() + (y + yVal).toString()));
      }
      if ((x + yVal >= 0) && (x + yVal < 8)
        && (y + xVal >= 0) && (y + xVal < 8)) {
          stepsArr.push(((x + yVal).toString() + (y + xVal).toString()));
      }
    });
  });
  return stepsArr;
}

function allMoves(loc1, loc2, adjacencyList, visited) {
  let queue = [];
  let strLoc1 = loc1[0].toString() + loc1[1].toString();
  queue.push(strLoc1);
  let strLoc2 = loc2[0].toString() + loc2[1].toString();

  let found = false;
  let level = 0;
  let childAtSameLvl = 0;
  let total = 0;
  let foundLvl;
  let children;
  for (let i = 0; i < queue.length; ) {
    if (level > 6) {  // Knight needs max of 6 steps to reach any point from a starting point
      break;
    }
    let first = queue.shift();
    
    // Check if current node is already visited
    for (let i = 0; i < visited.length; i++) {
      if (visited[i] === first) {
        continue;   // Move ahead if already visited
      }
    }
    visited.push(first);

    if (level !== 0) {
      childAtSameLvl -= 1;
    }

    if (!foundLvl || foundLvl === level) {   // Either we shouldn't have found, in case we had found strLoc2, run code under if block
      children = validSteps(first);      // only for nodes at same level
      for (let i = 0; i < children.length; i++) {
        if (children[i] === strLoc2) {
          if (!adjacencyList.get(first)) {
            adjacencyList.set(first, [children[i]]);
            found = true;
            foundLvl = level;
          }
          continue;
        }
      }
    }
    
    if (!found) {
      adjacencyList.set(first, []);
      let visitedChild;
      children.forEach((child) => {
        visitedChild = false;
        for (let i = 0; i < visited.length; i++) {
          if (visited[i] === child) {
            visitedChild = true;
          }
        }

        if (!visitedChild) {
          adjacencyList.get(first).push(child);
          queue.push(child);
          total += 1;
        }
      });
    }

    if (childAtSameLvl === 0) {
      level++;
      childAtSameLvl = total;
      total = 0;
    }
  }
  console.log("done");
}

function knightMoves(loc1, loc2) {
  let visited = [];
  let adjacencyList = new Map();
  allMoves(loc1, loc2, adjacencyList, visited);
  console.log(adjacencyList);
  // console.log(visited);
}

knightMoves([0, 0], [7, 7]);