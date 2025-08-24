import { describe, it, expect } from 'vitest';
import {
  nameSchema,
  ageSchema,
  emailSchema,
  passwordSchema,
  confirmSchema,
  genderSchema,
  acceptSchema,
  countrySchema,
  fileSchema,
} from './schemas.ts';
import { Gender, ImageFormat } from '@/sources/enums';

describe('Form validation schemas', () => {
  it('validates name correctly', () => {
    expect(nameSchema.safeParse('John').success).toBe(true);
    expect(nameSchema.safeParse('').success).toBe(false);
    expect(nameSchema.safeParse('123').success).toBe(false);
  });

  it('validates age correctly', () => {
    expect(ageSchema.safeParse('25').success).toBe(true);
    expect(ageSchema.safeParse('0').success).toBe(false);
    expect(ageSchema.safeParse('-5').success).toBe(false);
    expect(ageSchema.safeParse('12.5').success).toBe(false);
    expect(ageSchema.safeParse('abc').success).toBe(false);
  });

  it('validates email correctly', () => {
    expect(emailSchema.safeParse('test@example.com').success).toBe(true);
    expect(emailSchema.safeParse('invalid-email').success).toBe(false);
  });

  it('validates password correctly', () => {
    expect(passwordSchema.safeParse('Abc123!@').success).toBe(true);
    expect(passwordSchema.safeParse('abc').success).toBe(false);
    expect(passwordSchema.safeParse('ABCDEFGH').success).toBe(false);
    expect(passwordSchema.safeParse('abcd1234').success).toBe(false);
    expect(passwordSchema.safeParse('Abcdef12').success).toBe(false);
  });

  it('validates confirm correctly', () => {
    expect(confirmSchema.safeParse('Abcdef1!').success).toBe(true);
    expect(confirmSchema.safeParse('').success).toBe(false);
    expect(confirmSchema.safeParse('abcdefg').success).toBe(false);
  });

  it('validates gender correctly', () => {
    expect(genderSchema.safeParse(Gender.MALE).success).toBe(true);
    expect(genderSchema.safeParse(Gender.FEMALE).success).toBe(true);
    expect(genderSchema.safeParse('other' as unknown).success).toBe(false);
  });

  it('validates accept terms correctly', () => {
    expect(acceptSchema.safeParse(true).success).toBe(true);
    expect(acceptSchema.safeParse(false).success).toBe(false);
  });

  it('validates country correctly', () => {
    expect(countrySchema.safeParse('Kazakhstan').success).toBe(true);
    expect(countrySchema.safeParse('').success).toBe(false);
  });

  it('validates file correctly', () => {
    const file = new File(['dummy'], 'test.png', {
      type: ImageFormat.PNG,
      lastModified: Date.now(),
    });

    const fileList = Object.create(FileList.prototype);
    fileList.length = 1;
    fileList.item = (i: number) => (i === 0 ? file : null);
    fileList[0] = file;

    expect(fileSchema.safeParse(fileList).success).toBe(true);

    const invalidFile = new File(['dummy'], 'test.txt', {
      type: 'text/plain',
      lastModified: Date.now(),
    });
    const invalidList = Object.create(FileList.prototype);
    invalidList.length = 1;
    invalidList.item = (i: number) => (i === 0 ? invalidFile : null);
    invalidList[0] = invalidFile;

    expect(fileSchema.safeParse(invalidList).success).toBe(false);
  });
});
