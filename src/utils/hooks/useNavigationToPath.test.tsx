import { renderHook } from '@testing-library/react';
import { useNavigationToPath } from './useNavigationToPath';
import { PagePath } from '@/router/enums';
import { vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ page: '2', detailsId: 'abc123' }),
  };
});

describe('useNavigationToPath', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('returns correct currentPage and isValidPage', () => {
    const { result } = renderHook(() => useNavigationToPath());

    expect(result.current.currentPage).toBe(2);
    expect(result.current.isValidPage).toBe(true);
  });

  it('redirects to NotFound', () => {
    const { result } = renderHook(() => useNavigationToPath());

    result.current.redirectToNotFound();
    expect(mockNavigate).toHaveBeenCalledWith(PagePath.notFound, {
      replace: true,
    });
  });

  it('navigates to book detail with current page', () => {
    const { result } = renderHook(() => useNavigationToPath());

    result.current.navigateToBookDetail('book456');
    expect(mockNavigate).toHaveBeenCalledWith('/2/book456');
  });

  it('navigates to about page', () => {
    const { result } = renderHook(() => useNavigationToPath());

    result.current.navigateToAboutPage();
    expect(mockNavigate).toHaveBeenCalledWith(PagePath.aboutPage);
  });

  it('navigates on search (with detailsId)', () => {
    const { result } = renderHook(() => useNavigationToPath());

    result.current.navigateOnSearch();
    expect(mockNavigate).toHaveBeenCalledWith('/1/abc123');
  });

  it('navigates to specific page with detailsId', () => {
    const { result } = renderHook(() => useNavigationToPath());

    result.current.navigateToPage(5);
    expect(mockNavigate).toHaveBeenCalledWith('/5/abc123');
  });

  it('navigates to list page only', () => {
    const { result } = renderHook(() => useNavigationToPath());

    result.current.navigateToList(3);
    expect(mockNavigate).toHaveBeenCalledWith('/3');
  });
});
