import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Container, Button } from './ProductsSortingAndFiltering.styles';
import DropdownButton, { ItemProps } from '../../molecules/DropdownButton/DropdownButton';
import { ProductItem } from '../../../services/fakeStore';
import {
  handleClearSortingAndFilters,
  handleFilterChange,
  handleSortChange,
} from '../../../utils/productSortingAndFiltering';

export interface Props {
  /** Array of categories */
  categories: Array<string>;
  /** Set filtered data state callback */
  setFilteredData: Dispatch<SetStateAction<ProductItem[]>>;
  /** Fake store API URL */
  serviceUrl: string | undefined;
}

const ProductsSortingAndFiltering: FC<Props> = ({ categories, setFilteredData, serviceUrl }) => {
  const [filterName, setFilterName] = useState<string>();

  // Dropdown items for filter by title and categories
  const filterTitle: ItemProps[] = [
    {
      name: 'filterBy',
      label: 'Filter by',
      ariaLabel: 'Filter by title',
    },
  ];

  const categoriesItems: ItemProps[] = categories.map((category) => ({
    name: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
    ariaLabel: `Filter by ${category}`,
  }));

  // Combine filter by title and categories into one array
  const filterByItems: ItemProps[] = [...filterTitle, ...categoriesItems];

  // Dropdown items for sorting by title, ascending, and descending
  const sortByItems: ItemProps[] = [
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

  return (
    <Container>
      {/* Dropdown button for filtering */}
      <DropdownButton
        items={filterByItems}
        buttonAriaLabel="filter by category"
        menuAriaLabel="filter by dropdown options"
        initialSelection={filterByItems[0]}
        menuAlignment="left"
        onSelectionChange={(item) => {
          handleFilterChange(item, filterByItems, serviceUrl, setFilterName, setFilteredData);
        }}
      />
      {/* Dropdown button for sorting */}
      <DropdownButton
        items={sortByItems}
        buttonAriaLabel="sort by items"
        menuAriaLabel="sort by dropdown options"
        initialSelection={sortByItems[0]}
        menuAlignment="right"
        onSelectionChange={(item) => {
          handleSortChange(item, sortByItems, filterName, serviceUrl, setFilteredData);
        }}
      />
      {/* Button to clear sorting and filters */}
      <Button
        disabled={false}
        aria-label="Clear sorting and filters"
        onClick={() => handleClearSortingAndFilters(serviceUrl, setFilteredData, setFilterName)}
      >
        Clear
      </Button>
    </Container>
  );
};

export default ProductsSortingAndFiltering;
