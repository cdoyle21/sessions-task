import './App.style';
import React, { FC, useEffect, useState } from 'react';
import { Wrapper } from './App.style';
import Products from './components/organisms/Products';
import { ProductItem as ProdItem, getCategories, getProducts } from './services/fakeStore';
import ProductsSortingAndFiltering from './components/organisms/ProductsSortingAndFiltering';

const App: FC = () => {
  const [products, setProducts] = useState<ProdItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { REACT_APP_PRODUCTS_SERVICE_LOCATION } = process.env;

  // Function to fetch product items from the server
  const getProductItems = async () => {
    const productItems = await getProducts(REACT_APP_PRODUCTS_SERVICE_LOCATION);
    setProducts(productItems);
  };

  // Function to fetch category items from the server
  const getCategoryItems = async () => {
    const categoryItems = await getCategories(REACT_APP_PRODUCTS_SERVICE_LOCATION);
    setCategories(categoryItems);
  };

  useEffect(() => {
    if (products.length === 0) {
      getProductItems();
    }
  }, [products]);

  useEffect(() => {
    if (categories.length === 0) {
      getCategoryItems();
    }
  }, [categories]);

  return (
    <>
      <Wrapper>
        <ProductsSortingAndFiltering
          categories={categories}
          setFilteredData={setProducts}
          serviceUrl={REACT_APP_PRODUCTS_SERVICE_LOCATION}
        />
        <Products products={products} />
      </Wrapper>
    </>
  );
};

export default App;
