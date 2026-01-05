import { useState } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import SearchPage from './pages/SearchPage.jsx';
import PropertyPage from './pages/PropertyPage.jsx';
import './assets/styles/global.css';
import './assets/styles/layout.css';
import './assets/styles/responsive.css';

/**
 * Main App component - acts as the root component and manages application-level state
 * Implements a simple routing mechanism using conditional rendering based on currentPage state
 */
function App() {
  // State management for navigation - controls which page is currently displayed
  const [currentPage, setCurrentPage] = useState('search');
  // Stores the ID of the property selected for detailed view
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  // Event handler for property selection - updates state to navigate to property detail page
  const handlePropertyClick = (property) => {
    setSelectedPropertyId(property.id);
    setCurrentPage('property');
  };

  // Navigation handler to return to search page and reset property selection
  const handleBackToSearch = () => {
    setCurrentPage('search');
    setSelectedPropertyId(null);
  };

  // Generic navigation handler - allows switching between pages while clearing property selection
  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedPropertyId(null);
  };

  return (
    <div className="app">
      <Navbar onNavigate={handleNavigate} />
      <div className="app-container">
        {/* Conditional rendering: displays SearchPage when currentPage is 'search' */}
        {currentPage === 'search' && (
          <SearchPage onPropertyClick={handlePropertyClick} />
        )}
        {/* Conditional rendering: displays PropertyPage when property is selected */}
        {currentPage === 'property' && selectedPropertyId && (
          <PropertyPage 
            propertyId={selectedPropertyId} 
            onBack={handleBackToSearch}
          />
        )}
      </div>
    </div>
  );
}

export default App;
