import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductItem from './ProductItem';
import { mockedProductsData } from '../../../testUtils/mockedProductsData';

describe('ProductItem', () => {
  it('renders product item with correct content', () => {
    render(<ProductItem product={mockedProductsData[0]} />);

    expect(screen.getByTestId('ProductItem')).toBeInTheDocument();
    expect(screen.getByAltText(`${mockedProductsData[0].title}_product`)).toBeInTheDocument();
    expect(screen.getByTestId('ProductItem-Title')).toHaveTextContent(
      'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    );
    expect(screen.getByTestId('ProductItem-Description')).toHaveTextContent(
      'Your perfect pack for everyday use and walks in th ...',
    );
    expect(screen.getByTestId('ProductItem-Price')).toHaveTextContent('109.95');
    expect(screen.getByTestId('ProductItem-Rating')).toHaveTextContent('3.9');
    expect(screen.getByTestId('ProductItem-Count')).toHaveTextContent('120');
  });

  it('expands and collapses description when "Show more" button is clicked', () => {
    render(<ProductItem product={mockedProductsData[0]} />);

    const showMoreButton = screen.getByTestId('ProductItem-ViewMoreButton');

    fireEvent.click(showMoreButton);
    expect(screen.getByTestId('ProductItem-Description')).toHaveTextContent(
      mockedProductsData[0].description,
    );

    fireEvent.click(showMoreButton);
    expect(screen.getByTestId('ProductItem-Description')).toHaveTextContent(
      mockedProductsData[0].description.slice(0, 50),
    );
  });
});
