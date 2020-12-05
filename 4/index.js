const fs = require('fs')
const input = fs.readFileSync('./4/input.txt', { encoding: 'utf-8' })

const passports = input.split('\r\n\r').map(passport => passport.trim())
const passportObjectsArray = passports.map(passport => {
  const passportFields = passport.split(/^$|\s+/)

  return passportFields.reduce((passportObject, fieldString) => { // generate passport object
    const [key, value] = fieldString.split(':')

    passportObject[key] = value

    return passportObject
  }, {})
})

const isPassportValid = (passportObj, partType) => {
  const fieldsCount = Object.keys(passportObj).length
  const isKeyCountValid = passportObj.hasOwnProperty('cid') ? fieldsCount === 8 : fieldsCount === 7

  if (partType === 'part1')
    return isKeyCountValid

  const isThereInvalidField = Object.entries(passportObj).some(([key, value]) => {
    switch (key) {
      case 'byr':
        return /^\d{4}$/.test(value) && !(1920 <= parseInt(value) && parseInt(value) <= 2002)
      case 'iyr':
        return /^\d{4}$/.test(value) && !(2010 <= parseInt(value) && parseInt(value) <= 2020)
      case 'eyr':
        return /^\d{4}$/.test(value) && !(2020 <= parseInt(value) && parseInt(value) <= 2030)
      case 'hgt':
        const number = parseInt(value.slice(0, -2))

        if (value.endsWith('cm'))
          return !(150 <= number && number <= 193)
        else if (value.endsWith('in'))
          return !(59 <= number && number <= 76)
      case 'hcl':
        return !/^#([0-9]|[a-f]){6}$/.test(value)
      case 'ecl':
        return !['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
      case 'pid':
        return !/^\d{9}$/.test(value)
      case 'cid': // if cid exists...
        return false // ...disregard
      default: // if invalid key
        return true
    }
  })

  return isKeyCountValid && !isThereInvalidField
}

console.log(passportObjectsArray.reduce((counter, passportObj) => isPassportValid(passportObj, 'part1') ? ++counter : counter, 0)) // part 1
console.log(passportObjectsArray.reduce((counter, passportObj) => isPassportValid(passportObj, 'part2') ? ++counter : counter, 0)) // part 2