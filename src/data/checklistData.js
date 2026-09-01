export const generalChecklist = [
  {
    id: "required-documents",
    categoryTitle: "Required Documents",
    categorySubtitle:
      "Documents required for registration, verification, and campus entry.",
    icon: "shield",

    items: [
      {
        id: "student-id",
        title: "Carry your college ID",
        description:
          "Bring a valid college or student identification card.",
        priority: "required",
        tip: "Keep your ID easily accessible during check-in.",
      },
      {
        id: "government-id",
        title: "Carry a valid government ID",
        description:
          "Carry a valid government-issued identification document.",
        priority: "required",
        tip: "Carry the original document whenever possible.",
      },
      {
        id: "registration-confirmation",
        title: "Keep registration confirmation",
        description:
          "Keep your event registration confirmation available on your phone.",
        priority: "required",
      },
    ],
  },

  {
    id: "general-preparation",
    categoryTitle: "General Event Preparation",
    categorySubtitle:
      "Complete these preparations before arriving at the event.",
    icon: "ticket",

    items: [
      {
        id: "check-schedule",
        title: "Check the event schedule",
        description:
          "Review the event timings and reporting time before arriving.",
        priority: "required",
      },
      {
        id: "check-venue",
        title: "Check the event venue",
        description:
          "Know the location of your event and the appropriate reporting area.",
        priority: "required",
      },
      {
        id: "phone-charged",
        title: "Charge your phone",
        description:
          "Make sure your phone has sufficient battery for registration and communication.",
        priority: "recommended",
      },
      {
        id: "emergency-contacts",
        title: "Save helpdesk contact",
        description:
          "Save the official event helpdesk number on your phone.",
        priority: "recommended",
      },
    ],
  },

  {
    id: "things-to-bring",
    categoryTitle: "Things to Bring",
    categorySubtitle:
      "Useful items that can make your event experience easier.",
    icon: "laptop",

    items: [
      {
        id: "water-bottle",
        title: "Reusable water bottle",
        description: "Carry a reusable water bottle for the event.",
        priority: "recommended",
      },
      {
        id: "notebook",
        title: "Notebook and pen",
        description:
          "Useful for taking notes during talks, quizzes, and technical events.",
        priority: "recommended",
      },
      {
        id: "power-bank",
        title: "Power bank",
        description:
          "Recommended if you expect to use your phone throughout the event.",
        priority: "recommended",
      },
    ],
  },
];

export const eventChecklists = [
  {
    eventId: "surprise-event",
    eventCode: "SE",
    eventName: "Surprise Event",
    category: "Fun & Entertainment",
    venue: "Event Venue",
    time: "As per event schedule",
    headName: "Event Coordinator",
    headPhone: "+919845500911",
    whatsapp: "919845500911",

    items: [
      {
        id: "surprise-registration",
        title: "Complete event registration",
        description:
          "Ensure your registration for the Surprise Event is completed.",
        priority: "required",
      },
      {
        id: "surprise-id",
        title: "Carry valid ID",
        description:
          "Carry your college ID for participant verification.",
        priority: "required",
      },
      {
        id: "surprise-arrival",
        title: "Arrive before reporting time",
        description:
          "Reach the venue before the specified reporting time.",
        priority: "required",
        tip: "The event format may be revealed only at the venue.",
      },
      {
        id: "surprise-team",
        title: "Be ready for team formation",
        description:
          "Participants may be assigned to teams depending on the event format.",
        priority: "recommended",
      },
    ],
  },

  {
    eventId: "dance",
    eventCode: "DANCE",
    eventName: "Dance",
    category: "Cultural",
    venue: "Main Auditorium",
    time: "As per event schedule",
    headName: "Dance Coordinator",
    headPhone: "+919845500911",
    whatsapp: "919845500911",

    items: [
      {
        id: "dance-registration",
        title: "Complete dance event registration",
        description:
          "Ensure your team or individual registration is completed.",
        priority: "required",
      },
      {
        id: "dance-track",
        title: "Prepare performance track",
        description:
          "Keep your final performance audio ready in the required format.",
        priority: "required",
        tip: "Keep a backup copy of the audio on another device.",
      },
      {
        id: "dance-costume",
        title: "Prepare costume and accessories",
        description:
          "Bring all required costumes, footwear, and performance accessories.",
        priority: "required",
      },
      {
        id: "dance-props",
        title: "Check performance props",
        description:
          "Ensure all approved props are ready before reporting.",
        priority: "recommended",
      },
      {
        id: "dance-warmup",
        title: "Arrive early for warm-up",
        description:
          "Allow sufficient time for changing and warming up before your performance.",
        priority: "recommended",
      },
    ],
  },

  {
    eventId: "startup",
    eventCode: "STARTUP",
    eventName: "Startup",
    category: "Entrepreneurship",
    venue: "Seminar Hall",
    time: "As per event schedule",
    headName: "Startup Coordinator",
    headPhone: "+919845500911",
    whatsapp: "919845500911",

    items: [
      {
        id: "startup-registration",
        title: "Complete startup registration",
        description:
          "Ensure your team registration is completed.",
        priority: "required",
      },
      {
        id: "startup-idea",
        title: "Prepare your startup idea",
        description:
          "Clearly define the problem, solution, target users, and value proposition.",
        priority: "required",
      },
      {
        id: "startup-pitch",
        title: "Prepare your pitch",
        description:
          "Prepare a concise presentation explaining your startup.",
        priority: "required",
      },
      {
        id: "startup-presentation",
        title: "Prepare presentation slides",
        description:
          "Keep your final pitch deck ready before the event.",
        priority: "required",
      },
      {
        id: "startup-backup",
        title: "Keep presentation backup",
        description:
          "Store your presentation on both your laptop and another backup location.",
        priority: "recommended",
      },
    ],
  },

  {
    eventId: "tech-talk",
    eventCode: "TECH",
    eventName: "Tech Talk",
    category: "Technical",
    venue: "Seminar Hall",
    time: "As per event schedule",
    headName: "Tech Talk Coordinator",
    headPhone: "+919845500911",
    whatsapp: "919845500911",

    items: [
      {
        id: "tech-registration",
        title: "Complete registration",
        description:
          "Complete your registration for the Tech Talk.",
        priority: "required",
      },
      {
        id: "tech-topic",
        title: "Review the talk topic",
        description:
          "Review the topic and speaker information before attending.",
        priority: "recommended",
      },
      {
        id: "tech-notebook",
        title: "Carry notebook and pen",
        description:
          "Useful for taking technical notes during the session.",
        priority: "recommended",
      },
      {
        id: "tech-questions",
        title: "Prepare questions",
        description:
          "Prepare questions related to the topic for the Q&A session.",
        priority: "recommended",
      },
    ],
  },

  {
    eventId: "gaming",
    eventCode: "GAME",
    eventName: "Gaming",
    category: "Gaming",
    venue: "Gaming Arena",
    time: "As per event schedule",
    headName: "Gaming Coordinator",
    headPhone: "+919845500911",
    whatsapp: "919845500911",

    items: [
      {
        id: "gaming-registration",
        title: "Complete gaming registration",
        description:
          "Ensure your individual or team registration is completed.",
        priority: "required",
      },
      {
        id: "gaming-id",
        title: "Carry participant ID",
        description:
          "Carry your college ID for participant verification.",
        priority: "required",
      },
      {
        id: "gaming-rules",
        title: "Review gaming rules",
        description:
          "Read the event rules, match format, and scoring system.",
        priority: "required",
      },
      {
        id: "gaming-account",
        title: "Check your gaming account",
        description:
          "Make sure your required gaming account is active and accessible.",
        priority: "required",
      },
      {
        id: "gaming-equipment",
        title: "Check permitted equipment",
        description:
          "Confirm which personal gaming equipment is allowed.",
        priority: "recommended",
      },
    ],
  },

  {
    eventId: "it-quiz",
    eventCode: "ITQUIZ",
    eventName: "IT Quiz",
    category: "Quiz",
    venue: "Quiz Hall",
    time: "As per event schedule",
    headName: "Quiz Coordinator",
    headPhone: "+919845500911",
    whatsapp: "919845500911",

    items: [
      {
        id: "quiz-registration",
        title: "Complete quiz registration",
        description:
          "Ensure your team registration is completed.",
        priority: "required",
      },
      {
        id: "quiz-team",
        title: "Confirm team members",
        description:
          "Make sure all registered team members are confirmed.",
        priority: "required",
      },
      {
        id: "quiz-rules",
        title: "Review quiz rules",
        description:
          "Understand the rounds, scoring, time limits, and answer format.",
        priority: "required",
      },
      {
        id: "quiz-preparation",
        title: "Revise IT fundamentals",
        description:
          "Review programming, networking, databases, operating systems, and technology topics.",
        priority: "recommended",
      },
      {
        id: "quiz-arrival",
        title: "Arrive before reporting time",
        description:
          "Reach the quiz venue before the specified reporting time.",
        priority: "required",
      },
    ],
  },

  {
    eventId: "photography",
    eventCode: "PHOTO",
    eventName: "Photography",
    category: "Creative",
    venue: "Photography Zone",
    time: "As per event schedule",
    headName: "Photography Coordinator",
    headPhone: "+919845500911",
    whatsapp: "919845500911",

    items: [
      {
        id: "photo-registration",
        title: "Complete photography registration",
        description:
          "Complete your registration before the event.",
        priority: "required",
      },
      {
        id: "photo-camera",
        title: "Prepare camera or smartphone",
        description:
          "Bring your approved photography device.",
        priority: "required",
      },
      {
        id: "photo-storage",
        title: "Check storage space",
        description:
          "Ensure sufficient storage is available for capturing photographs.",
        priority: "recommended",
      },
      {
        id: "photo-battery",
        title: "Charge your device",
        description:
          "Fully charge your camera or smartphone before the event.",
        priority: "required",
      },
      {
        id: "photo-rules",
        title: "Review photography guidelines",
        description:
          "Understand restrictions on photography and recording at the venue.",
        priority: "required",
      },
    ],
  },

  {
    eventId: "coding",
    eventCode: "CODE",
    eventName: "Coding",
    category: "Technical",
    venue: "Computer Lab",
    time: "As per event schedule",
    headName: "Coding Coordinator",
    headPhone: "+919845500911",
    whatsapp: "919845500911",

    items: [
      {
        id: "coding-registration",
        title: "Complete coding registration",
        description:
          "Ensure your registration is completed.",
        priority: "required",
      },
      {
        id: "coding-laptop",
        title: "Bring your laptop",
        description:
          "Carry a fully functional laptop if the event requires personal devices.",
        priority: "required",
      },
      {
        id: "coding-charger",
        title: "Bring laptop charger",
        description:
          "Carry your laptop charger and power adapter.",
        priority: "required",
      },
      {
        id: "coding-ide",
        title: "Set up your development environment",
        description:
          "Install the required IDE, compiler, runtime, and development tools.",
        priority: "required",
        tip: "Test your setup before arriving at the venue.",
      },
      {
        id: "coding-language",
        title: "Check supported languages",
        description:
          "Verify which programming languages and versions are supported.",
        priority: "required",
      },
      {
        id: "coding-internet",
        title: "Prepare for connectivity issues",
        description:
          "Keep required files, documentation, and tools available locally.",
        priority: "recommended",
      },
    ],
  },

  {
    eventId: "web-design",
    eventCode: "WEBDESIGN",
    eventName: "Web Design",
    category: "Technical & Creative",
    venue: "Computer Lab",
    time: "As per event schedule",
    headName: "Web Design Coordinator",
    headPhone: "+919845500911",
    whatsapp: "919845500911",

    items: [
      {
        id: "web-registration",
        title: "Complete web design registration",
        description:
          "Ensure your registration is completed.",
        priority: "required",
      },
      {
        id: "web-laptop",
        title: "Bring your laptop",
        description:
          "Carry your laptop for designing and development.",
        priority: "required",
      },
      {
        id: "web-charger",
        title: "Bring laptop charger",
        description:
          "Carry your laptop charger and power adapter.",
        priority: "required",
      },
      {
        id: "web-editor",
        title: "Install code editor",
        description:
          "Install your preferred code editor before the event.",
        priority: "required",
      },
      {
        id: "web-browser",
        title: "Prepare modern browser",
        description:
          "Ensure a modern browser is installed for testing websites.",
        priority: "required",
      },
      {
        id: "web-assets",
        title: "Prepare design assets",
        description:
          "Keep any permitted fonts, icons, images, or design resources ready.",
        priority: "recommended",
      },
      {
        id: "web-tools",
        title: "Check required tools",
        description:
          "Verify that HTML, CSS, JavaScript, and any permitted frameworks or tools are ready.",
        priority: "recommended",
      },
    ],
  },
];
