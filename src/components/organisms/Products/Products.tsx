import React, { FC } from 'react';
import { GridContainer, Item } from './Products.styles';
import { ProductItem as ProdItem } from '../../../services/fakeStore';
import ProductItem from '../../../components/molecules/ProductItem';

export interface Props {
  /** Array of product items */
  products: ProdItem[];
}

const Products: FC<Props> = ({ products }) => {
  return (
    <GridContainer data-testid="ProductsGrid">
      {products.map((product: ProdItem) => (
        <Item key={product.id} data-testid="ProductsGridItem">
          <ProductItem product={product} />
        </Item>
      ))}
    </GridContainer>
  );
};

export default Products;
