const fs = require('fs')

const input = fs.readFileSync('./1/input.txt', { encoding: 'utf-8' })
const expenses = input.split('\n').map(expense => parseInt(expense))
const findExpensesThatSumTo2020 = expenses => {
  for (let i = 0; i < expenses.length; i++)
    for (let j = 0; j < expenses.length; j++) {
      const sum = expenses[i] + expenses[j]

      if (sum === 2020)
        return console.log(`${expenses[i]} * ${expenses[j]} = ${expenses[i] * expenses[j]}`)
    }

  console.log('No expenses that sum to 2020 that could be multiplied together.')
}

const find3ExpensesThatSumTo2020 = expenses => {
  const map = {}

  for (let i = 0; i < expenses.length; i++)
    for (let j = 0; j < expenses.length; j++) {
      const indicies = `${i}@${j}`
      const sum = expenses[i] + expenses[j]

      if (!map.hasOwnProperty(sum))
        map[sum] = indicies
    }

  for (let i = 0; i < expenses.length; i++) {
    const diff = (2020 - expenses[i]).toString()

    if (map.hasOwnProperty(diff)) {
      const [j, k] = map[diff].split('@')

      return console.log(`${expenses[i]} * ${expenses[j]} * ${expenses[k]} = ${expenses[i] * expenses[j] * expenses[k]}`)
    }
  }

  console.log('No 3 expenses that sum to 2020 that could be multiplied together.')
}

findExpensesThatSumTo2020(expenses)
find3ExpensesThatSumTo2020(expenses)