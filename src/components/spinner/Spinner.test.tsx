import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner component', () => {
  it('should render loading spinner when isLoading is true', () => {
    render(<Spinner isLoading={true} />);
    expect(screen.getByAltText(/spinner/i)).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render nothing when isLoading is false', () => {
    const { container } = render(<Spinner isLoading={false} />);
    expect(container.firstChild).toBeNull();
  });
});
