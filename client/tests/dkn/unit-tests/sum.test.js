const sum = require('../../../src/components/sum')

test('adds 1 + 2 to equal 3', () =>
{
    console.log(sum);
    expect(sum(1,2)).toBe(3);
})