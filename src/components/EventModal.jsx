import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IconX, IconUser, IconPhone, IconWhatsApp, IconCheck } from './Icons';

function CoordinatorCard({ coordinator }) {
  if (!coordinator) return null;

  return (
    <article className="event-coordinator-card">
      <div className="event-coordinator-avatar" aria-hidden="true">
        {coordinator.name.charAt(0).toUpperCase()}
      </div>
      <div className="event-coordinator-copy">
        <strong>{coordinator.name}</strong>
        <span>{coordinator.role || 'Event Coordinator'}</span>
      </div>
      <div className="event-coordinator-actions">
        {coordinator.phone && (
          <a href={`tel:${coordinator.phone.replace(/\s+/g, '')}`} className="event-contact-button event-call-button">
            <IconPhone size={15} /> Call
          </a>
        )}
        {coordinator.whatsapp && (
          <a href={`https://wa.me/${coordinator.whatsapp}`} target="_blank" rel="noopener noreferrer" className="event-contact-button event-whatsapp-button">
            <IconWhatsApp size={15} /> WhatsApp
          </a>
        )}
      </div>
    </article>
  );
}

export function EventModal({ event, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (keyboardEvent) => {
      if (keyboardEvent.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  if (!event) return null;

  return createPortal(
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal-content event-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title" onMouseDown={(e) => e.stopPropagation()}>
        <header className="event-modal-hero">
          {event.imageUrl && <img src={event.imageUrl} alt="" className="event-modal-image" />}
          <div className="event-modal-shade" />
          <div className="event-modal-heading">
            <span className="event-modal-category">{event.category}</span>
            <h2 id="event-modal-title">{event.name}</h2>
            {event.description && <p>{event.description}</p>}
          </div>
          <button ref={closeButtonRef} onClick={onClose} className="modal-close-btn" aria-label="Close event details">
            <IconX size={20} />
          </button>
        </header>

        <div className="event-modal-body">
          {event.participants > 0 && (
            <div className="event-modal-facts event-modal-facts-single" aria-label="Event information">
              <div className="event-modal-fact"><IconUser size={19} /><span><small>Participants</small><strong>{event.participants}</strong></span></div>
            </div>
          )}

          {event.rules?.length > 0 && (
            <section className="event-modal-section">
              <div className="event-modal-section-heading">
                <h3>Rules &amp; guidelines</h3>
                <span>{event.rules.length} points</span>
              </div>
              <ul className="event-rules-list">
                {event.rules.map((rule, index) => (
                  <li key={index}><span className="event-rule-check"><IconCheck size={14} /></span><span>{rule}</span></li>
                ))}
              </ul>
            </section>
          )}

          {event.headDetails && (
            <section className="event-modal-section">
              <div className="event-modal-section-heading"><h3>Event coordinators</h3><span>Need help?</span></div>
              <div className="event-coordinator-grid">
                <CoordinatorCard coordinator={event.headDetails} />
                <CoordinatorCard coordinator={event.coHeadDetails} />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
