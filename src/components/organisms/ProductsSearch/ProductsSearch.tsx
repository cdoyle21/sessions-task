import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Form, Input, Button } from './ProductsSearch.styles';
import { ProductItem as ProdItem, ProductItem } from '../../../services/fakeStore';
import { handleClearSortingAndFilters } from '../../../utils/productSortingAndFiltering';

export interface Props {
  /** Array of product items */
  products: ProdItem[];
  /** Set filtered data state callback */
  setFilteredData: Dispatch<SetStateAction<ProductItem[]>>;
  /** Fake store API URL */
  serviceUrl?: string;
  /** Setter function for the filter name state */
  setFilterName: Dispatch<SetStateAction<string | undefined>>;
}

const ProductsSearch: FC<Props> = ({ products, setFilteredData, serviceUrl, setFilterName }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchTerm) {
      await handleClearSortingAndFilters(serviceUrl, setFilteredData, setFilterName);
    } else {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(results);
    }
  };

  return (
    <Form onSubmit={handleSubmit} data-testid="SearchBar">
      <Input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleChange}
      />
      <Button type="submit">Search</Button>
    </Form>
  );
};

export default ProductsSearch;
