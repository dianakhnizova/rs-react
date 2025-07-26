import { render, screen } from '@testing-library/react';
import { ProductsSection } from './BooksSection';

describe('ProductsSection', () => {
  it('Renders children inside ProductsSection', () => {
    render(
      <ProductsSection>
        <div data-testid="mock-child">Hello from child</div>
      </ProductsSection>
    );

    expect(screen.getByTestId('mock-child')).toBeInTheDocument();
    expect(screen.getByText('Hello from child')).toBeInTheDocument();
  });
});
