import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from './Slider';
import { ThemeContext } from '@/utils/ThemeContext';
import { Theme } from '@/sources/enums';

describe('Slider', () => {
  const renderWithTheme = (ui: React.ReactNode, theme = Theme.LIGHT) => {
    return render(
      <ThemeContext.Provider value={{ theme, toggleTheme: vi.fn() }}>
        {ui}
      </ThemeContext.Provider>
    );
  };

  it('Renders children correctly', () => {
    renderWithTheme(
      <Slider currentSlide={1} totalSlides={3} onSlideChange={() => {}}>
        <div>Slide Content</div>
      </Slider>
    );

    expect(screen.getByText('Slide Content')).toBeInTheDocument();
  });

  it('Calls onSlideChange with previous slide when prev button clicked', () => {
    const onSlideChange = vi.fn();

    renderWithTheme(
      <Slider currentSlide={2} totalSlides={3} onSlideChange={onSlideChange}>
        <div />
      </Slider>
    );

    const [prevButton] = screen.getAllByRole('button');
    fireEvent.click(prevButton);

    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it('Calls onSlideChange with next slide when next button clicked', () => {
    const onSlideChange = vi.fn();

    renderWithTheme(
      <Slider currentSlide={1} totalSlides={3} onSlideChange={onSlideChange}>
        <div />
      </Slider>
    );

    const [, nextButton] = screen.getAllByRole('button');
    fireEvent.click(nextButton);

    expect(onSlideChange).toHaveBeenCalledWith(2);
  });

  it('Disables prev button when on first slide', () => {
    renderWithTheme(
      <Slider currentSlide={1} totalSlides={3} onSlideChange={() => {}}>
        <div />
      </Slider>
    );

    const [prevButton] = screen.getAllByRole('button');
    expect(prevButton).toBeDisabled();
  });

  it('Disables next button when on last slide', () => {
    renderWithTheme(
      <Slider currentSlide={3} totalSlides={3} onSlideChange={() => {}}>
        <div />
      </Slider>
    );

    const [, nextButton] = screen.getAllByRole('button');
    expect(nextButton).toBeDisabled();
  });
});
