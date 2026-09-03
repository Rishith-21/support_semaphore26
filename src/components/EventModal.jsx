import {
  IconX,
  IconMapPin,
  IconClock,
  IconUser,
  IconPhone,
  IconWhatsApp,
  IconCheck
} from './Icons';


// hi
export function EventModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header: Event Name & Category */}
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {event.name}
            </h2>
            <div style={{ marginTop: '0.4rem' }}>
              <span className="badge badge-upcoming">{event.category}</span>
            </div>
          </div>

          <button onClick={onClose} className="modal-close-btn" aria-label="Close event modal">
            <IconX size={20} />
          </button>
        </div>

        {/* Key Information: Location, Date & Time, Team Size */}
        <div className="event-meta-list" style={{ marginBottom: '1.25rem' }}>
          <div className="event-meta-item">
            <IconMapPin size={18} className="event-meta-icon" />
            <div>
              <span className="event-meta-label">Location:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{event.location}</strong>
            </div>
          </div>

          <div className="event-meta-item">
            <IconClock size={18} className="event-meta-icon" />
            <div>
              <span className="event-meta-label">Date & Time:</span>
              <span>{event.date} • <strong>{event.time}</strong></span>
            </div>
          </div>

          <div className="event-meta-item">
            <IconUser size={18} className="event-meta-icon" />
            <div>
              <span className="event-meta-label">Team Size:</span>
              <span>{event.teamSize}</span>
            </div>
          </div>
        </div>

        {/* Rules & Guidelines */}
        {event.rules && event.rules.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
              Rules & Guidelines
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {event.rules.map((rule, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <IconCheck size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '3px' }} />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Coordinators Details */}
        {event.headDetails && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
              Coordinators Details
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: event.coHeadDetails ? 'repeat(auto-fit, minmax(220px, 1fr))' : '1fr', gap: '0.75rem' }}>
              {/* Head Coordinator */}
              <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                  {event.headDetails.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', marginBottom: '0.6rem' }}>
                  {event.headDetails.role || 'Event Coordinator'}
                </div>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {event.headDetails.phone && (
                    <a
                      href={`tel:${event.headDetails.phone.replace(/\s+/g, '')}`}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <IconPhone size={14} />
                      <span>Call</span>
                    </a>
                  )}
                  {event.headDetails.whatsapp && (
                    <a
                      href={`https://wa.me/${event.headDetails.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success btn-sm"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <IconWhatsApp size={14} />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Co-Head Coordinator if present */}
              {event.coHeadDetails && (
                <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                    {event.coHeadDetails.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--primary)', marginBottom: '0.6rem' }}>
                    {event.coHeadDetails.role || 'Co-Coordinator'}
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {event.coHeadDetails.phone && (
                      <a
                        href={`tel:${event.coHeadDetails.phone.replace(/\s+/g, '')}`}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        <IconPhone size={14} />
                        <span>Call</span>
                      </a>
                    )}
                    {event.coHeadDetails.whatsapp ? (
                      <a
                        href={`https://wa.me/${event.coHeadDetails.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success btn-sm"
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        <IconWhatsApp size={14} />
                        <span>WhatsApp</span>
                      </a>
                    ) : event.coHeadDetails.email ? (
                      <a
                        href={`mailto:${event.coHeadDetails.email}`}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        <span>Email</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Close Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
