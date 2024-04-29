import {
  handleFilterChange,
  handleSortChange,
  handleClearSortingAndFilters,
} from './productSortingAndFiltering';
import { ItemProps } from '../components/molecules/DropdownButton/DropdownButton';
import { getCategoryProducts, getProducts } from '../services/fakeStore';
import { mockedProductsData } from '../testUtils/mockedProductsData';

jest.mock('../services/fakeStore', () => ({
  getCategoryProducts: jest.fn(),
  getProducts: jest.fn(),
}));

describe('handleFilterChange', () => {
  it('fetches category products and updates state', async () => {
    const setFilterName = jest.fn();
    const setFilteredData = jest.fn();
    const item: ItemProps = {
      name: 'category1',
      label: 'Category 1',
      ariaLabel: 'Filter by Category 1',
    };
    const filterByItems: ItemProps[] = [
      {
        name: 'filterBy',
        label: 'Filter by',
        ariaLabel: 'Filter by title',
      },
      {
        name: 'category1',
        label: 'Category 1',
        ariaLabel: 'Filter by Category 1',
      },
    ];
    const serviceUrl = 'mock-service-url';
    const filterName = 'product1';

    await handleFilterChange(
      item,
      filterByItems,
      serviceUrl,
      setFilterName,
      setFilteredData,
      filterName,
      mockedProductsData,
    );

    expect(setFilterName).toHaveBeenCalledWith(item.name);
    expect(setFilteredData).toHaveBeenCalled();
    expect(getCategoryProducts).toHaveBeenCalledWith(item.name, serviceUrl);
  });
});

describe('handleSortChange', () => {
  it('fetches sorted products and updates state', async () => {
    const setFilteredData = jest.fn();
    const item: ItemProps = { name: 'asc', label: 'Ascending', ariaLabel: 'Ascending' };
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
    const filterName = 'category1';
    const serviceUrl = 'mock-service-url';

    await handleSortChange(item, sortByItems, filterName, serviceUrl, setFilteredData);

    expect(setFilteredData).toHaveBeenCalled();
    expect(getCategoryProducts).toHaveBeenCalledWith(filterName, serviceUrl, undefined, 'asc');
  });
});

describe('handleClearSortingAndFilters', () => {
  it('fetches all products and clears filters', async () => {
    const setFilteredData = jest.fn();
    const setFilterName = jest.fn();
    const serviceUrl = 'mock-service-url';

    await handleClearSortingAndFilters(serviceUrl, setFilteredData, setFilterName);

    expect(setFilteredData).toHaveBeenCalled();
    expect(setFilterName).toHaveBeenCalledWith(undefined);
    expect(getProducts).toHaveBeenCalledWith(serviceUrl);
  });
});
