import { z } from 'zod';
import { messages } from '@/sources/messages';
import { Gender } from '@/sources/enums';

export const emailSchema = z
  .string()
  .email({ message: messages.error.emailMessage });

export const passwordSchema = z
  .string()
  .min(8, { message: messages.error.password.message1 })
  .refine(p => /[A-Z]/.test(p), {
    message: messages.error.password.message2,
  })
  .refine(p => /[a-z]/.test(p), {
    message: messages.error.password.message3,
  })
  .refine(p => /[0-9]/.test(p), {
    message: messages.error.password.message4,
  })
  .refine(p => /[!@#$%^&*(),.?":{}|<>]/.test(p), {
    message: messages.error.password.message5,
  });

export const nameSchema = z.string().refine(name => /^[A-ZА-ЯЁ]/.test(name), {
  message: messages.error.nameMessage,
});

export const ageSchema = z
  .string()
  .refine(val => !Number.isNaN(Number(val)), {
    message: messages.error.age.message1,
  })
  .refine(val => Number(val) > 0, { message: messages.error.age.message2 })
  .refine(val => Number(val) % 1 === 0, {
    message: messages.error.age.message3,
  });

export const confirmSchema = z.string();

export const genderSchema = z.enum([Gender.MALE, Gender.FEMALE], {
  message: messages.error.genderMessage,
});

export const acceptSchema = z.boolean().refine(val => val === true, {
  message: messages.error.acceptTermsMessage,
});

export const countrySchema = z
  .string()
  .min(1, { message: messages.error.countryMessage });

export const fileSchema = z
  .string()
  .min(1, { message: messages.error.file.message1 })
  .refine(
    str =>
      str.startsWith('data:image/png') || str.startsWith('data:image/jpeg'),
    {
      message: messages.error.file.message2,
    }
  )
  .refine(
    str => {
      const size = (str.length * 3) / 4;
      return size <= 5 * 1024 * 1024;
    },
    {
      message: messages.error.file.message3,
    }
  );
