import { useEffect, useState } from 'react';
import { EventModal } from './EventModal';

import {
  IconClock,
  IconCalendar,
  IconMapPin,
  IconSearch,
  IconUser
} from './Icons';


// ------------------------------------
// Calculate event status and countdown
// ------------------------------------
function getEventStatus(item, now) {
  const date = item.date;

  // Extract start and end time
  const timeParts = item.time.match(
    /(\d{1,2}:\d{2}\s*[AP]M)(?:\s*-\s*(\d{1,2}:\d{2}\s*[AP]M))?/i
  );

  // If time cannot be understood
  if (!timeParts) {
    return {
      status: 'Upcoming',
      text: 'Upcoming'
    };
  }

  const startTime = timeParts[1];
  let endTime = timeParts[2];

  // ------------------------------------
  // 24-hour event
  // ------------------------------------
  if (item.time.toLowerCase().includes('ongoing 24h')) {
    const start = new Date(`${date} ${startTime}`);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

    if (now < start) {
      return {
        status: 'Upcoming',
        text: `Starts in ${formatCountdown(start - now)}`
      };
    }

    if (now < end) {
      return {
        status: 'Live Now',
        text: 'LIVE NOW'
      };
    }

    return {
      status: 'Completed',
      text: 'COMPLETED'
    };
  }

  // ------------------------------------
  // Event with only a start time
  // Assume 1 hour duration
  // ------------------------------------
  if (!endTime) {
    const start = new Date(`${date} ${startTime}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    if (now < start) {
      return {
        status: 'Upcoming',
        text: `Starts in ${formatCountdown(start - now)}`
      };
    }

    if (now < end) {
      return {
        status: 'Live Now',
        text: 'LIVE NOW'
      };
    }

    return {
      status: 'Completed',
      text: 'COMPLETED'
    };
  }

  // ------------------------------------
  // Normal event with start and end time
  // ------------------------------------
  const start = new Date(`${date} ${startTime}`);
  const end = new Date(`${date} ${endTime}`);

  // Before event
  if (now < start) {
    return {
      status: 'Upcoming',
      text: `Starts in ${formatCountdown(start - now)}`
    };
  }

  // Event currently happening
  if (now < end) {
    return {
      status: 'Live Now',
      text: 'LIVE NOW'
    };
  }

  // Event finished
  return {
    status: 'Completed',
    text: 'COMPLETED'
  };
}


// ------------------------------------
// Format countdown
// ------------------------------------
function formatCountdown(milliseconds) {
  const totalSeconds = Math.max(
    0,
    Math.floor(milliseconds / 1000)
  );

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  // If more than one day
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


// ------------------------------------
// Schedule / Events Section
// ------------------------------------
export function ScheduleSection({
  scheduleData,
  scheduleDays,
  scheduleVenues,
  globalSearch
}) {

  const [selectedDay, setSelectedDay] = useState('day1');

  const [selectedVenue, setSelectedVenue] = useState('All Venues');

  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const [localSearch, setLocalSearch] = useState('');

  const [selectedEvent, setSelectedEvent] = useState(null);

  // Current time used by countdown
  const [currentTime, setCurrentTime] = useState(new Date());


  // ------------------------------------
  // Update current time every second
  // ------------------------------------
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  // ------------------------------------
  // Search
  // ------------------------------------
  const effectiveSearch = globalSearch || localSearch;


  // ------------------------------------
  // Filter events
  // ------------------------------------
  const filteredSchedule = scheduleData.filter((item) => {

      const matchesDay =
        item.day === selectedDay;

      const matchesVenue =
        selectedVenue === 'All Venues' ||
        item.venue === selectedVenue;

      const matchesCategory =
        selectedCategory === 'All Categories' ||
        item.category === selectedCategory;

      const search =
        effectiveSearch.toLowerCase();

      const matchesQuery =
        item.title.toLowerCase().includes(search) ||
        item.venue.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search) ||
        item.coordinator.toLowerCase().includes(search) ||
        item.time.toLowerCase().includes(search);

      return (
        matchesDay &&
        matchesVenue &&
        matchesCategory &&
        matchesQuery
      );
    });


  // ------------------------------------
  // Page
  // ------------------------------------
  return (
    <section
      id="schedule"
      className="section-wrapper"
    >

      <div className="container schedule-container">

        {/* Section Header */}
        <div className="section-head">

          <div className="section-tag">
            <IconClock size={16} />

            <span>
              Event Directory
            </span>
          </div>

          <h2>
            Events & Competitions
          </h2>

          <p>
            Explore event timings, venues,
            coordinators, and event details.
          </p>

        </div>


        {/* Day Selector */}
        <div className="schedule-day-tabs">

          {scheduleDays.map((d) => (

            <button
              key={d.id}
              onClick={() =>
                setSelectedDay(d.id)
              }
              className={`schedule-day-btn ${
                selectedDay === d.id
                  ? 'active'
                  : ''
              }`}
            >

              <span>
                {d.label}
              </span>

              <span
                style={{
                  fontSize: '0.8rem',
                  opacity: 0.85,
                  marginLeft: '0.4rem'
                }}
              >
                ({d.shortDate})
              </span>

            </button>

          ))}

        </div>


        {/* Filters */}
        <div className="filter-row">

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              flex: 1
            }}
          >

            <label
              htmlFor="venue-select"
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-muted)'
              }}
            >
              Filter by Venue:
            </label>


            <select
              id="venue-select"
              value={selectedVenue}
              onChange={(e) =>
                setSelectedVenue(e.target.value)
              }
              className="form-select"
              style={{
                maxWidth: '280px',
                padding: '0.45rem 0.75rem',
                fontSize: '0.85rem'
              }}
            >

              {scheduleVenues.map((v) => (

                <option
                  key={v}
                  value={v}
                >
                  {v}
                </option>

              ))}

            </select>

            <label
                htmlFor="category-select"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)'
                }}
              >
                Category:
            </label>

              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
                style={{
                  maxWidth: '220px',
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.85rem'
                }}
              >
                <option value="All Categories">All Categories</option>
                <option value="Coding & Dev">Coding & Dev</option>
                <option value="Web & Design">Web & Design</option>
                <option value="General">General</option>
                <option value="General & Management">General & Management</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Gaming & Esports">Gaming & Esports</option>
                <option value="AI & Data">AI & Data</option>
              </select>

          </div>


          {/* Search */}
          <div className="search-input-wrapper">

            <IconSearch
              size={16}
              className="search-icon"
            />

            <input
              type="text"
              placeholder="Search events..."
              value={effectiveSearch}
              onChange={(e) =>
                setLocalSearch(e.target.value)
              }
              className="search-input"
            />

          </div>

        </div>


        {/* Event List */}
        <div className="schedule-items-list">

          {filteredSchedule.length === 0 ? (

            <div
              style={{
                textAlign: 'center',
                padding: '3rem',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--text-muted)'
              }}
            >
              No events found for this
              day, venue, or search.
            </div>

          ) : (

            filteredSchedule.map((item) => {

              // Calculate live timer/status
              const eventTimer =
                getEventStatus(
                  item,
                  currentTime
                );


              return (

                <div
                  key={item.id}
                  className="schedule-card"
                  onClick={() =>
                    setSelectedEvent(item)
                  }
                >

                  {/* Time & Status */}
                  <div className="schedule-time-col">

                    <div className="schedule-time-text">
                      {item.time}
                    </div>


                    <div className="schedule-date-badge">

                      <IconCalendar
                        size={13}
                        style={{
                          display: 'inline',
                          marginRight: '4px',
                          verticalAlign: 'text-bottom'
                        }}
                      />

                      {item.date}

                    </div>


                    {/* Dynamic Timer */}
                    <span
                      className={`badge ${
                        eventTimer.status === 'Live Now'
                          ? 'badge-live'
                          : eventTimer.status === 'Completed'
                            ? 'badge-completed'
                            : 'badge-upcoming'
                      }`}
                      style={{
                        alignSelf: 'flex-start',
                        marginTop: '0.2rem'
                      }}
                    >

                      {eventTimer.status === 'Live Now' && (

                        <span
                          className="pulse-dot"
                          style={{
                            width: '6px',
                            height: '6px'
                          }}
                        />

                      )}

                      {eventTimer.text}

                    </span>

                  </div>


                  {/* Event Details */}
                  <div className="schedule-main-col">

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flexWrap: 'wrap'
                      }}
                    >

                      <h3 className="schedule-item-title">
                        {item.title}
                      </h3>


                      <span
                        className="badge badge-upcoming"
                        style={{
                          fontSize: '0.7rem'
                        }}
                      >
                        {item.category}
                      </span>

                    </div>


                    {/* Venue */}
                    <div className="schedule-venue-row">

                      <IconMapPin
                        size={16}
                        style={{
                          flexShrink: 0
                        }}
                      />

                      <span>
                        Venue:{' '}
                        <strong>
                          {item.venue}
                        </strong>{' '}
                        ({item.locationDetail})
                      </span>

                    </div>


                    {/* Description */}
                    <p className="schedule-desc">
                      {item.description}
                    </p>


                    {/* Coordinator */}
                    <div
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        marginTop: '0.2rem'
                      }}
                    >

                      <IconUser size={14} />

                      <span>
                        Coordinator:{' '}

                        <strong
                          style={{
                            color:
                              'var(--text-secondary)'
                          }}
                        >
                          {item.coordinator}
                        </strong>

                      </span>

                    </div>

                  </div>


                  {/* Action */}
                  <div className="schedule-actions-col">
                    <span style={{fontSize: '0.75rem',color: 'var(--text-dim)'}}>View Details →</span>
                  </div>

                </div>

              );

            })

          )}

        </div>

      </div>


      {/* ------------------------------------
          Event Detail Modal
      ------------------------------------ */}

      {selectedEvent && (

        <EventModal

          event={{

            name: selectedEvent.title,

            category:
              selectedEvent.category,

            location:
              `${selectedEvent.venue} - ${selectedEvent.locationDetail}`,

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

              // IMPORTANT:
              // These names must match
              // scheduleData.js
              phone:
                selectedEvent.contactphone || '',

              whatsapp:
                selectedEvent.contactwhatsapp || ''

            }

          }}

          onClose={() =>
            setSelectedEvent(null)
          }

        />

      )}

    </section>
  );
}
