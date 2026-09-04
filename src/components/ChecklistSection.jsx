import { useState, useEffect, useMemo } from 'react';
import './ChecklistSection.css';
import { generalChecklist, eventChecklists } from '../data/checklistData';
import {
  IconCheck,
  IconSearch,
  IconShield,
  IconTicket,
  IconLaptop,
  IconAlertTriangle,
  IconClock,
  IconMapPin,
  IconPhone,
  IconWhatsApp,
  IconFilter,
  IconSparkles,
  IconCheckCircle2,
  IconInfo,
} from './Icons';


export function ChecklistSection({ globalSearch = '' }) {
  const STORAGE_KEY = 'semaphore_checklist_v1';
  const EVENTS_STORAGE_KEY = 'semaphore_my_events_v1';

  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [searchQuery, setSearchQuery] = useState(globalSearch);
  const [selectedEventFilter, setSelectedEventFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedEventIds, setSelectedEventIds] = useState(() => {
    try {
      const saved = localStorage.getItem(EVENTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems)); }
    catch { /* localStorage may be unavailable */ }
  }, [checkedItems]);

  useEffect(() => {
    try { localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(selectedEventIds)); }
    catch { /* localStorage may be unavailable */ }
  }, [selectedEventIds]);

  const toggleEvent = (eventId) => {
    setSelectedEventIds((prev) => prev.includes(eventId)
      ? prev.filter((id) => id !== eventId)
      : [...prev, eventId]);
    if (selectedEventFilter === eventId) setSelectedEventFilter('all');
  };

  const toggleItem = (id) =>
    setCheckedItems((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  /* ── STATS ── */
  const allGeneralItems = useMemo(() => generalChecklist.flatMap((c) => c.items), []);
  const selectedEvents = useMemo(
    () => eventChecklists.filter((event) => selectedEventIds.includes(event.eventId)),
    [selectedEventIds],
  );
  const allEventItems = useMemo(() => selectedEvents.flatMap((e) => e.items), [selectedEvents]);
  const allItems = useMemo(() => [...allGeneralItems, ...allEventItems], [allGeneralItems, allEventItems]);
  const completedCount = allItems.filter((i) => checkedItems.includes(i.id)).length;
  const totalItemsCount = allItems.length;
  const progressPct = totalItemsCount > 0 ? Math.round((completedCount / totalItemsCount) * 100) : 0;

  /* ── FILTERS ── */
  const filteredGeneral = useMemo(() => {
    if (activeTab === 'event-wise') return [];
    const q = searchQuery.trim().toLowerCase();
    return generalChecklist.map((cat) => ({
      ...cat,
      items: cat.items.filter((i) => !q || [i.title, i.description, i.priority, i.tip || '', cat.categoryTitle].some((s) => s.toLowerCase().includes(q))),
    })).filter((c) => c.items.length > 0);
  }, [searchQuery, activeTab]);

  const filteredEvents = useMemo(() => {
    if (activeTab === 'general') return [];
    const q = searchQuery.trim().toLowerCase();
    return selectedEvents
      .filter((e) => selectedEventFilter === 'all' || e.eventId === selectedEventFilter)
      .map((evt) => ({
        ...evt,
        items: evt.items.filter((i) => !q || [i.title, i.description, i.priority, i.tip || '', evt.eventName, evt.venue].some((s) => s.toLowerCase().includes(q))),
      }))
      .filter((e) => e.items.length > 0);
  }, [searchQuery, selectedEventFilter, activeTab, selectedEvents]);

  const getCategoryIcon = (name) => {
    switch (name) {
      case 'shield': return <IconShield size={20} />;
      case 'ticket': return <IconTicket size={20} />;
      case 'laptop': return <IconLaptop size={20} />;
      case 'alert': return <IconAlertTriangle size={20} />;
      default: return <IconCheckCircle2 size={20} />;
    }
  };

  /* ── RENDER ITEM ── */
  const renderItem = (item) => {
    const isChecked = checkedItems.includes(item.id);
    return (
      <div
        key={item.id}
        className={`checklist-item-row${isChecked ? ' item-checked' : ''}`}
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={0}
        onClick={() => toggleItem(item.id)}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleItem(item.id); } }}
      >
        <div className="item-checkbox-wrapper">
          <input type="checkbox" checked={isChecked} onChange={() => { }} className="item-checkbox-native" tabIndex={-1} aria-hidden="true" />
          <div className="custom-checkbox-visual">{isChecked && <IconCheck size={14} />}</div>
        </div>
        <div className="item-content-wrapper">
          <div className="item-title-line">
            <span className={`item-title-text${isChecked ? ' text-strike' : ''}`}>{item.title}</span>
            <span className={`priority-pill priority-${item.priority}`}>{item.priority}</span>
          </div>
          <p className="item-description-text">{item.description}</p>
          {item.tip && (
            <div className="item-tip-box"><IconInfo size={14} /><span>{item.tip}</span></div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="checklist-page-wrapper" aria-labelledby="checklist-page-title">
      <div className="container">

        {/* ── HERO CARD ── */}
        <div className="checklist-hero-card">
          <div className="checklist-hero-header">
            <span className="checklist-tag"><IconSparkles size={15} /> Participant Readiness Portal</span>
            <h1 id="checklist-page-title" className="checklist-main-title">Participant Fest &amp; Event Checklist</h1>
            <p className="checklist-subtitle">
              Ensure you and your contingent are 100% prepared. Complete the general campus prerequisites first, then review your event-specific requirements.
            </p>
          </div>

          <div className="my-events-panel" aria-labelledby="my-events-title">
            <div className="my-events-heading">
              <div>
                <span className="my-events-step">Personalize your checklist</span>
                <h2 id="my-events-title">Which events are you attending?</h2>
                <p>Select your registered events so readiness only counts what applies to you.</p>
              </div>
              <span className="my-events-count">{selectedEventIds.length} selected</span>
            </div>
            <div className="my-events-grid">
              {eventChecklists.map((event) => {
                const selected = selectedEventIds.includes(event.eventId);
                return (
                  <button type="button" key={event.eventId} className={`my-event-option${selected ? ' selected' : ''}`} aria-pressed={selected} onClick={() => toggleEvent(event.eventId)}>
                    <span className="my-event-check" aria-hidden="true">{selected ? <IconCheck size={14} /> : null}</span>
                    <span><strong>{event.eventName}</strong><small>{event.eventCode} · {event.category}</small></span>
                  </button>
                );
              })}
            </div>
            {selectedEventIds.length === 0 && <p className="my-events-hint">Your general checklist is ready. Select at least one event to add its requirements.</p>}
          </div>

          {/* ── PROGRESS METER ── */}
          <div className="checklist-progress-card">
            <div className="progress-card-top">
              <div className="progress-stats-group">
                <span className="progress-percentage-pill">{progressPct}% Ready</span>
                <span className="progress-counter-text"><strong>{completedCount}</strong> of <strong>{totalItemsCount}</strong> items checked</span>
              </div>
              {progressPct === 100 && selectedEventIds.length > 0 && (
                <span className="all-ready-badge"><IconCheck size={15} /> All Set for Semaphore 2K26!</span>
              )}
            </div>

            <div className="progress-bar-track" role="progressbar" aria-valuenow={progressPct} aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar-fill" style={{ width: `${progressPct}%` }}></div>
            </div>

          </div>
        </div>

        {/* ── FILTER TOOLBAR ── */}
        <div className="checklist-filter-toolbar">
          <div className="checklist-tabs">
            {[
              { id: 'all', label: `All Items (${allItems.length})` },
              { id: 'general', label: `1. General First (${allGeneralItems.length})` },
              { id: 'event-wise', label: `2. My Events (${allEventItems.length})` },
            ].map((tab) => (
              <button key={tab.id} className={`checklist-tab-btn${activeTab === tab.id ? ' active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="checklist-search-row">
            <div className="checklist-search-box">
              <IconSearch size={17} className="search-icon" />
              <input
                type="text"
                placeholder="Search items, requirements, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="checklist-search-input"
              />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="search-clear-btn" aria-label="Clear">✕</button>}
            </div>

            {activeTab !== 'general' && (
              <div className="checklist-event-selector">
                <IconFilter size={15} className="selector-icon" />
                <select value={selectedEventFilter} onChange={(e) => setSelectedEventFilter(e.target.value)} className="checklist-event-select">
                  <option value="all">My Events ({selectedEvents.length})</option>
                  {selectedEvents.map((e) => (
                    <option key={e.eventId} value={e.eventId}>{e.eventName} ({e.eventCode})</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* ── SECTION 1: GENERAL (FIRST) ── */}
        {activeTab !== 'event-wise' && filteredGeneral.length > 0 && (
          <div className="checklist-section-block" id="general-checklist-block">
            <div className="section-block-header">
              <div className="section-block-badge">STEP 1 — GENERAL FIRST</div>
              <h2 className="section-block-title">General Fest &amp; Campus Readiness</h2>
              <p className="section-block-desc">Core prerequisites mandatory for campus entry, security clearance, helpdesk kit collection, and official lanyard issuance.</p>
            </div>

            <div className="general-categories-grid">
              {filteredGeneral.map((category) => {
                const done = category.items.filter((i) => checkedItems.includes(i.id)).length;
                const complete = category.items.length > 0 && done === category.items.length;
                return (
                  <div key={category.id} className={`checklist-category-card${complete ? ' category-complete' : ''}`}>
                    <div className="category-card-header">
                      <div className="category-header-left">
                        <div className="category-icon-wrapper">{getCategoryIcon(category.icon)}</div>
                        <div>
                          <h3 className="category-card-title">{category.categoryTitle}</h3>
                          <p className="category-card-subtitle">{category.categorySubtitle}</p>
                        </div>
                      </div>
                      <span className={`category-status-pill${complete ? ' status-done' : ''}`}>{done}/{category.items.length} Done</span>
                    </div>
                    <div className="checklist-items-list">
                      {category.items.map(renderItem)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── SECTION 2: EVENT-WISE (SECOND) ── */}
        {activeTab !== 'general' && selectedEvents.length === 0 && !searchQuery && (
          <div className="select-events-empty">
            <IconTicket size={30} />
            <h3>Add your registered events</h3>
            <p>Choose events above to see the equipment, preparation, and reporting requirements relevant to you.</p>
            <button type="button" className="btn btn-primary" onClick={() => document.getElementById('my-events-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Choose My Events</button>
          </div>
        )}

        {activeTab !== 'general' && filteredEvents.length > 0 && (
          <div className="checklist-section-block" id="event-wise-checklist-block">
            <div className="section-block-header">
              <div className="section-block-badge">STEP 2 — EVENT-WISE</div>
              <h2 className="section-block-title">Event-Specific Requirements &amp; Peripherals</h2>
              <p className="section-block-desc">Technical toolchains, hardware configs, dress codes, and lab prerequisites customised for each registered event.</p>
            </div>

            <div className="events-checklist-grid">
              {filteredEvents.map((event) => {
                const done = event.items.filter((i) => checkedItems.includes(i.id)).length;
                const complete = event.items.length > 0 && done === event.items.length;
                return (
                  <div key={event.eventId} className={`event-checklist-card${complete ? ' event-complete' : ''}`}>
                    <div className="event-card-top">
                      <div className="event-badge-row">
                        <span className="event-code-pill">{event.eventCode}</span>
                        <span className="event-cat-pill">{event.category}</span>
                      </div>
                      <h3 className="event-card-title">{event.eventName}</h3>
                      <div className="event-meta-row">
                        <div className="event-meta-item"><IconMapPin size={14} /><span>{event.venue}</span></div>
                        <div className="event-meta-item"><IconClock size={14} /><span>{event.time}</span></div>
                      </div>
                      <div className="event-coordinator-strip">
                        <span className="coord-label">Lead Coordinator: <strong>{event.headName}</strong></span>
                        <div className="coord-buttons">
                          <a href={`tel:${event.headPhone.replace(/\s+/g, '')}`} className="btn btn-secondary btn-sm" onClick={(e) => e.stopPropagation()}>
                            <IconPhone size={13} /><span>Call</span>
                          </a>
                          <a href={`https://wa.me/${event.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm" onClick={(e) => e.stopPropagation()}>
                            <IconWhatsApp size={13} /><span>Chat</span>
                          </a>
                        </div>
                      </div>
                      <div className="event-progress-strip">
                        <div className="event-progress-info">
                          <span>Event Readiness</span>
                          <strong>{done} of {event.items.length} completed</strong>
                        </div>
                        <div className="event-progress-track">
                          <div className="event-progress-fill" style={{ width: `${(done / event.items.length) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="event-checklist-items">
                      {event.items.map((item) => {
                        const isChecked = checkedItems.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            className={`checklist-item-row event-item-row${isChecked ? ' item-checked' : ''}`}
                            role="checkbox"
                            aria-checked={isChecked}
                            tabIndex={0}
                            onClick={() => toggleItem(item.id)}
                            onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleItem(item.id); } }}
                          >
                            <div className="item-checkbox-wrapper">
                              <input type="checkbox" checked={isChecked} onChange={() => { }} className="item-checkbox-native" tabIndex={-1} aria-hidden="true" />
                              <div className="custom-checkbox-visual">{isChecked && <IconCheck size={14} />}</div>
                            </div>
                            <div className="item-content-wrapper">
                              <div className="item-title-line">
                                <span className={`item-title-text${isChecked ? ' text-strike' : ''}`}>{item.title}</span>
                                <span className={`priority-pill priority-${item.priority}`}>{item.priority}</span>
                              </div>
                              <p className="item-description-text">{item.description}</p>
                              {item.tip && <div className="item-tip-box"><IconInfo size={14} /><span>{item.tip}</span></div>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {filteredGeneral.length === 0 && filteredEvents.length === 0 && (selectedEvents.length > 0 || Boolean(searchQuery)) && (
          <div className="checklist-empty-state">
            <IconSearch size={40} className="empty-icon" />
            <h3>No matching checklist items found</h3>
            <p>Try different keywords or clear the current filter.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedEventFilter('all'); setActiveTab('all'); }} className="btn btn-primary">
              Reset Filters
            </button>
          </div>
        )}

        {/* ── PRINT FOOTER ── */}
        <div className="print-footer-banner">
          <p>Generated from SEMAPHORE 2K26 Participant Portal • MCA — NMAMIT</p>
          <p>Emergency Desk: +91 98455 00911</p>
        </div>

      </div>
    </section>
  );
}

