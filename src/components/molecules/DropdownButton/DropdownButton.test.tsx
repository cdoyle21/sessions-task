import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownButton, { DropdownButtonProps, ItemProps } from './DropdownButton';

const mockedItems: ItemProps[] = [
  {
    name: 'option1',
    label: 'Option 1',
    ariaLabel: 'Option 1',
  },
  {
    name: 'option2',
    label: 'Option 2',
    ariaLabel: 'Option 2',
  },
  {
    name: 'option3',
    label: 'Option 3',
    ariaLabel: 'Option 3',
  },
];

describe('DropdownButton', () => {
  const mockOnSelectionChange = jest.fn();
  const mockOnButtonClick = jest.fn();

  const defaultProps: DropdownButtonProps = {
    items: mockedItems,
    buttonAriaLabel: 'menu-button',
    menuAriaLabel: 'dropdown-menu',
    initialSelection: mockedItems[0],
    onSelectionChange: mockOnSelectionChange,
    onButtonClick: mockOnButtonClick,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with initial selection', () => {
    render(<DropdownButton {...defaultProps} />);
    expect(screen.getByLabelText('menu-button')).toBeInTheDocument();
    expect(screen.getByLabelText('menu-button')).toHaveTextContent('Option 1');
  });

  it('opens and closes the dropdown menu on button click', () => {
    render(<DropdownButton {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('menu-button'));

    expect(mockOnButtonClick).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByLabelText('menu-button'));

    expect(mockOnButtonClick).toHaveBeenCalledWith(true);
  });

  it('handles item selection and calls onSelectionChange', () => {
    render(<DropdownButton {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('menu-button'));

    const option2Item = screen.getByTestId('option2-MenuItem');
    fireEvent.click(option2Item);

    expect(mockOnSelectionChange).toHaveBeenCalledWith(mockedItems[1]);
  });
});
