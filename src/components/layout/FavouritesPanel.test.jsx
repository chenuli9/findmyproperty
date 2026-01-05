import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FavouritesPanel from './FavouritesPanel.jsx';

// Test suite for FavouritesPanel component
describe('FavouritesPanel', () => {
  // Mock properties data for testing
  const mockProperties = [
    {
      id: 'prop1',
      type: 'House',
      price: 750000,
      bedrooms: 3,
      location: 'Test Location',
      picture: '/prop1.jpeg',
      description: 'Test description'
    }
  ];

  // Test: Check if empty state message is displayed when there are no favourites
  it('shows empty state message when no favourites', () => {
    // Render component with empty favourites array
    render(
      <FavouritesPanel
        properties={mockProperties}
        onPropertyClick={() => {}}
        favouriteIds={[]}
        onRemoveFavourite={() => {}}
        onClearFavourites={() => {}}
      />
    );

    // Check if the empty state message is displayed
    expect(screen.getByText(/Click the heart icon on properties to add them here/i)).toBeInTheDocument();
  });

  // Test: Check if favourites are displayed when there are favourite IDs
  it('displays favourites when favouriteIds are provided', () => {
    // Render component with a favourite ID
    render(
      <FavouritesPanel
        properties={mockProperties}
        onPropertyClick={() => {}}
        favouriteIds={['prop1']}
        onRemoveFavourite={() => {}}
        onClearFavourites={() => {}}
      />
    );

    // Check if the favourite property is displayed (price should be visible)
    expect(screen.getByText(/£750,000/i)).toBeInTheDocument();
  });

  // Test: Check if clear favourites button appears when there are favourites
  it('shows clear favourites button when favourites exist', () => {
    // Render component with favourites
    const { container } = render(
      <FavouritesPanel
        properties={mockProperties}
        onPropertyClick={() => {}}
        favouriteIds={['prop1']}
        onRemoveFavourite={() => {}}
        onClearFavourites={() => {}}
      />
    );

    // Check if clear button (with trash icon) exists
    const clearButton = container.querySelector('.btn-clear-favourites');
    expect(clearButton).toBeInTheDocument();
  });
});

