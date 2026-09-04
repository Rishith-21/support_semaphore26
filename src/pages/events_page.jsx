import { EventSection } from '../components/EventSection';
import { eventsData } from '../data/eventsData';

const eventLogos = {
  'Code Wave': '/Events_LOGO/codewave.png',
  'Coral Canvas': '/Events_LOGO/coral_canvas.png',
  'Aqua Byte': '/Events_LOGO/aquabyte.png',
  'Abyss Arena': '/Events_LOGO/abyss_arena.png',
  AquaVerse: '/Events_LOGO/aquaverse.png',
  'Ocean Enigma': '/Events_LOGO/ocean_enigma.png',
  Leviathan: '/Events_LOGO/leviathan.png',
  'The Meg Pitch': '/Events_LOGO/mega_pitch.png',
  Submarine: '/Events_LOGO/submarine.png',
  Narcissa: '/Events_LOGO/tide_tailor.png',
};

function parseHead(head, role) {
  if (!head) return undefined;
  const match = head.match(/^(.*?)\s*-\s*(\d+)$/);
  const name = match?.[1]?.trim() || head;
  const phone = match?.[2] || '';
  return { name, role, phone: phone ? `+91 ${phone}` : '', whatsapp: phone ? `91${phone}` : '' };
}

const [generalGuidelines] = eventsData.filter((event) => event.id === 'general-rules');
const events = eventsData.filter((event) => event.id !== 'general-rules').map((event) => ({
  ...event,
  imageUrl: eventLogos[event.name],
  headDetails: parseHead(event.heads?.[0], 'Event Head'),
  coHeadDetails: parseHead(event.heads?.[1], 'Co-head'),
}));

export default function EventsPage() {
  return <EventSection events={events} guidelines={generalGuidelines} />;
}
