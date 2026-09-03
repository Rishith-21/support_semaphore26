import { useEffect, useRef, useState } from "react";
import "./home_page.css";

export default function HomePage() {
  const [introPhase, setIntroPhase] = useState("active"); // active | exit | done
  const [step, setStep] = useState(0);
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00' });

  useEffect(() => {
    const exitTimer = setTimeout(() => setIntroPhase("exit"), 3200);
    const doneTimer = setTimeout(() => setIntroPhase("done"), 4100);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, []);

  useEffect(() => {
    if (introPhase !== "done") return;
    const timers = [
      setTimeout(() => setStep(1),  100),
      setTimeout(() => setStep(2),  500),
      setTimeout(() => setStep(3),  950),
      setTimeout(() => setStep(4), 1350),
      setTimeout(() => setStep(5), 1650),
      setTimeout(() => setStep(6), 1900),
      setTimeout(() => setStep(7), 2200),
      setTimeout(() => setStep(8), 2700),
      setTimeout(() => setStep(9), 3050),
      setTimeout(() => setStep(10), 3400),
      setTimeout(() => setStep(11), 3750),
      setTimeout(() => setStep(12), 4100),
    ];
    return () => timers.forEach(clearTimeout);
  }, [introPhase]);

  useEffect(() => {
    const target = new Date('2026-09-17T00:00:00');
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setCountdown({ days: '00', hours: '00', minutes: '00' }); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setCountdown({
        days:    String(d).padStart(2, '0'),
        hours:   String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);



  return (
    <>
      {introPhase !== "done" && (
        <div className={`intro-overlay${introPhase === "exit" ? " intro-exit" : ""}`} aria-hidden="true">

          {/* noise texture */}
          <div className="intro-noise" />

          {/* glow bloom */}
          <div className="intro-glow" />

          {/* top rule */}
          <div className="intro-rule intro-rule-top" />

          {/* center */}
          <div className="intro-center">
            <p className="intro-tag">◆ &nbsp; SUPPORT CENTER &nbsp; ◆</p>

            <div className="intro-title-wrap">
              <h1 className="intro-title">
                <span className="intro-word intro-word-1">SEMAPHORE</span>
                <span className="intro-word intro-word-2">FEST</span>
                <span className="intro-word intro-word-3">2026</span>
              </h1>
              <div className="intro-underline" />
            </div>

            <p className="intro-sub">September 17 &nbsp;·&nbsp; Official Support</p>
          </div>

          {/* bottom rule */}
          <div className="intro-rule intro-rule-bottom" />

          {/* corner marks */}
          <span className="intro-corner tl" />
          <span className="intro-corner tr" />
          <span className="intro-corner bl" />
          <span className="intro-corner br" />
        </div>
      )}

      <div className="home">
        <div className="blob blob-1" aria-hidden="true" />
        <div className="blob blob-2" aria-hidden="true" />

        <main id="home" className="hero">
          <div className="hero-content">

            <p className={`small-title hero-anim${step >= 1 ? " show" : ""}`}>
              SEMAPHORE FEST 2026
            </p>

            <h1>
              <span className={`hero-anim delay-1${step >= 2 ? " show" : ""}`}>Need Help?</span>
              <br />
              <span className={`hero-anim delay-2 accent${step >= 3 ? " show" : ""}`}>We've Got You.</span>
            </h1>

            <p className={`description hero-anim delay-3${step >= 4 ? " show" : ""}`}>
              Welcome to the official Semaphore Fest support center.
              Find the information you need and get quick assistance throughout the fest.
            </p>

            <div className="buttons">
              <a href="/checklist" className={`primary-btn hero-anim delay-4${step >= 5 ? " show" : ""}`}>
                Participant Checklist
              </a>
              <a href="#contact" className={`secondary-btn hero-anim delay-5${step >= 6 ? " show" : ""}`}>
                Contact Support
              </a>
            </div>
          </div>

          <div className={`event-card hero-anim card-slide${step >= 7 ? " show" : ""}`}>
            <p className="card-label">EVENT STATUS</p>
            <h2>Semaphore Fest 2026</h2>
            <div className="status">
              <span className="status-dot" />
              Support is Online
            </div>
            <div className="countdown">
              <div><strong>{countdown.days}</strong><small>DAYS</small></div>
              <div><strong>{countdown.hours}</strong><small>HOURS</small></div>
              <div><strong>{countdown.minutes}</strong><small>MINUTES</small></div>
            </div>
          </div>
        </main>

        <section id="help" className="help-section">
          <p className={`small-title hero-anim${step >= 8 ? " show" : ""}`}>QUICK ASSISTANCE</p>
          <h2 className={`hero-anim${step >= 9 ? " show" : ""}`}>How can we help?</h2>

          <div className="help-grid">
            <div className={`help-card hero-anim${step >= 10 ? " show" : ""}`}>
              <h3>Participant Checklist</h3>
              <p>Check all the documents, campus requirements and event-specific requirements before attending Semaphore Fest.</p>
              <a href="/checklist" className="card-btn">Open Checklist</a>
            </div>

            <div className={`help-card hero-anim${step >= 11 ? " show" : ""}`}>
              <h3>Event Information</h3>
              <p>Find information about events, schedules, venues and participation.</p>
              <button>View Information</button>
            </div>

            <div className={`help-card hero-anim${step >= 12 ? " show" : ""}`}>
              <h3>Contact Support</h3>
              <p>Need help? Reach out to our support team and we'll assist you throughout Semaphore Fest 2026.</p>
              <a href="mailto:support@semaphorefest.com" className="card-btn">Contact Support</a>
            </div>
          </div>
        </section>

        <footer>
          <p>© 2026 Semaphore Fest. Support Center.</p>
        </footer>
      </div>
    </>
  );
}
