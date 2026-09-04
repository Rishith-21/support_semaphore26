import { useMemo, useState } from 'react';
import { IconCalendar, IconSearch, IconUser } from './Icons';
import { EventModal } from './EventModal';

export function EventSection({ events = [], guidelines, globalSearch = '' }) {
  const [localSearch, setLocalSearch] = useState('');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  // Use global search when provided, otherwise use the local event search.
  const effectiveSearch =
    typeof globalSearch === 'string' && globalSearch.trim()
      ? globalSearch
      : localSearch;

  const query = effectiveSearch.trim().toLowerCase();

  const filteredEvents = useMemo(() => {
    if (!Array.isArray(events)) return [];

    if (!query) return events;

    return events.filter((evt) => {
      const name = String(evt?.name ?? '').toLowerCase();
      const category = String(evt?.category ?? '').toLowerCase();
      const description = String(evt?.description ?? '').toLowerCase();
      const headName = String(evt?.headDetails?.name ?? '').toLowerCase();

      const rules = Array.isArray(evt?.rules)
        ? evt.rules.map((rule) => String(rule ?? '').toLowerCase())
        : [];

      return (
        name.includes(query) ||
        category.includes(query) ||
        description.includes(query) ||
        headName.includes(query) ||
        rules.some((rule) => rule.includes(query))
      );
    });
  }, [events, query]);

  const openEventModal = (event) => {
    setActiveModalEvent(event);
  };

  const closeEventModal = () => {
    setActiveModalEvent(null);
  };

  const handleCardKeyDown = (event, evt) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openEventModal(evt);
    }
  };

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

          <p>
            Explore every Semaphore 2K26 challenge, check the team size,
            and open an event for complete rules and coordinator details.
          </p>

          <span className="events-count">
            {events.length} {events.length === 1 ? 'competition' : 'competitions'}
          </span>
        </div>

        {/* Guidelines Banner */}
        {guidelines && (
          <button
            type="button"
            className="event-guidelines-banner"
            onClick={() => openEventModal(guidelines)}
            aria-label={`Read rules for ${guidelines.name || 'event guidelines'}`}
          >
            <span>
              <strong>{guidelines.name}</strong>

              {guidelines.description && (
                <small>{guidelines.description}</small>
              )}
            </span>

            <span className="event-guidelines-action">
              Read rules
              <span aria-hidden="true">→</span>
            </span>
          </button>
        )}

        {/* Search */}
        <div className="events-search-wrap">
          <div className="search-input-wrapper">
            <IconSearch
              size={16}
              className="search-icon"
              aria-hidden="true"
            />

            <input
              type="search"
              placeholder="Search for event..."
              value={effectiveSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="search-input"
              aria-label="Search events"
            />

            {effectiveSearch && !globalSearch && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setLocalSearch('')}
                aria-label="Clear event search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Search Result Status */}
        {query && (
          <div className="events-search-status" aria-live="polite">
            {filteredEvents.length === 0
              ? `No events found for "${effectiveSearch}"`
              : `${filteredEvents.length} ${
                  filteredEvents.length === 1 ? 'event' : 'events'
                } found`}
          </div>
        )}

        {/* Events Grid */}
        <div className="events-grid">
          {filteredEvents.length === 0 ? (
            <div
              className="events-empty-state"
              role="status"
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '3rem',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--text-muted)',
              }}
            >
              <IconSearch size={28} aria-hidden="true" />

              <h3>No events found</h3>

              <p>
                Try searching for a different event name, category,
                coordinator, or keyword.
              </p>

              {query && !globalSearch && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setLocalSearch('')}
                >
                  Show all events
                </button>
              )}
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const participants = Number(evt?.participants) || 0;

              return (
                <article
                  key={evt?.id ?? evt?.name}
                  className="event-card-simple"
                  role="button"
                  tabIndex={0}
                  onClick={() => openEventModal(evt)}
                  onKeyDown={(event) => handleCardKeyDown(event, evt)}
                  aria-label={`View details for ${evt?.name || 'event'}`}
                >
                  {/* Event Image */}
                  <div className="event-card-img-wrap">
                    <img
                      src={evt?.imageUrl || '/images/event-placeholder.jpg'}
                      alt={evt?.name || 'Event'}
                      className="event-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {evt?.category && (
                      <span className="event-category-pill">
                        {evt.category}
                      </span>
                    )}
                  </div>

                  {/* Event Content */}
                  <div className="event-card-body">
                    <div className="event-card-info">
                      <h3 className="event-card-title">
                        {evt?.name || 'Untitled Event'}
                      </h3>

                      {evt?.description && (
                        <p className="event-card-description">
                          {evt.description}
                        </p>
                      )}

                      <div className="event-card-meta">
                        <IconUser size={15} aria-hidden="true" />

                        <span>
                          {participants}{' '}
                          {participants === 1
                            ? 'participant'
                            : 'participants'}
                        </span>
                      </div>
                    </div>

                    {/* View Details */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEventModal(evt);
                      }}
                      className="btn btn-primary btn-sm event-card-btn"
                      aria-label={`View details for ${evt?.name || 'event'}`}
                    >
                      View details
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>

      {/* Full Details Modal */}
      {activeModalEvent && (
        <EventModal
          event={activeModalEvent}
          onClose={closeEventModal}
        />
      )}
    </section>
  );
}
