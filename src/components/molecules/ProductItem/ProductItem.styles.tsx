import styled from 'styled-components';

export const Container = styled.div`
  grid-column: auto;
  width: 100%;
  padding: 20px 20px 15px;
  max-width: 285px;
`;

export const ImageWrapper = styled.div`
  & > img {
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 6px;
    width: 100%;
  }
`;

export const Title = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  font-weight: 700;
  line-height: 1.5;
  min-height: 75px;
`;

export const DescriptionWrapper = styled.div<{ open: boolean }>`
  height: ${({ open }) => (open ? '' : '80px')};
`;

export const ProductDetailWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const ProductDetail = styled.div`
  padding-bottom: 5px;
`;

export const ProductName = styled.div`
  font-weight: 550;
`;
