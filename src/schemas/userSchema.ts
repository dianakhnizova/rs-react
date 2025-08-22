import { Gender, HTML_FOR, ImageFormat } from '@/sources/enums';
import { messages } from '@/sources/messages';
import { z } from 'zod';

const emailSchema = z.string().email({ message: messages.error.emailMessage });

const passwordSchema = z
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

export const userSchema = z
  .object({
    name: z.string().refine(name => /^[A-ZА-ЯЁ]/.test(name), {
      message: messages.error.nameMessage,
    }),
    age: z
      .string()
      .refine(val => !Number.isNaN(Number(val)), {
        message: messages.error.age.message1,
      })
      .refine(val => Number(val) > 0, { message: messages.error.age.message2 })
      .refine(val => Number(val) % 1 === 0, {
        message: messages.error.age.message3,
      }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    gender: z.enum([Gender.MALE, Gender.FEMALE], {
      message: messages.error.genderMessage,
    }),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: messages.error.acceptTermsMessage,
    }),
    country: z.string().min(1, { message: messages.error.countryMessage }),
    file: z
      .custom<FileList>(val => val instanceof FileList, {
        message: messages.error.file.message1,
      })
      .refine(files => files.length === 1, {
        message: messages.error.file.message1,
      })
      .refine(
        files =>
          files.length === 1 &&
          [ImageFormat.PNG, ImageFormat.JPEG].includes(
            files[0].type as ImageFormat
          ),
        {
          message: messages.error.file.message2,
        }
      )
      .refine(files => files.length === 1 && files[0].size <= 5 * 1024 * 1024, {
        message: messages.error.file.message3,
      }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: messages.error.confirmMessage,
    path: [HTML_FOR.CONFIRM_PASSWORD],
  });
