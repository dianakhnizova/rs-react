import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('./useFormRefs', () => ({
  useFormRefs: () => ({
    nameRef: { current: null },
    ageRef: { current: null },
    emailRef: { current: null },
    passwordRef: { current: null },
    confirmPasswordRef: { current: null },
    genderMaleRef: { current: null },
    genderFemaleRef: { current: null },
    imageRef: { current: null },
    countryRef: { current: null },
    acceptTermsRef: { current: null },
  }),
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

import { useSelector } from 'react-redux';
import { useInputFields } from '../useInputFields';

describe('useInputFields (hook)', () => {
  beforeEach(() => {
    (useSelector as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      'Kazakhstan',
      'USA',
    ]);
  });

  it('returns inputFields with correct structure', () => {
    const { result } = renderHook(() => useInputFields());

    const { inputFields, refs } = result.current;

    expect(Array.isArray(inputFields)).toBe(true);
    expect(inputFields.length).toBeGreaterThan(0);

    expect(inputFields[0]).toMatchObject({
      htmlFor: 'name',
      name: 'name',
      type: 'text',
    });

    const countryField = inputFields.find(f => f.htmlFor === 'country');
    expect(countryField?.countries).toEqual(['Kazakhstan', 'USA']);

    expect(refs).toHaveProperty('nameRef');
    expect(refs).toHaveProperty('acceptTermsRef');
  });

  it('includes gender field with male and female refs', () => {
    const { result } = renderHook(() => useInputFields());
    const genderField = result.current.inputFields.find(
      f => f.htmlFor === 'gender'
    );

    expect(genderField).toBeDefined();
    expect(genderField).toHaveProperty('maleRef');
    expect(genderField).toHaveProperty('femaleRef');
  });
});
