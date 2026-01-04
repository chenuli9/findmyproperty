import Tabs from '../common/Tabs.jsx';

const PropertyDetails = ({ property }) => {
  if (!property) {
    return <div>Property not found</div>;
  }

  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`;

  const tabs = [
    {
      label: 'Description',
      content: (
        <div className="tab-description">
          <h3>Property Description</h3>
          <div className="description-content">
            <p>{property.description ? property.description.replace(/<[^>]*>/g, ' ') : 'No description available.'}</p>
          </div>
          <div className="property-info-grid">
            <div className="info-item">
              <strong>Type:</strong> {property.type}
            </div>
            <div className="info-item">
              <strong>Bedrooms:</strong> {property.bedrooms}
            </div>
            <div className="info-item">
              <strong>Price:</strong> {formatPrice(property.price)}
            </div>
            <div className="info-item">
              <strong>Tenure:</strong> {property.tenure || 'N/A'}
            </div>
            <div className="info-item">
              <strong>Location:</strong> {property.location}
            </div>
            <div className="info-item">
              <strong>Date Added:</strong> {property.added.day} {property.added.month} {property.added.year}
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Floor Plan',
      content: (
        <div className="tab-floorplan">
          <h3>Floor Plan</h3>
          <div className="floorplan-container">
            <p>Floor plan not available for this property.</p>
          </div>
        </div>
      )
    },
    {
      label: 'Map',
      content: (
        <div className="tab-map">
          <h3>Location Map</h3>
          <div className="map-container">
            <iframe
              src={mapUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${property.location}`}
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="property-details">
      <div className="property-details-header">
        <h1>{property.location}</h1>
        <div className="property-details-price">{formatPrice(property.price)}</div>
        <div className="property-details-meta">
          <span>{property.type}</span>
          <span>{property.bedrooms} bedrooms</span>
        </div>
      </div>

      <div className="property-details-image">
        <img src={property.picture} alt={property.location} />
      </div>

      <div className="property-details-tabs">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default PropertyDetails;

