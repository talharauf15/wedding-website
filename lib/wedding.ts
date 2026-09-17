// Replace the marked copy and add local images in public/images before sharing.
export const wedding = {
  bride: "Rameen Anjum", groom: "Jhanzaid Ali", monogram: "R & J",
  brideParents: "Mr. & Mrs. Tahir Hussain", groomParents: "Mr. & Mrs. Anwar Baig",
  // The wedding day is Baraat & Nikkah — keep in step with events[1].
  date: "16 January 2027", dateNumeric: "16 · 01 · 2027", weekday: "Saturday",
  city: "Faisalabad", target: "2027-01-16T18:00:00+05:00",
  story: "[A short introduction to the couple, how they met, and the journey that brought their families together.]",
  nikkahMessage: "[A short message on the meaning of the nikkah, in the couple’s or families’ own words.]",
  verse: "[Verse or dua chosen by the families]", hashtag: "[WeddingHashtag]",
};
export const events = [
  { id: "mehndi", name: "Mehndi", day: "Friday", date: "15 January 2027", short: "Fri 15 Jan", numeral: "15", time: "7:00 PM", dress: "Yellow & green festive", description: "An evening of colour, candlelight, and celebration with our loved ones.", photo: "Mehndi florals, marigold & candlelight", venue: "Bride's Home", address: "Partab Nagar", mapQuery: "31.412519,73.066630", schedule: [["7:00 PM", "Guest Arrival", ""], ["7:30 PM", "Family Entrance", ""], ["8:00 PM", "Mehndi Celebration", ""], ["9:00 PM", "Dinner", ""], ["10:30 PM", "Closing", ""]] },
  { id: "baraat", name: "Baraat & Nikkah", day: "Saturday", date: "16 January 2027", short: "Sat 16 Jan", numeral: "16", time: "6:00 PM", dress: "Formal traditional", description: "The baraat arrives, the nikkah is performed, and the evening closes with dinner and rukhsati.", photo: "Baraat arrival, arched entrance, evening light", venue: "[Venue Name]", address: "[Street address, area]", mapQuery: "", schedule: [["6:00 PM", "Guest Arrival", ""], ["6:30 PM", "Baraat Arrival", ""], ["7:15 PM", "Nikkah Ceremony", "Guests seated by 7:00 PM"], ["8:00 PM", "Dinner", ""], ["10:00 PM", "Rukhsati", ""]] },
  { id: "walima", name: "Walima", day: "Sunday", date: "17 January 2027", short: "Sun 17 Jan", numeral: "17", time: "7:00 PM", dress: "Formal evening", description: "Join our families for an evening of gratitude, warm wishes, and dinner.", photo: "Walima table setting, white roses", venue: "[Venue Name]", address: "[Street address, area]", mapQuery: "", schedule: [["7:00 PM", "Guest Arrival", ""], ["7:30 PM", "Couple Entrance", ""], ["8:30 PM", "Dinner", ""], ["10:30 PM", "Closing", ""]] },
];
// Our Story rail. A repeated year is printed once — see page.tsx.
export const milestones = [
  { year: "2022", title: "We Met", note: "4 June 2022" },
  { year: "2022", title: "Our Families Met", note: "1 August 2022" },
  { year: "2022", title: "Engagement", note: "2 September 2022" },
  { year: "2027", title: "Forever Begins", note: `${wedding.date}, ${wedding.city}` },
];
// The bride's side. Rename the labels, and add or remove people freely —
// the grid reflows to any count.
export const brideParty = [
  {
    label: "Bridesmaids",
    people: [
      { name: "[Name]", role: "[Sister]", alt: "Bridesmaid, portrait" },
      { name: "[Name]", role: "[Cousin]", alt: "Bridesmaid, portrait" },
      { name: "[Name]", role: "[Friend]", alt: "Bridesmaid, portrait" },
      { name: "[Name]", role: "[Friend]", alt: "Bridesmaid, portrait" },
    ],
  },
  {
    label: "Bride’s Men",
    people: [
      { name: "[Name]", role: "[Brother]", alt: "Bride’s side, portrait", src: "/images/Talha.jpg", position: "50% 0%", zoom: 1.9 },
      { name: "[Name]", role: "[Cousin]", alt: "Bride’s side, portrait", src: "/images/Talha2.jpg", position: "70% 50%", zoom: 1.3 },
      { name: "[Name]", role: "[Friend]", alt: "Bride’s side, portrait", src: "/images/Talha3.jpg", position: "50% 0%", zoom: 1.9 },
      { name: "[Name]", role: "[Friend]", alt: "Bride’s side, portrait" },
    ],
  },
];

// RSVP goes to WhatsApp. `whatsapp` is a full international number, digits only,
// no "+" and no spaces (e.g. 923001234567). While it is empty the section shows
// a marked placeholder instead of a broken link.
export const rsvp = {
  whatsapp: "923422362713",
  by: "[RSVP by date]",
  message: `Assalam-o-Alaikum! This is [your name]. I would love to confirm my attendance at the wedding of ${wedding.bride} and ${wedding.groom}, ${wedding.date}, In sha Allah.`,
};

export const navigation =[["hero", "Home"], ["invitation", "Invitation"], ["story", "Our Story"], ["events", "Events"], ["nikkah", "Nikkah"], ["families", "Families"], ["party", "Bride’s Side"], ["schedule", "Schedule"], ["venue", "Venue"], ["gallery", "Gallery"], ["rsvp", "RSVP"]];
// `position` is optional object-position ("50% 70%" shows more of the lower
// image). These arch crops are tight, so it controls what actually survives.
export const photos: Record<string, { src: string; alt: string; position?: string; zoom?: number }> = {
  hero: { src: "", alt: "Couple, vertical crop, warm evening light" },
  story: { src: "", alt: "Couple in a sunlit courtyard" },
  detail: { src: "", alt: "Hands, rings & embroidered details" },
  // alt describes the actual photograph, not the shot brief it replaced.
  mehndi: { src: "/images/mehndi.jpg", alt: "Mehndi stage — marigold strings, pink and orange drapes, a neon Mehndi sign and dhol" },
  baraat: { src: "/images/barat_stage.jpg", alt: "Baraat stage in candlelight — chandeliers, crystal strands and red and white florals", position: "50% 62%" },
  walima: { src: "/images/walima_stage.jpg", alt: "Walima stage — white roses, hanging greenery and chandeliers above cream seating" },
  bride: { src: "", alt: "Bride with her family" }, groom: { src: "/images/groom_parent.jpg", alt: "Groom with his family" },
  venueMehndi: { src: "", alt: "Mehndi venue and courtyard" }, venueBaraat: { src: "", alt: "Baraat venue exterior at dusk" }, venueWalima: { src: "", alt: "Walima reception venue" },
  portrait: { src: "", alt: "Bride, bridal formals, arched doorway" }, sherwani: { src: "", alt: "Groom, sherwani detail" },
  courtyard: { src: "", alt: "Couple walking, courtyard, warm light" }, family: { src: "", alt: "Both families, a candid moment" },
  closing: { src: "", alt: "Faisalabad architecture in the evening light" },
};
export const gallery = [
  { id: "portrait", category: "Couple" }, { id: "sherwani", category: "Couple" },
  { id: "detail", category: "Engagement" }, { id: "courtyard", category: "Couple" }, { id: "family", category: "Family" },
];
