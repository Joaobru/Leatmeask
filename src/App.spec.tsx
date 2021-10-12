import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('Testing the App Component', () => {
  it('Return equivalent to hello world', () => {
    render(<App />);
    const componentPlace = screen.getByText(/Hello World/i);
    expect(componentPlace).toBeInTheDocument();
  });
});
