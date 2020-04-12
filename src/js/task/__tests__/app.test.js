import { Task } from '../cardValidate';

const buildApp = new Task();

test('not valid number', () => {
    expect(buildApp.moonAlgorithm('54695500449')).toBe(false)
})
test('valid number', () => {
    expect(buildApp.moonAlgorithm('5469550044928767')).toBe(true)
})

test('mir card', () => {

    expect(buildApp.testCardValidate('2')).toEqual(document.querySelector('[data-name=mir]'))
})
test('american_express card', () => {

    expect(buildApp.testCardValidate('34')).toEqual(document.querySelector('[data-name=american_express]'))
})