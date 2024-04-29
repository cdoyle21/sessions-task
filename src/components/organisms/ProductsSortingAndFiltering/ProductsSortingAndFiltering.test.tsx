import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductsSortingAndFiltering, { Props } from './ProductsSortingAndFiltering';
import { mockedCategoryDate, mockedProductsData } from '../../../testUtils/mockedProductsData';
import {
  handleFilterChange,
  handleSortChange,
  handleClearSortingAndFilters,
} from '../../../utils/productSortingAndFiltering.tsx';
import { ItemProps } from '../../molecules/DropdownButton/DropdownButton.tsx';

jest.mock('../../../utils/productSortingAndFiltering', () => ({
  handleFilterChange: jest.fn(),
  handleSortChange: jest.fn(),
  handleClearSortingAndFilters: jest.fn(),
}));

describe('ProductsSortingAndFiltering', () => {
  const mockItemProps: ItemProps = {
    name: 'electronics',
    label: 'Electronics',
    ariaLabel: 'Filter by electronics',
  };

  const mockFilterByItems: ItemProps[] = [
    {
      ariaLabel: 'Filter by title',
      label: 'Filter by',
      name: 'filterBy',
    },
    {
      ariaLabel: 'Filter by electronics',
      label: 'Electronics',
      name: 'electronics',
    },
    {
      ariaLabel: 'Filter by jewelery',
      label: 'Jewelery',
      name: 'jewelery',
    },
    {
      ariaLabel: "Filter by men's clothing",
      label: "Men's clothing",
      name: "men's clothing",
    },
    {
      ariaLabel: "Filter by women's clothing",
      label: "Women's clothing",
      name: "women's clothing",
    },
  ];

  const mockSortByItems: ItemProps[] = [
    {
      name: 'sortBy',
      label: 'Sort by',
      ariaLabel: 'Sort by title',
    },
    {
      name: 'asc',
      label: 'Ascending',
      ariaLabel: 'Ascending',
    },
    {
      name: 'desc',
      label: 'Descending',
      ariaLabel: 'Descending',
    },
  ];

  const mockSetFilteredName = jest.fn();

  const mockSetFilteredData = jest.fn();

  const defaultProps: Props = {
    products: mockedProductsData,
    categories: mockedCategoryDate,
    setFilteredData: mockSetFilteredData,
    serviceUrl: 'www.example.com',
    filterName: '',
    setFilterName: mockSetFilteredName,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    render(<ProductsSortingAndFiltering {...defaultProps} />);
    expect(screen.getByLabelText('filter by category')).toBeInTheDocument();
    expect(screen.getByLabelText('sort by items')).toBeInTheDocument();
    expect(screen.getByLabelText('Clear sorting and filters')).toBeInTheDocument();
  });

  it('handles filter by selection change', () => {
    render(<ProductsSortingAndFiltering {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('filter by category'));
    fireEvent.click(screen.getByLabelText('Filter by electronics'));

    expect(handleFilterChange).toHaveBeenCalledWith(
      mockItemProps,
      mockFilterByItems,
      defaultProps.serviceUrl,
      expect.any(Function),
      mockSetFilteredData,
      '',
      mockedProductsData,
    );
  });

  it('handles sort by selection change', async () => {
    render(<ProductsSortingAndFiltering {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('sort by items'));
    fireEvent.click(screen.getByLabelText('Descending'));

    expect(handleSortChange).toHaveBeenCalledWith(
      { name: 'desc', label: 'Descending', ariaLabel: 'Descending' },
      mockSortByItems,
      '',
      defaultProps.serviceUrl,
      mockSetFilteredData,
    );
  });

  it('handles clear button click', () => {
    render(<ProductsSortingAndFiltering {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Clear sorting and filters'));

    expect(handleClearSortingAndFilters).toHaveBeenCalledWith(
      defaultProps.serviceUrl,
      mockSetFilteredData,
      expect.any(Function),
    );
  });
});
