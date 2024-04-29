import React from 'react';
import { render, screen } from '@testing-library/react';

import Products from '.';
import { mockedProductsData } from '../../../testUtils/mockedProductsData';

const renderComponent = () => {
  return render(<Products products={mockedProductsData} />);
};

describe('Products Component', () => {
  describe('Renders Products Element', () => {
    it('should render the component', () => {
      renderComponent();

      expect(screen.getByTestId('ProductsGrid')).toBeInTheDocument();
    });
  });
});
