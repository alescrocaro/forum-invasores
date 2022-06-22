const { hashPassword, passwordValidation } = require('../src/services/hash');

describe('Hash service tests', () =>
  test('Hashing the password with the function hashPassword should return a valid salt and hash ', () => {
    const password = '123456&&&&';
    const { hash, salt } = hashPassword(password);
    const isValid = passwordValidation(password, hash, salt);
    expect(isValid).toBe(true);
  }));
