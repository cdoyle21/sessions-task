import React, { FC } from 'react';
import { ShowButton } from './ShowMoreButton.styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface Props {
  onClick: () => void;
  /** Boolean value to show more or show less */
  expandedView: boolean;
  /** `data-testid` for the ShowMoreButton */
  testId?: string;
}

const ShowMoreButton: FC<Props> = ({ onClick, expandedView, testId }) => {
  return (
    <ShowButton type="button" onClick={onClick} data-testid={testId || 'ShowMoreButton'}>
      {expandedView ? (
        <>
          <span> Show less </span>
          <ExpandLessIcon />
        </>
      ) : (
        <>
          <span>Show more</span>
          <ExpandMoreIcon />
        </>
      )}
    </ShowButton>
  );
};

export default ShowMoreButton;
