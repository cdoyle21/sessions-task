import { ProductItem, SortOrder, getCategoryProducts, getProducts } from '../services/fakeStore';
import { ItemProps } from '../components/molecules/DropdownButton/DropdownButton';
import { Dispatch, SetStateAction } from 'react';

/**
 * Handles the change of filter selection.
 * @param item The selected filter item.
 * @param filterByItems The list of filter items.
 * @param serviceUrl The URL of the service.
 * @param setFilterName Setter function for the filter name state.
 * @param setFilteredData Setter function for the filtered data state.
 */
export const handleFilterChange = async (
  item: ItemProps,
  filterByItems: ItemProps[],
  serviceUrl: string | undefined,
  setFilterName: Dispatch<SetStateAction<string | undefined>>,
  setFilteredData: Dispatch<SetStateAction<ProductItem[]>>,
) => {
  if (item !== filterByItems[0]) {
    const filteredResults = await getCategoryProducts(item.name, serviceUrl);
    setFilterName(item.name);
    setFilteredData(filteredResults);
  }
};

/**
 * Handles the change of sort selection.
 * @param item The selected sort item.
 * @param sortByItems The list of sort items.
 * @param filterName The current filter name.
 * @param serviceUrl The URL of the service.
 * @param setFilteredData Setter function for the filtered data state.
 */
export const handleSortChange = async (
  item: ItemProps,
  sortByItems: ItemProps[],
  filterName: string | undefined,
  serviceUrl: string | undefined,
  setFilteredData: Dispatch<SetStateAction<ProductItem[]>>,
) => {
  if (item !== sortByItems[0]) {
    let filteredResults: ProductItem[];

    if (filterName !== undefined) {
      filteredResults = await getCategoryProducts(
        filterName,
        serviceUrl,
        undefined,
        item.name as SortOrder,
      );
    } else {
      filteredResults = await getProducts(serviceUrl, undefined, item.name as SortOrder);
    }
    setFilteredData(filteredResults);
  }
};

/**
 * Handles the clearing of sorting and filters.
 * @param serviceUrl The URL of the service.
 * @param setFilteredData Setter function for the filtered data state.
 * @param setFilterName Setter function for the filter name state.
 */
export const handleClearSortingAndFilters = async (
  serviceUrl: string | undefined,
  setFilteredData: Dispatch<SetStateAction<ProductItem[]>>,
  setFilterName: Dispatch<SetStateAction<string | undefined>>,
) => {
  const productItems = await getProducts(serviceUrl);
  setFilteredData(productItems);
  setFilterName(undefined);
};
