import React from 'react';
import { render, screen } from '@testing-library/react';

import ShowMoreButton, { Props } from './ShowMoreButton';

const mockOnClick = jest.fn();

const defaultProps: Props = {
  onClick: mockOnClick,
  expandedView: false,
};

const renderComponent = (props: Props) => {
  return render(<ShowMoreButton {...props} />);
};

describe('ShowMoreButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renders ShowMoreButton Element', () => {
    it('should call onClick when clicked', () => {
      renderComponent(defaultProps);
      const button = screen.getByTestId('ShowMoreButton');
      button.click();
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should display Show more in limited view', () => {
      renderComponent(defaultProps);
      expect(screen.getByText('Show more')).toBeInTheDocument();
    });

    it('should display Show less in expanded view', () => {
      const customProps = {
        ...defaultProps,
        expandedView: true,
      };
      renderComponent(customProps);
      expect(screen.getByText('Show less')).toBeInTheDocument();
    });
  });
});
