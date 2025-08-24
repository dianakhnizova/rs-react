import { z } from 'zod';
import { messages } from '@/sources/messages';
import { Gender, ImageFormat } from '@/sources/enums';
import {
  MAX_SIZE_IMAGE,
  NAME_REGEX,
  ONE_MB,
  PASSWORD_REGEX,
} from '@/sources/constants';

export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: messages.error.nameMessage })
  .refine(name => NAME_REGEX.test(name), {
    message: messages.error.nameMessage,
  });
export const ageSchema = z
  .string()
  .trim()
  .refine(val => !Number.isNaN(Number(val)), {
    message: messages.error.age.message1,
  })
  .refine(val => Number(val) > 0, { message: messages.error.age.message2 })
  .refine(val => Number(val) % 1 === 0, {
    message: messages.error.age.message3,
  });

export const emailSchema = z
  .string()
  .trim()
  .email({ message: messages.error.emailMessage });

export const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: messages.error.password.message1 })
  .refine(p => PASSWORD_REGEX.UPPERCASE.test(p), {
    message: messages.error.password.message2,
  })
  .refine(p => PASSWORD_REGEX.LOWERCASE.test(p), {
    message: messages.error.password.message3,
  })
  .refine(p => PASSWORD_REGEX.DIGIT.test(p), {
    message: messages.error.password.message4,
  })
  .refine(p => PASSWORD_REGEX.SPECIAL.test(p), {
    message: messages.error.password.message5,
  });

export const confirmSchema = z
  .string()
  .trim()
  .min(1, { message: messages.error.confirmMessage });

export const genderSchema = z
  .enum([Gender.MALE, Gender.FEMALE], {
    message: messages.error.genderMessage,
  })
  .transform(val => val as Gender);

export const acceptSchema = z.boolean().refine(val => val === true, {
  message: messages.error.acceptTermsMessage,
});

export const countrySchema = z
  .string()
  .min(1, { message: messages.error.countryMessage });

export const fileSchema = z
  .instanceof(FileList)
  .refine(files => files.length === 1, {
    message: messages.error.file.message1,
  })
  .refine(
    files =>
      files.length === 0 ||
      files[0].type === ImageFormat.PNG ||
      files[0].type === ImageFormat.JPEG,
    messages.error.file.message2
  )
  .refine(
    files => files.length === 0 || files[0].size <= MAX_SIZE_IMAGE * ONE_MB,
    messages.error.file.message3
  );
