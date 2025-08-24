import { render, screen } from '@testing-library/react';
import { UserData } from './UserData';
import { messages } from '@/sources/messages';
import { vi, Mock } from 'vitest';

vi.mock('@/utils/hooks/useUserDataFields', () => ({
  useUserDataFields: vi.fn(),
}));

import { useUserDataFields } from '@/utils/hooks/useUserDataFields';

describe('UserData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user fields', () => {
    (useUserDataFields as Mock).mockReturnValue([
      [
        { label: 'Name', data: 'Alice' },
        { label: 'Email', data: 'alice@mail.com' },
      ],
    ]);

    render(<UserData />);

    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
    expect(screen.getByText(/Email:/)).toBeInTheDocument();
    expect(screen.getByText(/alice@mail.com/)).toBeInTheDocument();
  });

  it('renders photo if label matches messages.photoLabel', () => {
    (useUserDataFields as Mock).mockReturnValue([
      [{ label: messages.photoLabel, data: 'photo-url.png' }],
    ]);

    render(<UserData />);

    const img = screen.getByAltText(messages.altUser);

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'photo-url.png');
  });
});
