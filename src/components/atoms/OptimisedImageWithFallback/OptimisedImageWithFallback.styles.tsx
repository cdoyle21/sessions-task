import styled from 'styled-components';

interface Props {
  width?: number;
  height?: number;
}

export const Image = styled.img<Props>`
  width: ${({ width }: Props): string => (width ? `${width}px` : 'auto')};
  height: ${({ height }: Props): string => (height ? `${height}px` : 'auto')};
`;
