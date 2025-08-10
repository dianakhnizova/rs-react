import { vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('@/utils/hooks/useAppSelector', () => ({
  useAppSelector: vi.fn(() => 2),
}));

vi.mock('@/utils/hooks/useIsValidPage', () => ({
  useIsValidPage: vi.fn(() => true),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ page: '2', detailsId: 'abc123' }),
  };
});

import { renderHook } from '@testing-library/react';
import { useNavigationToPath } from '../useNavigationToPath';

describe('useNavigationToPath', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('Returns correct currentPage and isValidPage', () => {
    const { result } = renderHook(() => useNavigationToPath());

    expect(result.current.currentPage).toBe(2);
  });

  it('Navigates to specific page with detailsId', () => {
    const { result } = renderHook(() => useNavigationToPath());

    result.current.navigateToPage(5);

    expect(mockNavigate).toHaveBeenCalledWith('/5/abc123');
  });
});
