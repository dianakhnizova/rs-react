import { NotFoundPage } from './NotFoundPage';
import { render, screen } from '@testing-library/react';
import { mockedNavigate } from '@/utils/moks/useNavigateMock';
import { messages } from './messages';
import userEvent from '@testing-library/user-event';

describe('NotFoundPage', () => {
  it('Renders 404 image and navigation button', () => {
    render(<NotFoundPage />);

    const image = screen.getByRole('img', { name: messages.imgTitle });

    expect(image).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: messages.navigateMainButton,
    });

    expect(button).toBeInTheDocument();
  });

  it('Navigates to main page on button click', async () => {
    mockedNavigate.mockClear();

    render(<NotFoundPage />);

    const button = screen.getByRole('button', {
      name: messages.navigateMainButton,
    });

    await userEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
