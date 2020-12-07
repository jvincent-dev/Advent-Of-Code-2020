const fs = require('fs')
const input = fs.readFileSync('./6/input.txt', { encoding: 'utf-8' })

const questionGroups = input.split('\r\n\r\n')
const calculateYesCount = part => questionGroups.reduce((sum, questionGroup) => {
  const map = {}

  for (let i = 0; i < questionGroup.length; i++) {
    const question = questionGroup[i]

    if (/^[a-z]$/.test(question))
      if (!map.hasOwnProperty(question)) {
        map[question] = 1

        if (part === 'part1') // count unique questions where answer is yes
          sum++
      } else if (part === 'part2')
        map[question]++
  }

  if (part === 'part2') {
    const numberOfPeopleInGroup = questionGroup.split('\r\n').length

    Object.values(map).forEach(value => {
      if (value === numberOfPeopleInGroup) // count questions where everyone said yes
        sum++
    })
  }

  return sum
}, 0)

console.log(calculateYesCount('part1'))
console.log(calculateYesCount('part2'))

/** part 2
 * break up group questions
 * count group question yeses
 * loop through each person's question count
 *  if question count === parsedGroupQuestion
 *   add to sum
 */