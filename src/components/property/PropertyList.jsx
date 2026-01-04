import PropertyCard from './PropertyCard.jsx';

const PropertyList = ({ properties, onPropertyClick, favouriteIds, onAddFavourite, onRemoveFavourite }) => {
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
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
          onCardClick={onPropertyClick}
          isFavourite={favouriteIds.includes(property.id)}
          onAddFavourite={onAddFavourite}
          onRemoveFavourite={onRemoveFavourite}
        />
      ))}
    </div>
  );
};

export default PropertyList;

