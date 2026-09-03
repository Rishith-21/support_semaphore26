import { EventSection } from '../components/EventSection';
import { eventsData } from '../data/eventsData';

const eventColors = [['#312e81', '#6366f1'], ['#9f1239', '#fb7185'], ['#075985', '#38bdf8'], ['#166534', '#4ade80'], ['#854d0e', '#facc15']];

function eventArtwork(name, index) {
  const [from, to] = eventColors[index % eventColors.length];
  const initials = name.split(' ').map((word) => word[0]).join('').slice(0, 3);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="800" height="420" fill="url(#g)"/><circle cx="700" cy="40" r="180" fill="white" opacity=".08"/><circle cx="90" cy="390" r="150" fill="white" opacity=".08"/><text x="400" y="245" text-anchor="middle" fill="white" font-family="Arial" font-size="112" font-weight="800">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function parseHead(head, role) {
  if (!head) return undefined;
  const match = head.match(/^(.*?)\s*-\s*(\d+)$/);
  const name = match?.[1]?.trim() || head;
  const phone = match?.[2] || '';
  return { name, role, phone: phone ? `+91 ${phone}` : '', whatsapp: phone ? `91${phone}` : '' };
}

const [generalGuidelines] = eventsData.filter((event) => event.id === 'general-rules');
const events = eventsData.filter((event) => event.id !== 'general-rules').map((event, index) => ({
  ...event,
  imageUrl: eventArtwork(event.name, index),
  headDetails: parseHead(event.heads?.[0], 'Event Head'),
  coHeadDetails: parseHead(event.heads?.[1], 'Co-head'),
}));

export default function EventsPage() {
  return <EventSection events={events} guidelines={generalGuidelines} />;
}
