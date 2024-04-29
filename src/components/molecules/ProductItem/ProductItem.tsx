import React, { FC, useState } from 'react';
import {
  Container,
  ImageWrapper,
  Title,
  ProductDetail,
  DescriptionWrapper,
  ProductDetailWrapper,
  ProductName,
} from './ProductItem.styles';
import { ProductItem as ProdItem } from '../../../services/fakeStore';
import OptimisedImageWithFallback from '../../../components/atoms/OptimisedImageWithFallback';
import ShowMoreButton from '../../../components/atoms/ShowMoreButton';

export interface Props {
  /** Individual product item */
  product: ProdItem;
}

const ProductItem: FC<Props> = ({ product }) => {
  const [expandedView, setExpandedView] = useState(false);

  // Destructure product properties
  const { title, price, description, image } = product;
  const { rate, count } = product.rating;

  const maxDescriptionLength = 50;

  return (
    <Container data-testid="ProductItem">
      <ImageWrapper>
        <OptimisedImageWithFallback src={image} alt={`${title}_product`} height={150} />
      </ImageWrapper>
      <Title data-testid="ProductItem-Title">{title}</Title>
      <DescriptionWrapper open={expandedView}>
        <ProductDetail data-testid="ProductItem-Description">
          {description.length > maxDescriptionLength && !expandedView
            ? `${description.slice(0, maxDescriptionLength)} ...`
            : description}
        </ProductDetail>
      </DescriptionWrapper>
      {description.length > maxDescriptionLength && (
        <ShowMoreButton
          onClick={() => setExpandedView(!expandedView)}
          expandedView={expandedView}
          testId="ProductItem-ViewMoreButton"
        />
      )}
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
