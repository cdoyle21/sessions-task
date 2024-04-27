import styled from 'styled-components';

interface GridContainerProps {
  rowGap?: string;
}

export const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: ${({ rowGap }: GridContainerProps): string => rowGap || '0px'};

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(8, 1fr);
    grid-column-gap: 5px;
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: unset;
  }
`;

export const Item = styled.div`
  padding-right: 40px;
  grid-column: span 3;

  @media only screen and (min-width: 768px) {
    grid-column: span 2;
  }
`;
