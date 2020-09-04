import ValidationRules from '../ValidationRules';

describe('Test validation rule functions', () => {
  it('Check value is not empty', () => {
    expect(ValidationRules.isNotEmpty('abc')).toBeTruthy();
  });

  it('Check value is not empty with trim', () => {
    expect(ValidationRules.isNotEmptyTrim(' abc ')).toBeTruthy();
  });

  it('Check value is empty with trim', () => {
    expect(ValidationRules.isNotEmptyTrim(' ')).toBeFalsy();
  });

  it('10 is equal to 10', () => {
    expect(ValidationRules.isEqual(10)(10)).toBeTruthy();
  });

  it('"10" is equal to "10"', () => {
    expect(ValidationRules.isEqual('10')('10')).toBeTruthy();
  });

  it('"10" is not equal to "20"', () => {
    expect(ValidationRules.isEqual('10')('20')).toBeFalsy();
  });

  it('10 is exactly equal to 10', () => {
    expect(ValidationRules.isExactlyEqual(10)(10)).toBeTruthy();
  });

  it('Check correct email format', () => {
    expect(ValidationRules.isEmail('abc@test.com')).toBeTruthy();
  });

  it('Check incorrect email format', () => {
    expect(ValidationRules.isEmail('abc.com')).toBeFalsy();
  });
});
