import { HTML_FOR } from '@/sources/enums';
import { messages } from '@/sources/messages';
import { z } from 'zod';
import {
  acceptSchema,
  ageSchema,
  confirmSchema,
  countrySchema,
  emailSchema,
  fileSchema,
  genderSchema,
  nameSchema,
  passwordSchema,
} from './schemas';

export const userSchema = z
  .object({
    name: nameSchema,
    age: ageSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmSchema,
    gender: genderSchema,
    acceptTerms: acceptSchema,
    country: countrySchema,
    file: fileSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: messages.error.confirmMessage,
    path: [HTML_FOR.CONFIRM_PASSWORD],
  });
