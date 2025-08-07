import { describe, expect, it } from 'vitest';
import { getErrorMessage } from '../getErrorMessage';

describe('getErrorMessage', () => {
  it('Returns formatted string if error has status and data', () => {
    const error = { status: 404, data: { message: 'Not found' } };

    expect(getErrorMessage(error)).toBe('Error 404: {"message":"Not found"}');
  });

  it('Returns error string if error has only error property', () => {
    const error = { error: 'Something went wrong' };

    expect(getErrorMessage(error)).toBe('Something went wrong');
  });

  it('Returns empty string if error is null', () => {
    expect(getErrorMessage(null)).toBe('');
  });

  it('Returns empty string if error is a primitive (e.g. string)', () => {
    expect(getErrorMessage('some error')).toBe('');
    expect(getErrorMessage(123)).toBe('');
  });

  it('Returns empty string if object does not contain expected properties', () => {
    expect(getErrorMessage({ foo: 'bar' })).toBe('');
  });

  it('Handles nested unknown data structures safely', () => {
    const error = { status: 500, data: undefined };

    expect(getErrorMessage(error)).toBe('');
  });
});
