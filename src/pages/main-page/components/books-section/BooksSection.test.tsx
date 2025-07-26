import { render, screen } from '@testing-library/react';
import { BooksSection } from './BooksSection';

describe('ProductsSection', () => {
  it('Renders children inside ProductsSection', () => {
    render(
      <BooksSection>
        <div data-testid="mock-child">Hello from child</div>
      </BooksSection>
    );

    expect(screen.getByTestId('mock-child')).toBeInTheDocument();
    expect(screen.getByText('Hello from child')).toBeInTheDocument();
  });
});
