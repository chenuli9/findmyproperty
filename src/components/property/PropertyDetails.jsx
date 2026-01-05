import Tabs from '../common/Tabs.jsx';

/**
 * PropertyDetails component: comprehensive property information display
 * Uses Tabs component to organise content into Description, Floor Plan, and Map sections
 */
const PropertyDetails = ({ property }) => {
  // Guard clause: handles missing property prop
  if (!property) {
    return <div>Property not found</div>;
  }

  // Currency formatting utility (reusable pattern)
  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  // URL encoding: safely embeds location into Google Maps iframe URL
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`;

  // Tab configuration: data structure for Tabs component
  // Demonstrates component composition - passing JSX as props
  const tabs = [
    {
      label: 'Description',
      content: (
        <div className="tab-description">
          <h3>Property Description</h3>
          <div className="description-content">
            {/* HTML sanitisation: removes tags and replaces with spaces for safe display */}
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
            <img src="/floorplan.jpeg" alt="Floor Plan" />
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
            {/* Embedded Google Maps iframe */}
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

