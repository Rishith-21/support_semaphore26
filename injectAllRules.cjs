const fs = require('fs');

const raw = [
  {
    "id": "Code Wave",
    "name": "Code Wave",
    "category": "Coding",
    "description": "Where every line creates a Wave",
    "rules": [
      "Participants may use any one of the following: C, Java, or Python.",
      "Basic knowledge of Data Structures & Algorithms is expected.",
      "Internet, AI tools, and external assistance are not allowed.",
      "Round-specific rules will be announced before each round."
    ]
  },
  {
    "id": "Coral Canvas",
    "name": "Coral Canvas",
    "category": "Web Design",
    "description": "Where every pixel shapes a Reef",
    "rules": [
      "Participants must have knowledge in HTML, CSS, and JavaScript.",
      "The rounds and design tasks will be provided on the spot.",
      "Electronic gadgets are not allowed.",
      "Rules and decisions of the organizers will be final"
    ]
  },
  {
    "id": "Aqua Byte",
    "name": "Aqua Byte",
    "category": "IT Quiz",
    "description": "Where knowledge meets the Unknown",
    "rules": [
      "The questions will cover General Knowledge, Technical Knowledge, Programming, Information Technology, Computer Science, and other IT-related topics",
      "The use of mobile phones, smartwatches, or any electronic gadgets is strictly prohibited during the event",
      "The decision of the judges shall be final and binding",
      "Any malpractice or violation of the quiz rules will lead to disqualification"
    ]
  },
  {
    "id": "Abyss Arena",
    "name": "Abyss Arena",
    "category": "Gaming",
    "description": "Battle beyond the Depths",
    "rules": [
      "Team: Each team must consist of 4 players.",
      "Devices: Emulators, iPads, and triggers are not allowed;players must bring their own mobile devices and accessories.",
      "Game Setup: Devices must support the latest game version, with all required maps downloaded.",
      "Connectivity: Players should have their own internet connection as a backup.",
      "Fair Play: Misconduct or unfair play will lead to disqualification, and organizers’ decisions are final."
    ]
  },
  {
    "id": "AquaVerse",
    "name": "AquaVerse",
    "category": "Tech Talk",
    "description": "Only the boldest minds can conquer the future",
    "rules": [
      "The topic for each round will be disclosed a few minutes before the round begins",
      "Judges decisions are final and binding. No objections or disputes will be entertained",
      "Participants must always maintain a respectful and professional demeanour",
      "Use of offensive language, inappropriate content, cheating, or disrespectful behaviour will result in immediate disqualification"
    ]
  },
  {
    "id": "Ocean Enigma",
    "name": "Ocean Enigma",
    "category": "Surprise Event",
    "description": "The Ultimate Surprise Challenge",
    "rules": [
      "Mystery will be revealed only at the event",
      "Surprise bonus challenges may appear anytime",
      "Use your brain, not gadgets, electronic devices are not allowed.",
      "Some tasks will be time-based",
      "Judges' decisions are final and binding.",
      "Maintain fair play and sportsmanship throughout the event"
    ]
  },
  {
    "id": "Leviathan",
    "name": "Leviathan",
    "category": "IT Manager",
    "description": "Only one can rule the depths",
    "rules": [
      "This is a solo event, and each participant will compete individually",
      "Participants must report on time for all rounds with their own laptops",
      "No communication or teamwork is allowed during rounds",
      "Judges' decisions are final and cannot be challenged",
      "Any form of cheating, unfair practice, or misconduct will result in disqualification",
      "Participants are not allowed to join any other event"
    ]
  },
  {
    "id": "The Meg Pitch",
    "name": "The Meg Pitch",
    "category": "StartUp",
    "description": "The Deep Sea of Innovation",
    "rules": [
      "Participants must bring their own laptop and have stable internet connection.",
      "The round details will be disclosed on spot.",
      "Participants must always maintain a respectful and professional demeanour.",
      "Use of offensive language, inappropriate content, cheating, or disrespectful behaviour will result in immediate disqualification.",
      "Judges' decisions are final and binding. No objections or disputes will be entertained.",
      "Professional attire will be appreciated."
    ]
  },
  {
    "id": "Submarine",
    "name": "Submarine",
    "category": "Photography",
    "description": "Enter the tagline/description here",
    "rules": [
      "1 participant from team",
      " DSLR or mirrorless cameras only.",
      "Shot on the NMAMIT Nitte campus.",
      "1 raw photo, 1 raw video, and 1 edited video should be submitted"
    ]
  },
  {
    "id": "Narcissa",
    "name": "Narcissa",
    "category": "Fashin Show",
    "description": "Only the Boldest can own the Depths",
    "rules": [
      "Each team must consist of 2 members",
      "Each team gets 2+1 minutes on stage",
      "Outfits must follow a corporate/professional theme",
      "Participants can experiment with formal wear, business casual, modern office fashion, and power dressing",
      "Both members should have some coordination in their outfits, colours, styling, or overall concept",
      "Confidence, posture, walking style, and presentation will be judged",
      "Outfits must be suitable for a college event and maintain a professional appearance",
      "Teams must submit selected ramp walk songs/music in advance",
      "Teams must report to the venue before their assigned time",
      "The judges decision will be final."
    ]
  },
  {
    "id": "general-rules",
    "name": "General Guidelines",
    "category": "Fest Rules",
    "description": "Please read through the general guidelines and rules for participation in Semaphore 2026.",
    "rules": [
      "A team should consist of a maximum of 15 members.",
      "The fest is open to all MCA students.",
      "Teams must confirm their participation through our website: semaphore2k26.in",
      "The registration fee is ₹2000 per team.",
      "All participants must be present before 8:00 AM.",
      "The overall championship will be decided based on the cumulative participation of each team across all events.",
      "For the Fashion show event, anyone from other events can join. But those in IT Manager and Photography can’t join any other events.",
      "Participants are required to produce their college ID on the fest day.",
      "All participants must be available on campus for both days of the event.",
      "The department/convenor reserves the right to take action in case of any misconduct.",
      "The decisions of the judges will be final and binding.",
      "For any issues regarding the payment of registration fees, please contact the core committee members.",
      "A cash prize and trophy will be awarded to the overall champions and runners-up.",
      "Participants must bring a permission letter from their respective colleges.",
      "Participants must bring accessories such as pens, laptops, chargers, etc. themselves.",
      "NOTE: The rules may be changed by the authorities at any time if necessary. Any changes will be notified."
    ]
  }
];

const ruleCategories = raw.map(item => ({
  id: item.id.toLowerCase().replace(/\\s+/g, '-'),
  title: item.name === 'General Guidelines' ? 'General Team Rules & Guidelines' : item.name + ' Rules',
  icon: 'clipboard',
  rules: item.rules
}));

fs.writeFileSync('src/data/rulesData.js', 'export const ruleCategories = ' + JSON.stringify(ruleCategories, null, 2) + ';');
console.log('rulesData.js updated with all events!');
