import { vi } from 'vitest';

export const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ page: '1' }),
  };
});
