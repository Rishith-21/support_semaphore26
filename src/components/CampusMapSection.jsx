import { useState } from 'react';
import { IconMapPin, IconSearch, IconMap } from './Icons';

export function CampusMapSection({ campusData, categories, globalSearch = '' }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [localSearch, setLocalSearch] = useState('');
  const [hoveredFacility, setHoveredFacility] = useState(null);
  const [activeFacility, setActiveFacility] = useState(null);

  const searchTerm = globalSearch || localSearch;

  const filteredFacilities = campusData.filter(facility => {
    const matchesCategory = activeCategory === 'All' || facility.category === activeCategory;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      facility.name.toLowerCase().includes(searchLower) ||
      facility.description.toLowerCase().includes(searchLower) ||
      facility.category.toLowerCase().includes(searchLower);
    
    return matchesCategory && matchesSearch;
  });

  const handlePinClick = (id) => {
    setActiveFacility(id === activeFacility ? null : id);
  };

  const selectFacility = (id) => {
    setActiveFacility(id);
    document.getElementById(`facility-${id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <section className="campus-map-section fade-in" aria-labelledby="campus-map-title">
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrapper">
            <span className="section-tag">Explore The Venue</span>
            <h2 id="campus-map-title">Campus Map & Facilities</h2>
          </div>
          <p className="section-description">
            Navigate through the NMAMIT campus and locate important venues, labs, and amenities for Semaphore 2K26.
          </p>
        </div>

        {/* Filters */}
        <div className="filter-row">
          <div className="filter-pills" aria-label="Filter facilities by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {!globalSearch && (
            <label className="search-box">
              <IconSearch className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search facilities..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="search-input"
                aria-label="Search campus facilities"
              />
            </label>
          )}
        </div>

        <div className="map-content-wrapper">
          {/* Interactive Map Area */}
          <div className="map-container-interactive">
            <div className="map-base-layer">
              <div className="map-abstract-path path-1"></div>
              <div className="map-abstract-path path-2"></div>
            </div>
            
            {filteredFacilities.map(facility => (
              <button
                type="button"
                key={facility.id}
                className={`map-pin-wrapper ${hoveredFacility === facility.id ? 'is-hovered' : ''} ${activeFacility === facility.id ? 'is-active' : ''}`}
                style={{ 
                  left: `${facility.coordinates.x}%`, 
                  top: `${facility.coordinates.y}%` 
                }}
                onMouseEnter={() => setHoveredFacility(facility.id)}
                onMouseLeave={() => setHoveredFacility(null)}
                onClick={() => selectFacility(facility.id)}
                aria-label={`Show details for ${facility.name}`}
                aria-pressed={activeFacility === facility.id}
              >
                <div className="map-pin-pulse"></div>
                <div className="map-pin-marker">
                  <IconMapPin size={24} />
                </div>
                <div className="map-pin-tooltip">
                  {facility.name}
                </div>
              </button>
            ))}
          </div>

          {/* Facilities Cards Grid */}
          <div className="facilities-grid">
            {filteredFacilities.length > 0 ? (
              filteredFacilities.map(facility => (
                <article
                  key={facility.id}
                  id={`facility-${facility.id}`}
                  className={`facility-card ${hoveredFacility === facility.id || activeFacility === facility.id ? 'is-highlighted' : ''}`}
                  onMouseEnter={() => setHoveredFacility(facility.id)}
                  onMouseLeave={() => setHoveredFacility(null)}
                >
                  <div className="facility-card-header">
                    <div className="facility-icon-badge">
                       <IconMap size={20} />
                    </div>
                    <span className="facility-category-tag">{facility.category}</span>
                  </div>
                  <h3 className="facility-card-title">{facility.name}</h3>
                  <p className="facility-card-desc">{facility.description}</p>
                  
                  <div className="facility-card-footer">
                    <a 
                      href={facility.googleMapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary facility-action-btn"
                    >
                      <IconMapPin size={18} />
                      <span>Get directions</span>
                    </a>
                    <button
                      type="button"
                      className="btn btn-sm facility-locate-btn"
                      onClick={() => handlePinClick(facility.id)}
                      aria-pressed={activeFacility === facility.id}
                    >
                      {activeFacility === facility.id ? 'Hide pin' : 'Show on map'}
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <IconMap size={48} className="empty-icon" />
                <h3>No facilities found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  className="btn btn-secondary mt-4"
                  onClick={() => {
                    setLocalSearch('');
                    setActiveCategory('All');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
