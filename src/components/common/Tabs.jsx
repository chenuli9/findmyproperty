import { useState } from 'react';

/**
 * Tabs component implements tabbed interface pattern
 * Manages internal state for active tab while accepting tabs data as props
 */
const Tabs = ({ tabs, defaultTab = 0 }) => {
  // Local state tracks which tab is currently active (0-indexed)
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Guard clause: handles edge case of empty tabs array
  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            // Conditional className: applies 'active' class when tab matches activeTab state
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {/* Conditional rendering: displays content of active tab, with null check */}
        {tabs[activeTab] && (
          <div className="tab-panel">
            {tabs[activeTab].content}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;

