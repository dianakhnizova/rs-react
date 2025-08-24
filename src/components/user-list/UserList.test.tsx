import { render, screen } from '@testing-library/react';
import { UserList } from './UserList';
import { vi, Mock } from 'vitest';
import { messages } from '@/sources/messages';

vi.mock('@/utils/hooks/useUserDataFields', () => ({
  useUserDataFields: vi.fn(),
}));

import { useUserDataFields } from '@/utils/hooks/useUserDataFields';

describe('UserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders container with UserData inside', () => {
    (useUserDataFields as Mock).mockReturnValue([
      [{ label: 'Name', data: 'Alice' }],
    ]);

    render(<UserList />);

    const container = screen.getByTestId('user-list-container');

    expect(container).toBeInTheDocument();

    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
  });

  it('renders photo field inside UserData', () => {
    (useUserDataFields as Mock).mockReturnValue([
      [{ label: messages.photoLabel, data: 'pic.png' }],
    ]);

    render(<UserList />);

    const img = screen.getByAltText(messages.altUser);

    expect(img).toHaveAttribute('src', 'pic.png');
  });
});
