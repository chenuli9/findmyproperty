import PropertyCard from './PropertyCard.jsx';

/**
 * PropertyList renders collection of PropertyCard components
 * Handles empty state and maps property data to card components
 */
const PropertyList = ({ properties, onPropertyClick, favouriteIds, onAddFavourite, onRemoveFavourite }) => {
  // Empty state handling: provides user feedback when no results match filters
  if (!properties || properties.length === 0) {
    return (
      <div className="property-list-empty">
        <p>No properties found matching your search criteria.</p>
        <p>Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="property-list">
      {/* List rendering: maps property array to PropertyCard components with unique keys */}
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
          onCardClick={onPropertyClick}
          // Determines favourite status by checking if property ID exists in favouriteIds array
          isFavourite={favouriteIds.includes(property.id)}
          onAddFavourite={onAddFavourite}
          onRemoveFavourite={onRemoveFavourite}
        />
      ))}
    </div>
  );
};

export default PropertyList;

