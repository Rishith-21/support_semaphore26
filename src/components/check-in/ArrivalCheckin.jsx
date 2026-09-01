import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  ClipboardCheck,
  BadgeCheck,
  Rocket,
  Map,
  Calendar,
} from "lucide-react";
import "./ArrivalCheckin.css";

const steps = [
  {
    number: "01",
    label: "ARRIVE",
    emoji: "📍",
    icon: MapPin,
    title: "Arrive at the Venue",
    description:
      "Reach the college venue and follow the Semaphore event signs to the main entrance.",
    color: "#7c3aed",
    glow: "rgba(124, 58, 237, 0.4)",
  },
  {
    number: "02",
    label: "CHECK IN",
    emoji: "🎟️",
    icon: ClipboardCheck,
    title: "Check In",
    description:
      "Visit the registration desk and show your registration details or confirmation email.",
    color: "#2563eb",
    glow: "rgba(37, 99, 235, 0.4)",
  },
  {
    number: "03",
    label: "GET YOUR PASS",
    emoji: "🪪",
    icon: BadgeCheck,
    title: "Collect Your Pass",
    description:
      "Get your official participant / event pass after identity verification at the desk.",
    color: "#0891b2",
    glow: "rgba(8, 145, 178, 0.4)",
  },
  {
    number: "04",
    label: "START THE EVENT",
    emoji: "🚀",
    icon: Rocket,
    title: "Enter the Event",
    description:
      "Check your event schedule, find your venue, and proceed to your respective event.",
    color: "#059669",
    glow: "rgba(5, 150, 105, 0.4)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: "easeInOut", delay: 0.4 },
  },
};

const lineVertVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: "easeInOut", delay: 0.4 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const btnVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.12 + 0.2 },
  }),
};

export default function ArrivalCheckin() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section className="ac-section" ref={sectionRef} id="arrival-checkin">
      {/* Background grid overlay */}
      <div className="ac-grid-bg" aria-hidden="true" />

      {/* Ambient orbs */}
      <div className="ac-orb ac-orb-1" aria-hidden="true" />
      <div className="ac-orb ac-orb-2" aria-hidden="true" />

      <div className="ac-container">
        {/* ── Heading ── */}
        <motion.div
          className="ac-heading-wrap"
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="ac-heading">ARRIVAL &amp; CHECK-IN</h2>
          <p className="ac-subtitle">
            Everything you need to know before you enter&nbsp;
            <span className="ac-brand">Semaphore 2K26</span>.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="ac-timeline-wrapper">
          {/* Desktop horizontal connector line */}
          <motion.div
            className="ac-connector-h"
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ transformOrigin: "left center" }}
            aria-hidden="true"
          />

          <motion.div
            className="ac-steps"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {steps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </motion.div>

          {/* Mobile vertical connector line */}
          <motion.div
            className="ac-connector-v"
            variants={lineVertVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ transformOrigin: "top center" }}
            aria-hidden="true"
          />
        </div>

        {/* ── CTA Buttons ── */}
        <motion.div
          className="ac-cta-row"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.a
            href="#venue"
            className="ac-btn ac-btn-primary"
            variants={btnVariants}
            custom={0}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Map size={18} />
            View Venue
          </motion.a>
          <motion.a
            href="#schedule"
            className="ac-btn ac-btn-outline"
            variants={btnVariants}
            custom={1}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Calendar size={18} />
            View Schedule
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function StepCard({ step }) {
  const Icon = step.icon;

  return (
    <motion.div className="ac-step" variants={cardVariants}>
      {/* Step number badge */}
      <div
        className="ac-step-number"
        style={{
          color: step.color,
          textShadow: `0 0 5px ${step.glow}`,
        }}
      >
        {step.number}
      </div>

      {/* Connector dot (desktop) */}
      <div
        className="ac-dot"
        style={{
          background: step.color,
          boxShadow: `0 0 18px 4px ${step.glow}`,
        }}
        aria-hidden="true"
      />

      {/* Glassmorphism card */}
      <motion.div
        className="ac-card"
        style={{ "--accent": step.color, "--glow": step.glow }}
        whileHover={{
          y: -6,
          boxShadow: `0 8px 40px ${step.glow}, 0 0 0 1px ${step.color}55`,
        }}
        transition={{ duration: 0.25 }}
      >
        <div
          className="ac-card-icon-wrap"
          style={{
            background: `linear-gradient(135deg, ${step.color}22, ${step.color}0a)`,
            border: `1px solid ${step.color}44`,
          }}
        >
          <Icon size={22} color={step.color} strokeWidth={1.8} />
        </div>

        <span
          className="ac-card-label"
          style={{ color: step.color }}
        >
          {step.label}
        </span>

        <h3 className="ac-card-title">{step.title}</h3>
        <p className="ac-card-desc">{step.description}</p>

        {/* Bottom accent bar */}
        <div
          className="ac-card-bar"
          style={{
            background: `linear-gradient(90deg, ${step.color}, transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
