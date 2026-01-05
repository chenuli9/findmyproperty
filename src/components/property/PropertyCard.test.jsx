import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PropertyCard from './PropertyCard.jsx';

// Test suite for PropertyCard component
describe('PropertyCard', () => {
  // Mock property data for testing
  const mockProperty = {
    id: 'prop1',
    type: 'House',
    price: 750000,
    bedrooms: 3,
    location: 'Test Location',
    picture: '/prop1.jpeg',
    description: 'Test description'
  };

  // Test: Check if the favourite button (heart icon) is rendered
  it('renders favourite button', () => {
    // Render component with property and favourite handler
    const { container } = render(
      <PropertyCard 
        property={mockProperty} 
        onAddFavourite={() => {}} 
      />
    );

    // Check if the favourite button element exists (by class name)
    const favouriteButton = container.querySelector('.favourite-button');
    expect(favouriteButton).toBeInTheDocument();
  });

  // Test: Check if property details are displayed correctly
  it('displays property information', () => {
    // Render component with property data
    render(
      <PropertyCard 
        property={mockProperty} 
        onAddFavourite={() => {}} 
      />
    );

    // Check if price is displayed (formatted as currency)
    expect(screen.getByText(/£750,000/i)).toBeInTheDocument();
    
    // Check if property type is displayed
    expect(screen.getByText(/House/i)).toBeInTheDocument();
    
    // Check if location is displayed
    expect(screen.getByText(/Test Location/i)).toBeInTheDocument();
  });

  // Test: Check if favourite button shows correct state when property is favourited
  it('shows active state when property is favourited', () => {
    // Render component with isFavourite prop set to true
    const { container } = render(
      <PropertyCard 
        property={mockProperty} 
        isFavourite={true}
        onRemoveFavourite={() => {}} 
      />
    );

    // Check if favourite button has active class
    const favouriteButton = container.querySelector('.favourite-button.active');
    expect(favouriteButton).toBeInTheDocument();
  });
});

