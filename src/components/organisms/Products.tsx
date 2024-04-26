import React, { FC, useEffect, useState } from 'react';
import { GridContainer, Item } from './Products.styles';
import { GetProductsResponse, getProducts } from '../../services/fakeStore';

const Products: FC = () => {
  const [products, setProducts] = useState<GetProductsResponse[]>();
  const { REACT_APP_PRODUCTS_SERVICE_LOCATION } = process.env;

  const getProductItems = async () => {
    const productItems = await getProducts(REACT_APP_PRODUCTS_SERVICE_LOCATION);
    setProducts(productItems);
  };

  useEffect(() => {
    if (!products) {
      getProductItems();
    }
  }, [products]);

  return (
    <GridContainer data-testid="ProductsGrid">
      {products?.map((product: GetProductsResponse) => (
        <Item key={product.id} data-testid="ProductsGridItem">
          {product.id}
        </Item>
      ))}
    </GridContainer>
  );
};

export default Products;
