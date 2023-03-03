import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

jest.mock('./Api.js', () => ({
  apiUrl: 'https://jsonplaceholder.typicode.com/photos',
}));

const imageData = [
  { id: 1, title: 'Image 1', favorited: true, createdAt: '2022-03-01T10:00:00Z' },
  { id: 2, title: 'Image 2', favorited: false, createdAt: '2022-03-02T10:00:00Z' },
];

describe('App component', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(imageData),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the heading and tabs', async () => {
    render(<App />);

    // Wait for the images to be fetched and rendered
    await waitFor(() => expect(screen.getAllByTestId('image')).toHaveLength(2));

    // Check that the heading and tabs are rendered
    expect(screen.getByRole('heading', { name: /Photos/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Recently Added/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Favorited/i })).toBeInTheDocument();
  });

  test('displays the selected image in the sidebar', async () => {
    render(<App />);

    // Wait for the images to be fetched and rendered
    await waitFor(() => expect(screen.getAllByTestId('image')).toHaveLength(2));

    // Select an image and check that it is displayed in the sidebar
    const firstImage = screen.getAllByTestId('image')[0];
    userEvent.click(firstImage);
    expect(screen.getByRole('img', { name: /Image 1/i })).toBeInTheDocument();
  });

  test('deletes the selected image', async () => {
    render(<App />);

    // Wait for the images to be fetched and rendered
    await waitFor(() => expect(screen.getAllByTestId('image')).toHaveLength(2));

    // Select an image and delete it
    const firstImage = screen.getAllByTestId('image')[0];
    userEvent.click(firstImage);
    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    userEvent.click(deleteButton);

    // Check that the image is no longer displayed
    expect(screen.queryByRole('img', { name: /Image 1/i })).not.toBeInTheDocument();
  });

  test('favorites and unfavorites the selected image', async () => {
    render(<App />);

    // Wait for the images to be fetched and rendered
    await waitFor(() => expect(screen.getAllByTestId('image')).toHaveLength(2));

    // Select an image and favorite it
    const firstImage = screen.getAllByTestId('image')[0];
    userEvent.click(firstImage);
    const favoriteButton = screen.getByRole('button', { name: /Favorite/i });
    userEvent.click(favoriteButton);

    // Check that the image is favorited
    expect(screen.getByRole('button', { name: /Unfavorite/i })).toBeInTheDocument();

    // Unfavorite the image
    userEvent.click(favoriteButton);

    // Check that the image is unfavorited
    expect(screen.getByRole('button', { name: /Favorite/i })).toBeInTheDocument();
  });
});

