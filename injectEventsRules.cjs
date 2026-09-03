const fs = require('fs');
const c = fs.readFileSync('src/data/eventsData.js', 'utf8');

let match = c.match(/export const eventsData = (\[[\s\S]*\]);/);
if (match) {
  let events = JSON.parse(match[1]);
  
  const generalRules = {
    "id": "general-guidelines",
    "name": "General Guidelines",
    "code": "EVT-11",
    "category": "Fest Rules",
    "categoryColor": "blue",
    "imageUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    "tagline": "Please read through the general guidelines and rules for participation in Semaphore 2026.",
    "description": "Please read through the general guidelines and rules for participation in Semaphore 2026.",
    "location": "NMAMIT Campus",
    "date": "TBD",
    "time": "TBD",
    "duration": "TBD",
    "teamSize": "0 Members",
    "prizePool": "TBD",
    "status": "Upcoming",
    "headDetails": {
      "name": "TBD",
      "role": "Event Head",
      "phone": "TBD",
      "email": "",
      "desk": "",
      "whatsapp": ""
    },
    "coHeadDetails": {
      "name": "TBD",
      "role": "Co-Head",
      "phone": "TBD",
      "email": "",
      "desk": ""
    },
    "rounds": [],
    "rules": [
      "A team should consist of a maximum of 15 members.",
      "The fest is open to all MCA students.",
      "Teams must confirm their participation through our website: semaphore2k26.in",
      "The registration fee is ₹2000 per team.",
      "All participants must be present before 8:00 AM.",
      "The overall championship will be decided based on the cumulative participation of each team across all events.",
      "For the Fashion show event, anyone from other events can join. But those in IT Manager and Photography can't join any other events.",
      "Participants are required to produce their college ID on the fest day.",
      "All participants must be available on campus for both days of the event.",
      "The department/convenor reserves the right to take action in case of any misconduct.",
      "The decisions of the judges will be final and binding.",
      "For any issues regarding the payment of registration fees, please contact the core committee members.",
      "A cash prize and trophy will be awarded to the overall champions and runners-up.",
      "Participants must bring a permission letter from their respective colleges.",
      "Participants must bring accessories such as pens, laptops, chargers, etc. themselves.",
      "test",
      "NOTE: The rules may be changed by the authorities at any time if necessary. Any changes will be notified."
    ]
  };

  if (!events.find(e => e.id === 'general-guidelines')) {
    events.push(generalRules);
    fs.writeFileSync('src/data/eventsData.js', 'export const eventsData = ' + JSON.stringify(events, null, 2) + ';');
    console.log('Added general guidelines to eventsData.js');
  } else {
    console.log('Already exists');
  }
} else {
  console.log('Could not parse eventsData.js');
}
