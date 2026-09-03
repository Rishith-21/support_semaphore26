import { useState } from 'react';

const events = [
  { name: "Surprise Event", head: "John Doe", phone1: "+91 98765 43210", phone2: "+91 98765 43211", emoji: "🎁" },
  { name: "Dance", head: "Priya Sharma", phone1: "+91 91234 56789", phone2: "+91 91234 56780", emoji: "🕺" },
  { name: "Coding", head: "Arjun Kumar", phone1: "+91 90123 45678", phone2: "+91 90123 45679", emoji: "⌨️" },
  { name: "Web Design", head: "Sneha Patel", phone1: "+91 89012 34567", phone2: "+91 89012 34568", emoji: "🖌️" },
  { name: "Startup", head: "Rahul Verma", phone1: "+91 88901 23456", phone2: "+91 88901 23457", emoji: "💡" },
  { name: "Tech Talk", head: "Ananya Nair", phone1: "+91 87890 12345", phone2: "+91 87890 12346", emoji: "🗣️" },
  { name: "Photography", head: "Karthik Raj", phone1: "+91 86789 01234", phone2: "+91 86789 01235", emoji: "📸" },
  { name: "IT Manager", head: "Divya Menon", phone1: "+91 85678 90123", phone2: "+91 85678 90124", emoji: "🛠️" },
  { name: "Valorant", head: "Rohan Singh", phone1: "+91 84567 89012", phone2: "+91 84567 89013", emoji: "🎯" },
  { name: "IT Quiz", head: "Meera Iyer", phone1: "+91 83456 78901", phone2: "+91 83456 78902", emoji: "❓" },
];

const emergency = [
  { role: "Event Coordinator", name: "Dr. Suresh Babu", phone1: "+91 99999 00001", phone2: "+91 99999 00002" },
  { role: "Faculty In-charge", name: "Prof. Lakshmi R", phone1: "+91 99999 00003", phone2: "+91 99999 00004" },
];

function CopyPhone({ number }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px", background: "#F8FAFC", borderRadius: "6px" }}>
      <span style={{ fontSize: "13px", color: "#1E293B", fontWeight: 700 }}>📞 {number}</span>
      <button onClick={copy} title="Copy" style={{
        background: "none", border: "none", cursor: "pointer",
        fontSize: "13px", color: copied ? "#16a34a" : "#4F46E5", padding: "0 4px", fontWeight: 600,
      }}>
        {copied ? "✅ Copied" : "📋 Copy"}
      </button>
    </div>
  );
}

export default function Helpdesk() {
  return (
    <div style={{ padding: "48px 40px", background: "#F8FAFC", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px", borderBottom: "2px solid #E2E8F0", paddingBottom: "32px" }}>
        <span style={{ background: "#4F46E5", color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", padding: "4px 14px", borderRadius: "20px" }}>
          Semaphore '26
        </span>
        <h1 style={{ margin: "16px 0 8px", color: "#1E293B", fontSize: "40px", fontWeight: 800, letterSpacing: "-0.5px" }}>
          Help Desk
        </h1>
        <p style={{ color: "#1E293B", fontSize: "16px", margin: 0, fontWeight: 600 }}>
          Reach out to the event heads for any queries or assistance.
        </p>
      </div>

      {/* Event Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
        {events.map((event) => (
          <div key={event.name}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              overflow: "hidden",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(79,70,229,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; }}
          >
            {/* Card Top Bar */}
            <div style={{ background: "#4F46E5", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "28px" }}>{event.emoji}</span>
              <div>
                <p style={{ margin: 0, color: "#fff", fontWeight: 800, fontSize: "15px" }}>{event.name}</p>
                <p style={{ margin: 0, color: "#C7D2FE", fontSize: "12px" }}>Event Head</p>
              </div>
            </div>
            {/* Card Body */}
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "#D97706", background: "#FEF3C7", padding: "3px 10px", borderRadius: "20px" }}>
                  👤 {event.head}
                </span>
              </div>
              <CopyPhone number={event.phone1} />
              <CopyPhone number={event.phone2} />
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Section */}
      <div style={{ marginTop: "56px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <div style={{ flex: 1, height: "1px", background: "#E2E8F0" }} />
          <span style={{ background: "#DC2626", color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "4px 16px", borderRadius: "20px", whiteSpace: "nowrap" }}>
            🚨 Emergency Contacts
          </span>
          <div style={{ flex: 1, height: "1px", background: "#E2E8F0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
          {emergency.map((e) => (
            <div key={e.role} style={{
              background: "#FFFFFF",
              border: "1px solid #FECACA",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(220,38,38,0.08)",
            }}>
              <div style={{ background: "#DC2626", padding: "14px 20px" }}>
                <p style={{ margin: 0, color: "#FEE2E2", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>{e.role}</p>
                <p style={{ margin: "4px 0 0", color: "#fff", fontWeight: 800, fontSize: "15px" }}>{e.name}</p>
              </div>
              <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <CopyPhone number={e.phone1} />
                <CopyPhone number={e.phone2} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
