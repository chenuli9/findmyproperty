import { useState, useEffect } from 'react';
import { filterProperties } from '../utils/filterProperties.js';
import PropertyList from '../components/property/PropertyList.jsx';
import FavouritesPanel from '../components/layout/FavouritesPanel.jsx';
import Hero from '../components/layout/Hero.jsx';
import propertiesData from '../data/properties.json';

/**
 * SearchPage component: main search interface with filtering and favourites functionality
 * Manages two separate filter states: draft (filters) and applied (appliedFilters)
 * This separation allows users to modify filters without immediately affecting results
 */
const SearchPage = ({ onPropertyClick }) => {
  // Draft filter state - changes as user types/selects but doesn't apply until submit
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAfter: '',
    dateBefore: '',
    postcodeArea: ''
  });
  
  // Applied filter state - used for actual property filtering
  const [appliedFilters, setAppliedFilters] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAfter: '',
    dateBefore: '',
    postcodeArea: ''
  });
  
  // Filtered results - computed based on appliedFilters
  const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);
  // Favourites management: stores array of property IDs for favourite properties
  const [favouriteIds, setFavouriteIds] = useState([]);
  const allProperties = propertiesData.properties;

  // Favourites handlers: use functional state updates and immutable array operations
  const handleAddFavourite = (propertyId) => {
    // Prevents duplicate favourites using array spread syntax
    if (!favouriteIds.includes(propertyId)) {
      setFavouriteIds([...favouriteIds, propertyId]);
    }
  };

  const handleRemoveFavourite = (propertyId) => {
    // Immutable removal using filter - creates new array without the ID
    setFavouriteIds(favouriteIds.filter(id => id !== propertyId));
  };

  const handleClearFavourites = () => {
    setFavouriteIds([]);
  };

  // Effect hook: automatically re-filters properties when appliedFilters or allProperties change
  // This reactive approach ensures UI stays in sync with filter state
  useEffect(() => {
    const filtered = filterProperties(allProperties, appliedFilters);
    setFilteredProperties(filtered);
  }, [appliedFilters, allProperties]);

  // Generic filter change handler: uses computed property names for dynamic state updates
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Form submission: transfers draft filters to applied filters, triggering useEffect
  const handleSubmit = (e) => {
    e.preventDefault();
    setAppliedFilters({ ...filters });
  };

  const handleReset = () => {
    const resetFilters = {
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateAfter: '',
      dateBefore: '',
      postcodeArea: ''
    };
    setFilters(resetFilters);
    setAppliedFilters(resetFilters);
  };

  return (
    <div className="search-page">
      <Hero />
      <div className="simple-grid">
        <div className="left-column">
          <div className="search-section">
            <h2>
              Search Properties
            </h2>
            <form className="search-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Property Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <option value="any">Any</option>
                    <option value="House">House</option>
                    <option value="Flat">Flat</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Min Price (£)</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label>Max Price (£)</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    placeholder="No limit"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Min Bedrooms</label>
                  <input
                    type="number"
                    value={filters.minBedrooms}
                    onChange={(e) => handleFilterChange('minBedrooms', e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label>Max Bedrooms</label>
                  <input
                    type="number"
                    value={filters.maxBedrooms}
                    onChange={(e) => handleFilterChange('maxBedrooms', e.target.value)}
                    placeholder="No limit"
                  />
                </div>

                <div className="form-group">
                  <label>Postcode Area</label>
                  <input
                    type="text"
                    value={filters.postcodeArea}
                    onChange={(e) => handleFilterChange('postcodeArea', e.target.value.toUpperCase())}
                    placeholder="e.g. BR5"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Added After</label>
                  <input
                    type="date"
                    value={filters.dateAfter}
                    onChange={(e) => handleFilterChange('dateAfter', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Added Before</label>
                  <input
                    type="date"
                    value={filters.dateBefore}
                    onChange={(e) => handleFilterChange('dateBefore', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </form>
          </div>

          <div className="results-section">
            <h2>
              Properties
            </h2>
            <PropertyList 
              properties={filteredProperties} 
              onPropertyClick={onPropertyClick}
              favouriteIds={favouriteIds}
              onAddFavourite={handleAddFavourite}
              onRemoveFavourite={handleRemoveFavourite}
            />
          </div>
        </div>

        <div className="right-column">
          <FavouritesPanel
            properties={allProperties}
            onPropertyClick={onPropertyClick}
            favouriteIds={favouriteIds}
            onRemoveFavourite={handleRemoveFavourite}
            onClearFavourites={handleClearFavourites}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
