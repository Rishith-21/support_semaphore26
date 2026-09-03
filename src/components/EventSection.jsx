import React, { useState } from 'react';
import { IconCalendar, IconSearch } from './Icons';
import { EventModal } from './EventModal';

export function EventSection({ events, globalSearch }) {
  const [localSearch, setLocalSearch] = useState('');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  const effectiveSearch = globalSearch || localSearch;

  const filteredEvents = events.filter((evt) => {
    const query = effectiveSearch.toLowerCase().trim();
    if (!query) return true;

    return (
      evt.name.toLowerCase().includes(query) ||
      evt.category.toLowerCase().includes(query) ||
      (evt.location && evt.location.toLowerCase().includes(query)) ||
      (evt.headDetails?.name && evt.headDetails.name.toLowerCase().includes(query))
    );
  });

  return (
    <section id="events" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-head" style={{ marginBottom: '1.75rem' }}>
          <div className="section-tag">
            <IconCalendar size={16} />
            <span>Event Directory</span>
          </div>
          <h2>Events & Competitions</h2>
        </div>

        {/* Clean Search Input */}
        <div style={{ maxWidth: '540px', margin: '0 auto 2.25rem auto' }}>
          <div className="search-input-wrapper">
            <IconSearch size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search for event..."
              value={effectiveSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {filteredEvents.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
              No events found matching "{effectiveSearch}".
            </div>
          ) : (
            filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="event-card-simple"
                onClick={() => setActiveModalEvent(evt)}
              >
                {/* Event Image */}
                <div className="event-card-img-wrap">
                  <img
                    src={evt.imageUrl}
                    alt={evt.name}
                    className="event-card-img"
                    loading="lazy"
                  />
                </div>

                {/* Event Name, Category & View More Button */}
                <div className="event-card-body">
                  <div className="event-card-info">
                    <h3 className="event-card-title">{evt.name}</h3>
                    <p className="event-card-category">{evt.category}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalEvent(evt);
                    }}
                    className="btn btn-primary btn-sm event-card-btn"
                  >
                    View More
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Full Details Modal */}
      {activeModalEvent && (
        <EventModal
          event={activeModalEvent}
          onClose={() => setActiveModalEvent(null)}
        />
      )}
    </section>
  );
}

