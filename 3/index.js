const fs = require('fs')

const input = fs.readFileSync('./3/input.txt', { encoding: 'utf-8' })
const grid = input.split('\n')

const numberOfTreesEncountered = (grid, [xCoord, yCoord]) => {
  let treeCounter = 0
  /**
   * loop through row xCoord at a time
   * increment column by yCoord and check current character
   * if current character === '#' // tree
   * increment tree counter
   * repeat till end of y-grid
   */
  for (let row = 0, col = 0; row < grid.length; row += yCoord) {
    if (grid[row][col] === '#')
      treeCounter++

    col = (col + xCoord) % (grid[0].length - 1)
  }

  return treeCounter
}

// part 1 - count number of hit trees based on 3 1 slope
console.log(numberOfTreesEncountered(grid, [3, 1]))
// part 2 - product of all the sample slopes
console.log([[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]].reduce((product, coords) => product * numberOfTreesEncountered(grid, coords), 1))