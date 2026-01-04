import { useState } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import SearchPage from './pages/SearchPage.jsx';
import PropertyPage from './pages/PropertyPage.jsx';
import './assets/styles/global.css';
import './assets/styles/layout.css';
import './assets/styles/responsive.css';

function App() {
  const [currentPage, setCurrentPage] = useState('search');
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const handlePropertyClick = (property) => {
    setSelectedPropertyId(property.id);
    setCurrentPage('property');
  };

  const handleBackToSearch = () => {
    setCurrentPage('search');
    setSelectedPropertyId(null);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedPropertyId(null);
  };

  return (
    <div className="app">
      <Navbar onNavigate={handleNavigate} />
      <div className="app-container">
        {currentPage === 'search' && (
          <SearchPage onPropertyClick={handlePropertyClick} />
        )}
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
