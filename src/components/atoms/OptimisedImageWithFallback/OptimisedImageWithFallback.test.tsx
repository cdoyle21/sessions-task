import React from 'react';
import { render, screen } from '@testing-library/react';

import OptimisedImageWithFallback from './OptimisedImageWithFallback';

describe('#OptimisedImageWithFallback', () => {
  const mockUseState = jest.spyOn(React, 'useState');

  beforeEach(() => {
    mockUseState.mockReset();
  });

  it.skip('should show fallback image if image error is true', () => {
    const mockError = true;
    const mockSetError = jest.fn();
    mockUseState.mockImplementation(() => [mockError, mockSetError]);

    render(<OptimisedImageWithFallback src={'/test'} alt={'test-alt'} />);

    const image = screen.getByAltText('test-alt') as HTMLImageElement;
    expect(image.src).toContain('Logo.svg');
  });

  it('should not show fallback image if image error is false', () => {
    const mockError = false;
    const mockSetError = jest.fn();
    mockUseState.mockImplementation(() => [mockError, mockSetError]);

    render(<OptimisedImageWithFallback src={'/test'} alt={'test-alt'} />);

    const image = screen.queryByAltText('test-alt') as HTMLImageElement;
    expect(image.src).toContain('test');
    expect(image.src).not.toContain('Logo.svg');
  });
});
