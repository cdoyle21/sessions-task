import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

describe('#App', () => {
  it('Should render app', () => {
    render(<App />);
    const linkElement = screen.getByText(/Sessions task/i);
    expect(linkElement).toBeInTheDocument();
  });
});
