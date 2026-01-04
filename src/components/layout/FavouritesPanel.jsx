import { Trash2 } from 'lucide-react';
import PropertyCard from '../property/PropertyCard.jsx';

const FavouritesPanel = ({ properties, onPropertyClick, favouriteIds, onRemoveFavourite, onClearFavourites }) => {
  const favouriteProperties = properties.filter(prop => 
    favouriteIds.includes(prop.id)
  );

  const handleClearAll = () => {
    if (window.confirm('Clear all favourites?')) {
      onClearFavourites();
    }
  };

  return (
    <div className="favourites-panel">
      <div className="favourites-header">
        <h2>
          Favourites
        </h2>
        {favouriteProperties.length > 0 && (
          <button 
            className="btn-clear-favourites"
            onClick={handleClearAll}
            title="Clear all"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      
      <div className="favourites-content">
        {favouriteProperties.length === 0 ? (
          <p className="favourites-empty">
            Click the heart icon on properties to add them here
          </p>
        ) : (
          <div className="favourites-list">
            {favouriteProperties.map(property => (
              <div key={property.id} className="favourite-item">
                <PropertyCard
                  property={property}
                  onCardClick={onPropertyClick}
                  isFavourite={true}
                  onRemoveFavourite={() => onRemoveFavourite(property.id)}
                  showRemoveButton={false}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritesPanel;
