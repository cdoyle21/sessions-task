import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductItem from './ProductItem';
import { mockedProductsData } from '../../../testUtils/mockedProductsData';

describe('PathwayItem', () => {
  it('renders pathway item with correct content', () => {
    render(<ProductItem product={mockedProductsData[0]} />);

    expect(screen.getByTestId('ProductItem')).toBeInTheDocument();
    expect(screen.getByAltText(`${mockedProductsData[0].title}_product`)).toBeInTheDocument();
    expect(screen.getByTestId('ProductItem-Title')).toHaveTextContent(
      'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    );
    expect(screen.getByTestId('ProductItem-Description')).toHaveTextContent(
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    );
    expect(screen.getByTestId('ProductItem-Price')).toHaveTextContent('109.95');
    expect(screen.getByTestId('ProductItem-Rating')).toHaveTextContent('3.9');
    expect(screen.getByTestId('ProductItem-Count')).toHaveTextContent('120');
  });
});
