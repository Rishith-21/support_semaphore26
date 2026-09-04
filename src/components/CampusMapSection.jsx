import { useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'

import { IconMapPin, IconSearch, IconMap } from './Icons'
import './CampusMapSection.css'

/* =========================================================
   NMAMIT CAMPUS CENTER
========================================================= */

const NMAMIT_CENTER = [13.1825, 74.9349]

/* =========================================================
   CUSTOM SEMAPHORE MARKER
========================================================= */

const createFacilityIcon = (active = false) =>
  L.divIcon({
    className: 'semaphore-map-marker-wrapper',

    html: `
      <div class="semaphore-map-marker ${active ? 'active' : ''}">
        <div class="semaphore-map-marker-pulse"></div>

        <div class="semaphore-map-marker-inner">
          <span>⌖</span>
        </div>
      </div>
    `,

    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -38],
  })

/* =========================================================
   MAP CONTROLLER

   Moves the map to the selected facility.
========================================================= */

function MapController({ selectedFacility }) {
  const map = useMap()

  useEffect(() => {
    if (
      selectedFacility?.coordinates?.lat &&
      selectedFacility?.coordinates?.lng
    ) {
      map.flyTo(
        [
          selectedFacility.coordinates.lat,
          selectedFacility.coordinates.lng,
        ],
        18,
        {
          duration: 1.2,
        },
      )
    }
  }, [selectedFacility, map])

  return null
}

/* =========================================================
   CAMPUS MAP SECTION
========================================================= */

export function CampusMapSection({
  campusData,
  categories,
  globalSearch = '',
}) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [localSearch, setLocalSearch] = useState('')
  const [hoveredFacility, setHoveredFacility] = useState(null)
  const [activeFacility, setActiveFacility] = useState(null)

  /* =======================================================
     SEARCH
  ======================================================= */

  const searchTerm = globalSearch || localSearch

  /* =======================================================
     FILTER FACILITIES
  ======================================================= */

  const filteredFacilities = campusData.filter((facility) => {
    const matchesCategory =
      activeCategory === 'All' ||
      facility.category === activeCategory

    const searchLower = searchTerm.toLowerCase()

    const matchesSearch =
      facility.name.toLowerCase().includes(searchLower) ||
      facility.description.toLowerCase().includes(searchLower) ||
      facility.category.toLowerCase().includes(searchLower)

    return matchesCategory && matchesSearch
  })

  /* =======================================================
     SELECT FACILITY
  ======================================================= */

  /* =======================================================
     SHOW / HIDE PIN
  ======================================================= */

  const handlePinClick = (id) => {
    setActiveFacility((current) =>
      current === id ? null : id,
    )
  }

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setLocalSearch('')
    setActiveCategory('All')
    setActiveFacility(null)
  }

  /* =======================================================
     SELECTED FACILITY
  ======================================================= */

  const selectedFacility = campusData.find(
    (facility) => facility.id === activeFacility,
  )

  return (
    <section
      className="campus-map-section fade-in"
      aria-labelledby="campus-map-title"
    >
      <div className="container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="section-header">

          <div className="section-title-wrapper">

            <span className="section-tag">
              Explore The Venue
            </span>

            <h2 id="campus-map-title">
              Campus Map & Facilities
            </h2>

          </div>

          <p className="section-description">
            Navigate through the NMAMIT campus and locate
            important venues, labs, and amenities for
            Semaphore 2K26.
          </p>

        </div>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="filter-row">

          <div
            className="filter-pills"
            aria-label="Filter facilities by category"
          >

            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat)
                  setActiveFacility(null)
                }}
                className={`filter-pill ${
                  activeCategory === cat ? 'active' : ''
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}

          </div>

          {!globalSearch && (
            <label className="search-box">

              <IconSearch
                className="search-icon"
                size={16}
              />

              <input
                type="text"
                placeholder="Search facilities..."
                value={localSearch}
                onChange={(e) =>
                  setLocalSearch(e.target.value)
                }
                className="search-input"
                aria-label="Search campus facilities"
              />

            </label>
          )}

        </div>

        {/* =================================================
            MAP + FACILITIES
        ================================================= */}

        <div className="map-content-wrapper">

          {/* =================================================
              REAL NMAMIT MAP
          ================================================= */}

          <div className="map-container-interactive real-campus-map">

            <MapContainer
              center={NMAMIT_CENTER}
              zoom={16}
              scrollWheelZoom={true}
              className="nmamit-leaflet-map"
              style={{
                width: '100%',
                height: '560px',
                minHeight: '560px',
              }}
            >

              {/* =============================================
                  OPEN STREET MAP
              ============================================= */}

              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* =============================================
                  CAMERA CONTROLLER
              ============================================= */}

              <MapController
                selectedFacility={selectedFacility}
              />

              {/* =============================================
                  FACILITY MARKERS
              ============================================= */}

              {filteredFacilities.map((facility) => {

                const lat = facility.coordinates?.lat
                const lng = facility.coordinates?.lng

                /*
                  Skip old facilities that still use
                  x/y coordinates.
                */

                if (
                  typeof lat !== 'number' ||
                  typeof lng !== 'number'
                ) {
                  return null
                }

                const isActive =
                  activeFacility === facility.id

                return (
                  <Marker
                    key={facility.id}
                    position={[lat, lng]}
                    icon={createFacilityIcon(isActive)}

                    eventHandlers={{
                      click: () => {
                        setActiveFacility(facility.id)
                      },

                      mouseover: () => {
                        setHoveredFacility(facility.id)
                      },

                      mouseout: () => {
                        setHoveredFacility(null)
                      },
                    }}
                  >

                    <Popup>

                      <div className="campus-map-popup">

                        <span className="popup-category">
                          {facility.category}
                        </span>

                        <strong>
                          {facility.name}
                        </strong>

                        <p>
                          {facility.description}
                        </p>

                        <a
                          href={facility.googleMapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Get directions →
                        </a>

                      </div>

                    </Popup>

                  </Marker>
                )
              })}

            </MapContainer>

            {/* =================================================
                MAP BRAND
            ================================================= */}

            <div className="map-brand-overlay">

              <span className="map-brand-dot"></span>

              <span>
                NMAMIT CAMPUS
              </span>

            </div>

            {/* =================================================
                MAP HELP
            ================================================= */}

            <div className="map-help-overlay">

              <IconMap size={16} />

              <span>
                Tap a location to explore
              </span>

            </div>

          </div>

          {/* =================================================
              FACILITY CARDS
          ================================================= */}

          <div className="facilities-grid">

            {filteredFacilities.length > 0 ? (

              filteredFacilities.map((facility) => (

                <article
                  key={facility.id}
                  id={`facility-${facility.id}`}
                  className={`facility-card ${
                    hoveredFacility === facility.id ||
                    activeFacility === facility.id
                      ? 'is-highlighted'
                      : ''
                  }`}

                  onMouseEnter={() =>
                    setHoveredFacility(facility.id)
                  }

                  onMouseLeave={() =>
                    setHoveredFacility(null)
                  }
                >

                  {/* =========================================
                      CARD HEADER
                  ========================================= */}

                  <div className="facility-card-header">

                    <div className="facility-icon-badge">
                      <IconMap size={20} />
                    </div>

                    <span className="facility-category-tag">
                      {facility.category}
                    </span>

                  </div>

                  {/* =========================================
                      TITLE
                  ========================================= */}

                  <h3 className="facility-card-title">
                    {facility.name}
                  </h3>

                  {/* =========================================
                      DESCRIPTION
                  ========================================= */}

                  <p className="facility-card-desc">
                    {facility.description}
                  </p>

                  {/* =========================================
                      BUTTONS
                  ========================================= */}

                  <div className="facility-card-footer">

                    {/* GET DIRECTIONS */}

                    <a
                      href={facility.googleMapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary facility-action-btn"
                    >

                      <IconMapPin size={18} />

                      <span>
                        Get directions
                      </span>

                    </a>

                    {/* SHOW ON MAP */}

                    <button
                      type="button"
                      className="btn btn-sm facility-locate-btn"
                      onClick={() =>
                        handlePinClick(facility.id)
                      }
                      aria-pressed={
                        activeFacility === facility.id
                      }
                    >

                      {activeFacility === facility.id
                        ? 'Hide pin'
                        : 'Show on map'}

                    </button>

                  </div>

                </article>

              ))

            ) : (

              /* =============================================
                 EMPTY STATE
              ============================================= */

              <div className="empty-state">

                <IconMap
                  size={48}
                  className="empty-icon"
                />

                <h3>
                  No facilities found
                </h3>

                <p>
                  Try adjusting your search or filters
                  to find what you're looking for.
                </p>

                <button
                  type="button"
                  className="btn btn-secondary mt-4"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </div>
    </section>
  )
}
