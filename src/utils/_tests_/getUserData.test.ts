import { getUserData } from '../getUserData';

describe('getUserData', () => {
  const createMockRef = <T>(value: T) => ({ current: value });

  it('returns all values from refs', () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });

    const refs: any = {
      nameRef: createMockRef({ value: 'John' }),
      ageRef: createMockRef({ value: '25' }),
      emailRef: createMockRef({ value: 'john@example.com' }),
      passwordRef: createMockRef({ value: 'pass123' }),
      confirmPasswordRef: createMockRef({ value: 'pass123' }),
      genderMaleRef: createMockRef({ checked: true, value: 'male' }),
      genderFemaleRef: createMockRef({ checked: false, value: 'female' }),
      acceptTermsRef: createMockRef({ checked: true }),
      countryRef: createMockRef({ value: 'USA' }),
      imageRef: createMockRef({ files: [mockFile] }),
    };

    const result = getUserData(refs);

    expect(result).toEqual({
      name: 'John',
      age: '25',
      email: 'john@example.com',
      password: 'pass123',
      confirmPassword: 'pass123',
      gender: 'male',
      acceptTerms: true,
      country: 'USA',
      file: [mockFile],
    });
  });

  it('returns empty defaults when refs have no values', () => {
    const refs: any = {
      nameRef: createMockRef(null),
      ageRef: createMockRef(null),
      emailRef: createMockRef(null),
      passwordRef: createMockRef(null),
      confirmPasswordRef: createMockRef(null),
      genderMaleRef: createMockRef({ checked: false, value: 'male' }),
      genderFemaleRef: createMockRef({ checked: false, value: 'female' }),
      acceptTermsRef: createMockRef(null),
      countryRef: createMockRef(null),
      imageRef: createMockRef(null),
    };

    const result = getUserData(refs);

    expect(result).toEqual({
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      acceptTerms: false,
      country: '',
      file: undefined,
    });
  });
});
