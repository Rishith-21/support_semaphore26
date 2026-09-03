import { useState } from 'react';
import { IconCopy, IconPhone, IconUser, IconWhatsApp } from '../components/Icons';
import { eventsData } from '../data/eventsData';
import './helpdesk.css';

function parseCoordinator(value) {
  const match = value.match(/^(.*?)\s*-\s*(\d+)$/);
  return {
    name: match?.[1]?.trim() || value,
    phone: match?.[2] || '',
  };
}

const eventContacts = eventsData
  .filter((event) => event.heads.length > 0)
  .map((event) => ({ ...event, coordinators: event.heads.map(parseCoordinator) }));

function Coordinator({ coordinator, copiedPhone, onCopy }) {
  const internationalPhone = `91${coordinator.phone}`;

  return (
    <div className="helpdesk-coordinator">
      <div className="helpdesk-person">
        <span className="helpdesk-avatar" aria-hidden="true">{coordinator.name.charAt(0)}</span>
        <div><strong>{coordinator.name}</strong><span>Event coordinator</span></div>
      </div>
      <a className="helpdesk-phone-number" href={`tel:+${internationalPhone}`}>+91 {coordinator.phone}</a>
      <div className="helpdesk-contact-actions">
        <a href={`tel:+${internationalPhone}`} aria-label={`Call ${coordinator.name}`}><IconPhone size={16} /> Call</a>
        <a href={`https://wa.me/${internationalPhone}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${coordinator.name}`}><IconWhatsApp size={16} /> WhatsApp</a>
        <button type="button" onClick={() => onCopy(coordinator.phone)} aria-label={`Copy ${coordinator.name}'s phone number`}><IconCopy size={16} /> {copiedPhone === coordinator.phone ? 'Copied' : 'Copy'}</button>
      </div>
    </div>
  );
}

export default function Helpdesk() {
  const [copiedPhone, setCopiedPhone] = useState('');

  const copyPhone = async (phone) => {
    await navigator.clipboard.writeText(`+91 ${phone}`);
    setCopiedPhone(phone);
    window.setTimeout(() => setCopiedPhone(''), 1500);
  };

  return (
    <section className="helpdesk-page">
      <div className="helpdesk-container">
        <header className="helpdesk-heading">
          <span className="helpdesk-eyebrow"><IconUser size={15} /> Event support</span>
          <h1>Help Desk</h1>
          <p>Contact the coordinators for questions about rules, participation, or event-day assistance.</p>
        </header>

        <div className="helpdesk-note">
          <IconPhone size={18} />
          <p><strong>Calling from India?</strong> Tap Call or WhatsApp for the quickest response.</p>
        </div>

        <div className="helpdesk-grid">
          {eventContacts.map((event) => (
            <article className="helpdesk-card" key={event.id}>
              <header className="helpdesk-card-heading">
                <div><span>{event.category}</span><h2>{event.name}</h2></div>
                <span className="helpdesk-head-count">{event.coordinators.length} contacts</span>
              </header>
              <div className="helpdesk-coordinator-list">
                {event.coordinators.map((coordinator) => (
                  <Coordinator key={`${event.id}-${coordinator.phone}`} coordinator={coordinator} copiedPhone={copiedPhone} onCopy={copyPhone} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
