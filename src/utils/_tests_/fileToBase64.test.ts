import { describe, it, expect } from 'vitest';
import { fileToBase64 } from '../fileToBase64';

describe('fileToBase64', () => {
  it('converts a File to a base64 string', async () => {
    const content = 'Hello, world!';
    const file = new File([content], 'hello.txt', { type: 'text/plain' });

    const result = await fileToBase64(file);

    expect(result.startsWith('data:text/plain;base64,')).toBe(true);

    const base64Data = result.split(',')[1];
    const decoded = atob(base64Data);

    expect(decoded).toBe(content);
  });
});
