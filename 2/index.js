const fs = require('fs')

const input = fs.readFileSync('./2/input.txt', { encoding: 'utf-8' })
const policyPasswordCombo = input.split('\n')

const countValidPasswordBasedOnPolicy = (policyPasswordCombo = [], partOfQuestion) => {
  const validPasswordCount = policyPasswordCombo.reduce((validCount, combo = '') => {
    const isPart1 = partOfQuestion === 'part1'
    const [policy, password] = combo.split(':')
    const [minMax, letter] = policy.split(' ')
    const [min, max] = minMax.split('-') // letter count for part 1 | letter index + 1 for part 2
    let letterCounter = 0

    const trimmedPassword = password.trim()

    for (let i = 0; i < trimmedPassword.length; i++) {
      const isPolicyVerified = isPart1
        ? trimmedPassword[i] === letter
        : letter === trimmedPassword[i] && (i + 1 == min || i + 1 == max)

      if (isPolicyVerified)
        letterCounter++
    }

    const doesPasswordPassPolicy = isPart1
      ? parseInt(min) <= letterCounter && letterCounter <= parseInt(max)
      : letterCounter === 1

    return doesPasswordPassPolicy ? ++validCount : validCount
  }, 0)

  console.log(validPasswordCount)
}

countValidPasswordBasedOnPolicy(policyPasswordCombo, 'part1')
countValidPasswordBasedOnPolicy(policyPasswordCombo, 'part2')

/**
 * pw policy = min-max letter: pw
 *
 * - split by the : and trim pw
 * - split ^[0] by the ' ' to get letter
 * - split ^[0] by the - to get the min and max
 *
 * After you've parsed the input
 * - count the number of letters in the pw
 * - check if min <= count <= max
 */

