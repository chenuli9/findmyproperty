import PropertyDetails from '../components/property/PropertyDetails.jsx';
import propertiesData from '../data/properties.json';

const PropertyPage = ({ propertyId, onBack }) => {
  // Find property by ID
  const property = propertiesData.properties.find(p => p.id === propertyId);

  if (!property) {
    return (
      <div className="property-page">
        <div className="property-page-container">
          <div className="property-page-error">
            <h2>Property Not Found</h2>
            <p>The property you're looking for doesn't exist.</p>
            {onBack && (
              <button className="btn btn-primary" onClick={onBack}>
                Back to Search
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="property-page">
      <div className="property-page-container">
        {onBack && (
          <button className="btn-back" onClick={onBack}>
            ← Back to Search
          </button>
        )}
        <PropertyDetails property={property} />
      </div>
    </div>
  );
};

export default PropertyPage;

