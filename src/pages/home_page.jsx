import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section id="home" aria-labelledby="home-title">
      <h1 id="home-title">Semaphore 2K26 Support</h1>
      <p>Find arrival instructions, prepare for your events, and get answers to common questions.</p>
      <nav aria-label="Support pages">
        <ul>
          <li><Link to="/arrival">Arrival &amp; Check-in Guide</Link></li>
          <li><Link to="/checklist">Participant Checklist</Link></li>
          <li><Link to="/faq">FAQ &amp; Rules</Link></li>
        </ul>
      </nav>
    </section>
  );
}
