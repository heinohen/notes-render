const average = require('../utils/for_testing').average
//Määrittelimme testien ympärille nimellä average varustetun describe-lohkon:
describe('average', () => {
//Describejen avulla yksittäisessä tiedostossa olevat testit voidaan jaotella loogisiin kokonaisuuksiin.
//Testituloste hyödyntää myös describe-lohkon nimeä:
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})