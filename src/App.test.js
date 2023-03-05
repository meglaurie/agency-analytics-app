import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(imageData),
      })
    );
  });

  test('renders the App component', () => {
    const { getByTestId } = render(<App />);
    const appElement = getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });
  
  test('renders the Image component', () => {
    const { getByTestId } = render(<App />);
    const imageElement = getByTestId('imageGrid');
    expect(imageElement).toBeInTheDocument();
  });

  test('renders the tabs component', async () => {
    const { getByTestId } = render(<App />);
    const tabsElement = getByTestId('tabs');
    expect(tabsElement).toBeInTheDocument();
  });

  // test('renders the sidebar component onClick', async () => {
  //   const { getByTestId } = render(<App />);
  //   const imageElement = getByTestId('image');
  //   const sidebarElement = getByTestId('sidebar');

  //   imageElement.click();
  //   await waitFor(() => getByTestId('sidebar'));    
  //   expect(sidebarElement).toBeInTheDocument();
  // });
  
});

