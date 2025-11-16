import React, { useState } from 'react';

const App = () => {
  // State for the Navigation Menu (starts closed)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for the Planner Widget (starts hidden)
  const [isPlannerVisible, setIsPlannerVisible] = useState(false);

  // Function to close the menu (used when a link is clicked)
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    // Note: React Router handles the actual navigation change
  };

  // Function to toggle the planner widget visibility
  const handlePlannerCtaClick = (e) => {
    // Prevent default jump *must* be done in the handler
    e.preventDefault(); 
    setIsPlannerVisible(prev => !prev);
  };

  return (
    <div className="CityWP-App">
      
      {/* 1. HEADER & NAVIGATION LOGIC */}
      <header className="main-header">
        {/* ... other header content ... */}

        <nav className={isMenuOpen ? 'main-nav active' : 'main-nav'}>
          <ul>
            <li><a href="/" onClick={handleLinkClick}>Home</a></li>
            <li><a href="/transport" onClick={handleLinkClick}>Transport</a></li>
            {/* ... other links ... */}
          </ul>
        </nav>
        
        <div className="header-actions">
          {/* Use the state toggle function on the Click handler */}
          <a 
            href="#planner-form" 
            className="btn btn-plan-cta" 
            onClick={handlePlannerCtaClick}
          >
            Plan
          </a>
        </div>
        
        {/* Use the state toggle function on the Click handler */}
        <button 
          className="nav-toggle" 
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776;
        </button>
      </header>

      {/* 2. PLANNER WIDGET LOGIC */}
      <div 
        id="planner-form" 
        className={isPlannerVisible ? 'planner-widget visible' : 'planner-widget'}
      >
        {/* Content of the planner form will go here */}
        <h2>Planner Form Content</h2>
      </div>

      {/* ... rest of your App content (hero, feature-cards, footer) ... */}
    </div>
  );
};

export default App;
