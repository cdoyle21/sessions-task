import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ProductsSearch from './ProductsSearch';
import { handleClearSortingAndFilters } from '../../../utils/productSortingAndFiltering';
import { mockedProductsData } from '../../../testUtils/mockedProductsData';

jest.mock('../../../utils/productSortingAndFiltering', () => ({
  handleClearSortingAndFilters: jest.fn(),
}));

describe('ProductsSearch', () => {
  const setFilteredDataMock = jest.fn();
  const setFilterNameMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the search form correctly', () => {
    render(
      <ProductsSearch
        products={mockedProductsData}
        setFilteredData={setFilteredDataMock}
        setFilterName={setFilterNameMock}
      />,
    );

    expect(screen.getByTestId('SearchBar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search for products...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should call handleClearSortingAndFilters when submitting an empty search term', async () => {
    render(
      <ProductsSearch
        products={mockedProductsData}
        setFilteredData={setFilteredDataMock}
        setFilterName={setFilterNameMock}
      />,
    );

    fireEvent.submit(screen.getByTestId('SearchBar'));

    await waitFor(() => {
      expect(handleClearSortingAndFilters).toHaveBeenCalledWith(
        undefined,
        setFilteredDataMock,
        setFilterNameMock,
      );
    });
  });

  it('should filter products when submitting a non-empty search term', async () => {
    render(
      <ProductsSearch
        products={mockedProductsData}
        setFilteredData={setFilteredDataMock}
        setFilterName={setFilterNameMock}
      />,
    );

    const input = screen.getByPlaceholderText('Search for products...');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Product 1' } });
    fireEvent.submit(searchButton);

    await waitFor(() => {
      const filteredProduct = mockedProductsData.filter((product) =>
        product.title.toLowerCase().includes('Product 1'.toLowerCase()),
      );
      expect(setFilteredDataMock).toHaveBeenCalledWith(filteredProduct);
    });
  });
});
