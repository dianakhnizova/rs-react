import { isApiErrorResponse } from './isApiErrorResponse';

describe('isApiErrorResponse', () => {
  it('returns true for valid IApiErrorResponse object', () => {
    const validData = {
      error: {
        message: 'Something went wrong',
      },
    };

    expect(isApiErrorResponse(validData)).toBe(true);
  });

  it('returns false when data is null', () => {
    expect(isApiErrorResponse(null)).toBe(false);
  });

  it('returns false when data is not an object', () => {
    expect(isApiErrorResponse('string')).toBe(false);
    expect(isApiErrorResponse(123)).toBe(false);
    expect(isApiErrorResponse(true)).toBe(false);
  });

  it('returns false when data does not have error property', () => {
    expect(isApiErrorResponse({})).toBe(false);
    expect(isApiErrorResponse({ errorMessage: 'Missing error field' })).toBe(
      false
    );
  });

  it('returns false when error is not an object', () => {
    expect(isApiErrorResponse({ error: 'string error' })).toBe(false);
  });

  it('returns false when error.message is not a string', () => {
    expect(isApiErrorResponse({ error: { message: 123 } })).toBe(false);
    expect(isApiErrorResponse({ error: { message: null } })).toBe(false);
  });
});
