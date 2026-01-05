import PropertyList from '../components/property/PropertyList.jsx';

const ResultsPage = ({ properties, onPropertyClick }) => {
  return (
    <div className="results-page">
      <div className="results-page-container">
        <h1>Search Results</h1>
        <PropertyList 
          properties={properties} 
          onPropertyClick={onPropertyClick}
        />
      </div>
    </div>
  );
};

export default ResultsPage;

