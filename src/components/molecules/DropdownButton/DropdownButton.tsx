import React, { FC, useState } from 'react';
import { Container, Button, DropdownMenuContainer, DropdownMenu } from './DropdownButton.styles';
import DropdownItem from '../../atoms/DropdownItem/DropdownItem';

export interface ItemProps {
  name: string;
  label: string;
  ariaLabel: string;
}

export interface DropdownButtonProps {
  /** List of Dropdown items to render in the dropdown */
  items: Array<ItemProps>;
  /** Aria label for the menu button */
  buttonAriaLabel: string;
  /** Aria label for the dropdown menu */
  menuAriaLabel: string;
  /** The item that is selected on initial render of the component */
  initialSelection: ItemProps;
  /** Whether to align the dropdown to the left or right side of the button. Defaults to 'left' */
  menuAlignment?: 'left' | 'right';
  /** Called when a new item is selected */
  onSelectionChange?: (item: ItemProps) => void;
  /** Called when the button is clicked */
  onButtonClick?: (menuOpen?: boolean) => void;
}

const DropdownButton: FC<DropdownButtonProps> = ({
  items,
  buttonAriaLabel,
  menuAriaLabel,
  initialSelection,
  menuAlignment = 'left',
  onSelectionChange = () => {},
  onButtonClick = () => {},
}) => {
  const [selected, setSelected] = useState<ItemProps>(initialSelection);
  const [focused, setFocused] = useState<ItemProps>(initialSelection);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelection = (item: ItemProps) => {
    setSelected(initialSelection);
    setFocused(initialSelection);
    setIsOpen(false);
    onSelectionChange(item);
  };

  return (
    <Container>
      <Button
        isOpen={isOpen}
        disabled={false}
        aria-label={buttonAriaLabel}
        onClick={() => {
          setIsOpen(!isOpen);
          onButtonClick(isOpen);
        }}
      >
        {selected.label}
      </Button>

      {isOpen && (
        <DropdownMenuContainer openMenuLocation={menuAlignment}>
          <DropdownMenu aria-label={menuAriaLabel}>
            {items.map(
              (item) =>
                item.name !== initialSelection.name && (
                  <DropdownItem
                    key={item.name}
                    ariaLabel={item.ariaLabel}
                    testId={`${item.name}-MenuItem`}
                    onClick={() => handleSelection(item)}
                  >
                    {item.label}
                  </DropdownItem>
                ),
            )}
          </DropdownMenu>
        </DropdownMenuContainer>
      )}
    </Container>
  );
};

export default DropdownButton;
