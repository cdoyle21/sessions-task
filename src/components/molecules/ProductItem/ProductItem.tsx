import React, { FC } from 'react';
import {
  Container,
  ImageWrapper,
  Title,
  ProductDetail,
  ProductDetailWrapper,
  ProductName,
} from './ProductItem.styles';
import { ProductItem as ProdItem } from '../../../services/fakeStore';
import OptimisedImageWithFallback from '../../../components/atoms/OptimisedImageWithFallback';

export interface Props {
  product: ProdItem;
}

const ProductItem: FC<Props> = ({ product }) => {
  const { title, price, description, image } = product;
  const { rate, count } = product.rating;

  return (
    <Container data-testid="ProductItem">
      <ImageWrapper>
        <OptimisedImageWithFallback src={image} alt={`${title}_product`} height={150} />
      </ImageWrapper>
      <Title data-testid="ProductItem-Title">{title}</Title>
      <ProductDetail data-testid="ProductItem-Description">{description}</ProductDetail>
      <ProductDetailWrapper>
        <ProductName>Price: </ProductName>
        <ProductDetail data-testid="ProductItem-Price">£{price}</ProductDetail>
        <ProductName>Rating: </ProductName>
        <ProductDetail data-testid="ProductItem-Rating">{rate}</ProductDetail>
        <ProductName>Count: </ProductName>
        <ProductDetail data-testid="ProductItem-Count">{count}</ProductDetail>
      </ProductDetailWrapper>
    </Container>
  );
};

export default ProductItem;
