import { Heart, X } from 'lucide-react';

const PropertyCard = ({ 
  property, 
  onCardClick, 
  isFavourite = false,
  onAddFavourite,
  onRemoveFavourite,
  showRemoveButton = false
}) => {
  const handleFavouriteClick = (e) => {
    e.stopPropagation();
    
    if (isFavourite) {
      if (onRemoveFavourite) {
        onRemoveFavourite(property.id);
      }
    } else {
      if (onAddFavourite) {
        onAddFavourite(property.id);
      }
    }
  };

  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  const shortDescription = property.description 
    ? property.description.substring(0, 100).replace(/<[^>]*>/g, '') + '...'
    : 'No description';

  return (
    <div 
      className="property-card"
      onClick={() => onCardClick && onCardClick(property)}
    >
      <div className="property-card-image">
        <img 
          src={property.picture} 
          alt={property.location}
        />
        <button
          className={`favourite-button ${isFavourite ? 'active' : ''}`}
          onClick={handleFavouriteClick}
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart size={20} fill={isFavourite ? 'red' : 'none'} />
        </button>
        {showRemoveButton && onRemoveFavourite && (
          <button
            className="remove-button"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFavourite(property.id);
            }}
            title="Remove"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="property-card-content">
        <div className="property-card-price">{formatPrice(property.price)}</div>
        <div className="property-card-type">{property.type}</div>
        <div className="property-card-bedrooms">{property.bedrooms} bedrooms</div>
        <div className="property-card-location">{property.location}</div>
        <div className="property-card-description">{shortDescription}</div>
      </div>
    </div>
  );
};

export default PropertyCard;
