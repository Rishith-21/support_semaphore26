
import { useEffect, useMemo, useState } from 'react';
import { EventModal } from './EventModal';

import {
  IconClock,
  IconCalendar,
  IconMapPin,
  IconSearch,
  IconUser,
} from './Icons';


// =========================================================
// EVENT STATUS
// =========================================================

function getEventStatus(item, now) {
  const date = item.date;

  const timeParts = item.time?.match(
    /(\d{1,2}:\d{2}\s*[AP]M)(?:\s*-\s*(\d{1,2}:\d{2}\s*[AP]M))?/i
  );

  if (!timeParts) {
    return {
      status: 'Upcoming',
      text: 'Upcoming',
    };
  }

  const startTime = timeParts[1];
  let endTime = timeParts[2];

  // -------------------------------------------------------
  // 24 HOUR EVENT
  // -------------------------------------------------------

  if (item.time.toLowerCase().includes('ongoing 24h')) {
    const start = new Date(`${date} ${startTime}`);
    const end = new Date(
      start.getTime() + 24 * 60 * 60 * 1000
    );

    if (now < start) {
      return {
        status: 'Upcoming',
        text: `Starts in ${formatCountdown(start - now)}`,
      };
    }

    if (now < end) {
      return {
        status: 'Live Now',
        text: 'LIVE NOW',
      };
    }

    return {
      status: 'Completed',
      text: 'COMPLETED',
    };
  }

  // -------------------------------------------------------
  // EVENT WITHOUT END TIME
  // Assume one hour duration
  // -------------------------------------------------------

  if (!endTime) {
    const start = new Date(`${date} ${startTime}`);
    const end = new Date(
      start.getTime() + 60 * 60 * 1000
    );

    if (now < start) {
      return {
        status: 'Upcoming',
        text: `Starts in ${formatCountdown(start - now)}`,
      };
    }

    if (now < end) {
      return {
        status: 'Live Now',
        text: 'LIVE NOW',
      };
    }

    return {
      status: 'Completed',
      text: 'COMPLETED',
    };
  }

  // -------------------------------------------------------
  // NORMAL EVENT
  // -------------------------------------------------------

  const start = new Date(`${date} ${startTime}`);
  const end = new Date(`${date} ${endTime}`);

  if (now < start) {
    return {
      status: 'Upcoming',
      text: `Starts in ${formatCountdown(start - now)}`,
    };
  }

  if (now < end) {
    return {
      status: 'Live Now',
      text: 'LIVE NOW',
    };
  }

  return {
    status: 'Completed',
    text: 'COMPLETED',
  };
}


// =========================================================
// COUNTDOWN
// =========================================================

function formatCountdown(milliseconds) {
  const totalSeconds = Math.max(
    0,
    Math.floor(milliseconds / 1000)
  );

  const days = Math.floor(
    totalSeconds / 86400
  );

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  return [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
  ].join(':');
}


// =========================================================
// STATUS CLASS
// =========================================================

function getStatusClass(status) {
  switch (status) {
    case 'Live Now':
      return 'badge-live';

    case 'Completed':
      return 'badge-completed';

    default:
      return 'badge-upcoming';
  }
}


// =========================================================
// SCHEDULE SECTION
// =========================================================

export function ScheduleSection({
  scheduleData = [],
  scheduleDays = [],
  scheduleVenues = [],
  globalSearch = '',
}) {
  const [selectedDay, setSelectedDay] =
    useState('day1');

  const [selectedVenue, setSelectedVenue] =
    useState('All Venues');

  const [selectedCategory, setSelectedCategory] =
    useState('All Categories');

  const [localSearch, setLocalSearch] =
    useState('');

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const [currentTime, setCurrentTime] =
    useState(new Date());


  // =======================================================
  // LIVE CLOCK
  // =======================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);


  // =======================================================
  // EFFECTIVE SEARCH
  // Global search has priority when supplied.
  // =======================================================

  const effectiveSearch =
    String(globalSearch || localSearch || '')
      .trim()
      .toLowerCase();


  // =======================================================
  // FILTER EVENTS
  // =======================================================

  const filteredSchedule = useMemo(() => {
    return scheduleData.filter((item) => {
      const title =
        String(item.title || '').toLowerCase();

      const venue =
        String(item.venue || '').toLowerCase();

      const category =
        String(item.category || '').toLowerCase();

      const coordinator =
        String(item.coordinator || '').toLowerCase();

      const time =
        String(item.time || '').toLowerCase();

      const description =
        String(item.description || '').toLowerCase();

      const matchesDay =
        item.day === selectedDay;

      const matchesVenue =
        selectedVenue === 'All Venues' ||
        item.venue === selectedVenue;

      const matchesCategory =
        selectedCategory === 'All Categories' ||
        item.category === selectedCategory;

      const matchesQuery =
        !effectiveSearch ||
        title.includes(effectiveSearch) ||
        venue.includes(effectiveSearch) ||
        category.includes(effectiveSearch) ||
        coordinator.includes(effectiveSearch) ||
        time.includes(effectiveSearch) ||
        description.includes(effectiveSearch);

      return (
        matchesDay &&
        matchesVenue &&
        matchesCategory &&
        matchesQuery
      );
    });
  }, [
    scheduleData,
    selectedDay,
    selectedVenue,
    selectedCategory,
    effectiveSearch,
  ]);


  // =======================================================
  // AVAILABLE CATEGORIES
  // =======================================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        scheduleData
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ];

    return uniqueCategories;
  }, [scheduleData]);


  // =======================================================
  // RESET FILTERS
  // =======================================================

  const resetFilters = () => {
    setSelectedVenue('All Venues');
    setSelectedCategory('All Categories');
    setLocalSearch('');
  };


  // =======================================================
  // OPEN EVENT
  // =======================================================

  const openEvent = (item) => {
    setSelectedEvent(item);
  };


  // =======================================================
  // CLOSE EVENT
  // =======================================================

  const closeEvent = () => {
    setSelectedEvent(null);
  };


  return (
    <section
      id="schedule"
      className="section-wrapper schedule-section"
      aria-labelledby="schedule-title"
    >

      <div className="container schedule-container">

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <header className="section-head schedule-header">

          <div className="section-tag">
            <IconClock size={16} />

            <span>
              Event Directory
            </span>
          </div>


          <h2 id="schedule-title">
            Events &amp; Competitions
          </h2>


          <p>
            Explore event timings, venues,
            coordinators, and complete event details.
          </p>

        </header>


        {/* =================================================
            DAY SELECTOR
        ================================================= */}

        <div
          className="schedule-day-tabs"
          role="tablist"
          aria-label="Event days"
        >

          {scheduleDays.map((day) => {
            const isActive =
              selectedDay === day.id;

            return (
              <button
                key={day.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`schedule-day-btn${
                  isActive ? ' active' : ''
                }`}
                onClick={() =>
                  setSelectedDay(day.id)
                }
              >

                <span className="schedule-day-label">
                  {day.label}
                </span>

                <span className="schedule-day-date">
                  {day.shortDate}
                </span>

              </button>
            );
          })}

        </div>


        {/* =================================================
            FILTER PANEL
        ================================================= */}

        <div className="filter-row">

          <div className="schedule-filters">

            {/* Venue */}

            <div className="filter-control">

              <label htmlFor="venue-select">
                Venue
              </label>

              <select
                id="venue-select"
                value={selectedVenue}
                onChange={(event) =>
                  setSelectedVenue(
                    event.target.value
                  )
                }
                className="form-select"
              >

                {scheduleVenues.map((venue) => (
                  <option
                    key={venue}
                    value={venue}
                  >
                    {venue}
                  </option>
                ))}

              </select>

            </div>


            {/* Category */}

            <div className="filter-control">

              <label htmlFor="category-select">
                Category
              </label>

              <select
                id="category-select"
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(
                    event.target.value
                  )
                }
                className="form-select"
              >

                <option value="All Categories">
                  All Categories
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}

              </select>

            </div>


            {/* Reset */}

            {(selectedVenue !== 'All Venues' ||
              selectedCategory !== 'All Categories' ||
              localSearch) && (

              <button
                type="button"
                className="schedule-reset-btn"
                onClick={resetFilters}
              >
                Reset
              </button>

            )}

          </div>


          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="search-input-wrapper">

            <IconSearch
              size={17}
              className="search-icon"
              aria-hidden="true"
            />

            <input
              type="search"
              placeholder="Search events..."
              value={localSearch}
              onChange={(event) =>
                setLocalSearch(
                  event.target.value
                )
              }
              className="search-input"
              aria-label="Search events"
              autoComplete="off"
            />

            {localSearch && (
              <button
                type="button"
                className="search-clear"
                aria-label="Clear search"
                onClick={() =>
                  setLocalSearch('')
                }
              >
                ×
              </button>
            )}

          </div>

        </div>


        {/* =================================================
            RESULT SUMMARY
        ================================================= */}

        <div className="schedule-result-bar">

          <span>
            <strong>
              {filteredSchedule.length}
            </strong>{' '}
            {filteredSchedule.length === 1
              ? 'event'
              : 'events'}{' '}
            found
          </span>

          {effectiveSearch && (
            <span className="schedule-search-state">
              Searching for "
              {globalSearch || localSearch}
              "
            </span>
          )}

        </div>


        {/* =================================================
            EVENT LIST
        ================================================= */}

        <div
          className="schedule-items-list"
          aria-live="polite"
        >

          {filteredSchedule.length === 0 ? (

            <div className="schedule-empty-state">

              <div className="schedule-empty-icon">
                <IconSearch size={24} />
              </div>

              <h3>
                No events found
              </h3>

              <p>
                Try another search term or
                change your filters.
              </p>

              <button
                type="button"
                className="schedule-empty-reset"
                onClick={resetFilters}
              >
                Clear Filters
              </button>

            </div>

          ) : (

            filteredSchedule.map((item, index) => {

              const eventTimer =
                getEventStatus(
                  item,
                  currentTime
                );

              const statusClass =
                getStatusClass(
                  eventTimer.status
                );

              return (

                <article
                  key={item.id}
                  className={`schedule-card ${
                    eventTimer.status === 'Live Now'
                      ? 'is-live'
                      : ''
                  }`}
                  style={{
                    '--card-index': index,
                  }}
                >

                  {/* =================================================
                      TIME COLUMN
                  ================================================= */}

                  <div className="schedule-time-col">

                    <div className="schedule-time-text">
                      {item.time}
                    </div>


                    <div className="schedule-date-badge">

                      <IconCalendar
                        size={13}
                        aria-hidden="true"
                      />

                      <span>
                        {item.date}
                      </span>

                    </div>


                    {/* Status */}

                    <span
                      className={`badge ${statusClass}`}
                    >

                      {eventTimer.status ===
                        'Live Now' && (
                        <span
                          className="pulse-dot"
                          aria-hidden="true"
                        />
                      )}

                      {eventTimer.text}

                    </span>

                  </div>


                  {/* =================================================
                      MAIN EVENT DETAILS
                  ================================================= */}

                  <div className="schedule-main-col">

                    <div className="schedule-title-row">

                      <h3 className="schedule-item-title">
                        {item.title}
                      </h3>

                      <span className="badge badge-upcoming schedule-category">
                        {item.category}
                      </span>

                    </div>


                    {/* Venue */}

                    <div className="schedule-venue-row">

                      <IconMapPin
                        size={16}
                        aria-hidden="true"
                      />

                      <span>
                        Venue:{' '}

                        <strong>
                          {item.venue}
                        </strong>

                        {item.locationDetail && (
                          <>
                            {' '}
                            ({item.locationDetail})
                          </>
                        )}

                      </span>

                    </div>


                    {/* Description */}

                    {item.description && (
                      <p className="schedule-desc">
                        {item.description}
                      </p>
                    )}


                    {/* Coordinator */}

                    {item.coordinator && (
                      <div className="schedule-coordinator">

                        <IconUser
                          size={14}
                          aria-hidden="true"
                        />

                        <span>
                          Coordinator:{' '}

                          <strong>
                            {item.coordinator}
                          </strong>
                        </span>

                      </div>
                    )}

                  </div>


                  {/* =================================================
                      ACTION
                  ================================================= */}

                  <button
                    type="button"
                    className="schedule-actions-col"
                    onClick={() =>
                      openEvent(item)
                    }
                    aria-label={`View details for ${item.title}`}
                  >

                    <span>
                      View Details
                    </span>

                    <span
                      className="schedule-action-arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>

                  </button>

                </article>

              );
            })

          )}

        </div>

      </div>


      {/* =====================================================
          EVENT MODAL
      ===================================================== */}

      {selectedEvent && (

        <EventModal
          event={{
            name: selectedEvent.title,

            category:
              selectedEvent.category,

            location:
              `${selectedEvent.venue} - ${
                selectedEvent.locationDetail || ''
              }`,

            date:
              selectedEvent.date,

            time:
              selectedEvent.time,

            teamSize:
              'See event details',

            rules:
              selectedEvent.guidelines || [],

            headDetails: {
              name:
                selectedEvent.coordinator,

              phone:
                selectedEvent.contactphone || '',

              whatsapp:
                selectedEvent.contactwhatsapp || '',
            },
          }}

          onClose={closeEvent}
        />

      )}

    </section>
  );
}
