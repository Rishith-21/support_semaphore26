import { useState } from 'react';
import { IconCalendar, IconSearch, IconUser } from './Icons';
import { EventModal } from './EventModal';

export function EventSection({ events, guidelines, globalSearch }) {
  const [localSearch, setLocalSearch] = useState('');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  const effectiveSearch = globalSearch || localSearch;

  const filteredEvents = events.filter((evt) => {
    const query = effectiveSearch.toLowerCase().trim();
    if (!query) return true;

    return (
      evt.name.toLowerCase().includes(query) ||
      evt.category.toLowerCase().includes(query) ||
      (evt.description && evt.description.toLowerCase().includes(query)) ||
      (evt.rules && evt.rules.some((rule) => rule.toLowerCase().includes(query))) ||
      (evt.headDetails?.name && evt.headDetails.name.toLowerCase().includes(query))
    );
  });

  return (
    <section id="events" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-head events-page-head">
          <div className="section-tag">
            <IconCalendar size={16} />
            <span>Event Directory</span>
          </div>
          <h2>Events & Competitions</h2>
          <p>Explore every Semaphore 2K26 challenge, check the team size, and open an event for complete rules and coordinator details.</p>
          <span className="events-count">{events.length} competitions</span>
        </div>

        {guidelines && (
          <button type="button" className="event-guidelines-banner" onClick={() => setActiveModalEvent(guidelines)}>
            <span><strong>{guidelines.name}</strong><small>{guidelines.description}</small></span>
            <span className="event-guidelines-action">Read rules <span aria-hidden="true">→</span></span>
          </button>
        )}

        {/* Clean Search Input */}
        <div className="events-search-wrap">
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
                role="button"
                tabIndex={0}
                onClick={() => setActiveModalEvent(evt)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveModalEvent(evt);
                  }
                }}
              >
                {/* Event Image */}
                <div className="event-card-img-wrap">
                  <img
                    src={evt.imageUrl}
                    alt={evt.name}
                    className="event-card-img"
                    loading="lazy"
                  />
                  <span className="event-category-pill">{evt.category}</span>
                </div>

                {/* Event Name, Category & View More Button */}
                <div className="event-card-body">
                  <div className="event-card-info">
                    <h3 className="event-card-title">{evt.name}</h3>
                    <p className="event-card-description">{evt.description}</p>
                    <div className="event-card-meta">
                      <IconUser size={15} />
                      <span>{evt.participants} {evt.participants === 1 ? 'participant' : 'participants'}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalEvent(evt);
                    }}
                    className="btn btn-primary btn-sm event-card-btn"
                  >
                    View details <span aria-hidden="true">→</span>
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

