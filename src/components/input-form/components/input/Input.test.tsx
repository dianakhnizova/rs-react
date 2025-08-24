import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';
import { List } from '@/sources/enums';
import type { Country } from '@/sources/interfaces';

describe('Input with country autocomplete', () => {
  const countries: Country[] = [
    { id: '1', name: 'Kazakhstan' },
    { id: '2', name: 'Germany' },
    { id: '3', name: 'Japan' },
  ];

  it('renders datalist with given countries when isDataList is true', () => {
    render(
      <Input
        htmlFor="country"
        label="Country"
        type="text"
        isDataList
        countries={countries}
      />
    );

    const datalist = screen.getByTestId('country-list');
    expect(datalist).toBeInTheDocument();
    expect(datalist).toHaveAttribute('id', List.COUNTRY_LIST);

    countries.forEach(country => {
      expect(screen.getByText(country.name)).toBeInTheDocument();
    });
  });

  it('does not render datalist if isDataList is false', () => {
    render(
      <Input
        htmlFor="country"
        label="Country"
        type="text"
        isDataList={false}
        countries={countries}
      />
    );

    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('does not render datalist if no countries are provided', () => {
    render(<Input htmlFor="country" label="Country" type="text" isDataList />);

    expect(screen.queryByRole('listbox')).toBeNull();
  });
});
