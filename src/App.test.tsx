import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import React from 'react';
import { getCategories, getProducts } from './services/fakeStore';

jest.mock('./services/fakeStore', () => ({
  getCategories: jest.fn().mockResolvedValue(['Category 1', 'Category 2']),
  getProducts: jest.fn().mockResolvedValue([]),
}));

describe('#App', () => {
  it('fetches categories and products on mount', async () => {
    render(<App />);

    await waitFor(() => {
      expect(getCategories).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalled();
    });
  });
});
