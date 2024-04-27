import React, { FC, useEffect, useState } from 'react';
import { GridContainer, Item } from './Products.styles';
import { ProductItem as ProdItem, getProducts } from '../../../services/fakeStore';
import ProductItem from '../../../components/molecules/ProductItem';

const Products: FC = () => {
  const [products, setProducts] = useState<ProdItem[]>();
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
      {products?.map((product: ProdItem) => (
        <Item key={product.id} data-testid="ProductsGridItem">
          <ProductItem product={product} />
        </Item>
      ))}
    </GridContainer>
  );
};

export default Products;
