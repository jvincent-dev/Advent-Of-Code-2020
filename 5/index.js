const fs = require('fs')
const input = fs.readFileSync('./5/input.txt', { encoding: 'utf-8' })
const binarySpacePartitioning = input.split('\n').map(partition => partition.trim())

const sortedSeatIDs = binarySpacePartitioning.map(boardingPass => {
  const rowRange = [0, 127]
  const colRange = [0, 7]

  for (let i = 0; i < boardingPass.length; i++) {
    const lower = i < 7 ? rowRange[0] : colRange[0]
    const upper = i < 7 ? rowRange[1] : colRange[1]
    const half = lower + Math.floor((upper - lower) / 2)
    const char = boardingPass[i]

    switch (char) {
      case 'F':
        rowRange[1] = half
        break
      case 'B':
        rowRange[0] = half + 1
        break
      case 'L':
        colRange[1] = half
        break
      case 'R':
        colRange[0] = half + 1
        break
      default:
        throw new Error(`Invalid boardingPass Char: ${char}`)
    }
  }

  return rowRange[0] * 8 + colRange[0]
}).sort((a, b) => a - b)

console.log(sortedSeatIDs[sortedSeatIDs.length - 1])

const indexOfSeatBeforeMySeatID = sortedSeatIDs.findIndex((seatID, index) => seatID !== sortedSeatIDs[index + 1] - 1)

console.log(sortedSeatIDs[indexOfSeatBeforeMySeatID], 'my seat', sortedSeatIDs[indexOfSeatBeforeMySeatID + 1])


/**
 * get row
 *   - if F
 *    - range is lower half
 *   - if B
 *    - range is upper half
 * get column
 *   - if L
 *    - range is lower half
 *   - if R
 *    - range is upper half
 * get seatID = row * 8 + col
 */
