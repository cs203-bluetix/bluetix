import { Event } from "store/types";

export const mockEvents: Event[] = [
  {
    id: "123",
    name: "Concert des Amis: a SOTA Music Faculty Showcase",
    eventDetails:
      "The SOTA Music Faculty presents the first faculty concert programme performed entirely on historical instruments.\nBe treated to some of the best gems of the Baroque repertory, including works by J.S. and C.P.E Bach, Telemann, Royer and Tartini.\n\nMusicians:\nYang Tien, Harpsichord\nMervyn Lee, Harpsichord\nCheryl Lim, Traverso\nBrenda Koh, Baroque Violin\nAlan Choo, Baroque Violin\nPlacida ho, Baroque Viola\nYeh Tzu Jou, Baroque Cello\nLeslie Tan, Viola da Gamba\n\nThe event will run for 75 minutes.",
    ticketPricing:
      "\nSTANDARD\n\nCAT 1: $11\n\nCONCESSION\n\nSenior Citizens*, NSF**, Students***: $9\n\n*Applicable for individuals aged 60 years old and above with valid ID\n**Applicable for NSmen with valid 11B pass\n***Applicable for students with valid student pass\n\nNOTE:\n\n    Limited to only 10 tickets per transaction.\n    Ticket Pricing excludes Booking Fee. Booking Fee is as follows:\n        $4 booking fee per ticket for tickets $30 and above\n        $2 booking fee per ticket for tickets between $20 and $29.99\n        $1 booking fee per ticket for tickets priced below $20.00\n\n",
    faq: "\nFAQ\n\nFAQ\n\n    The Organiser/Venue Owner reserves the right without refund or compensation to refuse admission/evict any person(s) whose conduct is disorderly or inappropriate or who poses a threat to security, or to the enjoyment of the Event by others.\n    Ticket holders assume all risk of injury and all responsibility for property loss, destruction or theft and release the promoters, performers, sponsors, ticket outlets, venues, and their employees from any liability thereafter.\n    The resale of ticket(s) at the same or any price in excess of the initial purchase price is prohibited.\n    There is no refund, exchange, upgrade, or cancellation once ticket(s) are sold.\n    We would like to caution members of the public against purchasing tickets from unauthorized sellers or 3rd party websites. By purchasing tickets through these non-authorized points of sale, buyers take on the risk that the validity of the tickets cannot be guaranteed, with no refunds possible.⁠\n\n",
    admissionsPolicy:
      "\nAdmission Policy\nAdmission Rules:\n\n    Admission to show/venue by full ticket only. Printed/electronic tickets must be produced for admission.\n    There will be no admission for infants in arms and children below 6 years old.\n    Individuals aged 6 years old and above will be required to purchase a ticket for admission.\n    No flash photography and videography allowed.\n    No outside food and beverage are allowed into the venue.\n\n",

    dates: [],
    location: "University Cultural Center",
  },
  {
    id: "101",
    name: "Artisan Craft Fair",
    eventDetails:
      "Discover unique handcrafted items at our Artisan Craft Fair. Local artisans will showcase their creations, including pottery, jewelry, textiles, and more.",
    ticketPricing: "Admission is FREE",
    faq: "FAQ:\n\n- Can I bring my pet? Well-behaved pets on leashes are welcome.\n- Is there parking available? Limited parking is available near the venue.\n- Can I pay with credit card? Some vendors accept credit cards, but cash is recommended.",
    admissionsPolicy:
      "Admission Policy:\n\n- No ticket required for entry.\n- Children must be supervised by guardians at all times.\n- No smoking or vaping on the premises.",
    dates: ["2023-09-20", "2023-09-21"],
    location: "Local Community Center",
  },
  {
    id: "102",
    name: "Fitness Expo",
    eventDetails:
      "Get inspired to live a healthier life at the Fitness Expo. Attend workshops, try out new workouts, and learn from fitness experts.",
    ticketPricing:
      "Early Bird (until October 1):\n\nDay Pass: $20\nWeekend Pass: $35\n\nRegular Price:\n\nDay Pass: $25\nWeekend Pass: $45",
    faq: "FAQ:\n\n- Are there changing rooms? Yes, changing rooms and locker facilities are available.\n- Can I bring my own food? Outside food is not allowed, but there will be food stalls on-site.\n- Can I register for workshops on the spot? Workshop registration is subject to availability.",
    admissionsPolicy:
      "Admission Policy:\n\n- Tickets must be presented for entry.\n- Participants must be at least 16 years old.\n- Photography and videography are allowed only in designated areas.",
    dates: ["2023-11-15", "2023-11-16"],
    location: "FitEx Convention Center",
  },
  {
    id: "103",
    name: "Nature Photography Workshop",
    eventDetails:
      "Enhance your photography skills with our nature photography workshop. Learn to capture stunning landscapes, wildlife, and macro shots.",
    ticketPricing: "Workshop Fee: $50",
    faq: "FAQ:\n\n- Do I need to bring my own camera? Yes, participants should bring their own camera equipment.\n- Are meals included? Light refreshments will be provided.\n- What skill level is required? All skill levels are welcome, but basic photography knowledge is recommended.",
    admissionsPolicy:
      "Admission Policy:\n\n- Workshop registration is mandatory.\n- Participants must be at least 18 years old.\n- Workshop materials and notes will be provided.",
    dates: ["2023-09-10"],
    location: "Nature Center",
  },
  {
    id: "104",
    name: "Food Truck Fiesta",
    eventDetails:
      "Indulge in a variety of delicious cuisines from food trucks across the city. From tacos to ice cream, there's something for everyone.",
    ticketPricing: "Admission is FREE",
    faq: "FAQ:\n\n- Is there seating available? Limited seating will be provided, but you're welcome to bring your own chairs or blankets.\n- Can I pay with cash? Most food trucks accept both cash and card payments.\n- Is there vegetarian food available? Yes, there will be vegetarian and vegan options.",
    admissionsPolicy:
      "Admission Policy:\n\n- No tickets required.\n- Families and pets are welcome.\n- Please dispose of trash responsibly.",
    dates: ["2023-07-25"],
    location: "City Park",
  },
  {
    id: "105",
    name: "Science Fiction Book Club",
    eventDetails:
      "Join fellow sci-fi enthusiasts for lively discussions on classic and modern science fiction novels. This month, we'll be discussing 'Dune' by Frank Herbert.",
    ticketPricing: "Membership Fee: $10/month",
    faq: "FAQ:\n\n- Do I need to read the book in advance? It's recommended, but you can still participate in the discussions.\n- Are there any age restrictions? Participants should be at least 18 years old.\n- Can I join for a single session? The membership covers all sessions in a month.",
    admissionsPolicy:
      "Admission Policy:\n\n- Membership registration is required.\n- Participants must have read or be familiar with the book being discussed.\n- Respectful and inclusive behavior is expected.",
    dates: ["2023-08-08", "2023-08-15", "2023-08-22", "2023-08-29"],
    location: "Local Library",
  },
  {
    id: "201",
    name: "Outdoor Movie Night",
    eventDetails:
      "Enjoy a cozy evening under the stars with our outdoor movie screening. We'll be showing a family-friendly film that's perfect for all ages.",
    ticketPricing: "Admission is FREE",
    faq: "FAQ:\n\n- Can I bring my own snacks? Yes, feel free to bring your favorite movie snacks.\n- Is seating provided? Limited seating will be available, but you can bring blankets and cushions.\n- What happens if it rains? In case of rain, the event will be rescheduled.",
    admissionsPolicy:
      "Admission Policy:\n\n- No tickets required.\n- Families, friends, and pets are welcome.\n- Please keep the area clean and dispose of trash properly.",
    dates: ["2023-09-05"],
    location: "Central Park",
  },
  {
    id: "202",
    name: "Virtual Reality Expo",
    eventDetails:
      "Step into the world of virtual reality at our expo. Try out the latest VR technologies, experience immersive games, and attend informative panels.",
    ticketPricing: "One-Day Pass: $30\nThree-Day Pass: $75",
    faq: "FAQ:\n\n- Do I need to bring my VR headset? Headsets will be provided, but you can bring your own if you prefer.\n- Are there age restrictions? Participants must be at least 12 years old.\n- Can I buy tickets on-site? Tickets will be available on-site, but online purchase is recommended.",
    admissionsPolicy:
      "Admission Policy:\n\n- Valid tickets must be presented for entry.\n- Minors under 16 must be accompanied by an adult.\n- Follow safety guidelines while using VR equipment.",
    dates: ["2023-10-20", "2023-10-21", "2023-10-22"],
    location: "Tech Hub Convention Center",
  },
  {
    id: "203",
    name: "Gardening Workshop",
    eventDetails:
      "Learn the art of gardening from experts. From cultivating indoor plants to designing outdoor landscapes, this workshop covers it all.",
    ticketPricing: "Workshop Fee: $25",
    faq: "FAQ:\n\n- What should I bring? Bring gardening gloves and comfortable attire.\n- Are plants provided? Some plants will be provided, but you can also bring your own if you like.\n- Can I ask questions? Absolutely, the workshop encourages interaction.",
    admissionsPolicy:
      "Admission Policy:\n\n- Workshop registration is mandatory.\n- Participants must be at least 18 years old.\n- Workshop materials and tools will be provided.",
    dates: ["2023-08-30"],
    location: "Botanical Garden",
  },
  {
    id: "204",
    name: "Comedy Night",
    eventDetails:
      "Laugh the night away with a lineup of hilarious comedians. This comedy night guarantees a good time and lots of belly laughs.",
    ticketPricing: "General Admission: $15\nVIP Package: $40",
    faq: "FAQ:\n\n- Is there a minimum age requirement? This event is recommended for audiences aged 16 and above.\n- Can I buy tickets at the door? Yes, tickets will be available at the venue.\n- Can I bring friends? Of course, the more the merrier!",
    admissionsPolicy:
      "Admission Policy:\n\n- Tickets must be presented for entry.\n- Seating is on a first-come, first-served basis.\n- No heckling or disruptive behavior.",
    dates: ["2023-11-10"],
    location: "The Comedy Club",
  },
  {
    id: "205",
    name: "Fashion Show Extravaganza",
    eventDetails:
      "Witness the latest trends on the runway at our Fashion Show Extravaganza. Top designers will showcase their collections in this glamorous event.",
    ticketPricing: "Standard Ticket: $50\nVIP Pass: $150",
    faq: "FAQ:\n\n- Is there a dress code? Dress stylishly and in accordance with the theme.\n- Can I take photos? Photos are allowed during designated times.\n- Are refreshments provided? Light refreshments will be available for VIP pass holders.",
    admissionsPolicy:
      "Admission Policy:\n\n- Tickets must be presented for entry.\n- Age restriction: 18 and above.\n- No recording devices during the show.",
    dates: ["2023-09-15"],
    location: "Grand Convention Hall",
  },
  {
    id: "301",
    name: "Culinary Adventure Workshop",
    eventDetails:
      "Embark on a culinary journey with our hands-on cooking workshop. Learn to prepare gourmet dishes from world-renowned chefs using locally sourced ingredients.",
    ticketPricing:
      "Standard Workshop Pass: $75\nPremium Pass (Includes Ingredients Kit): $120\nVIP Package (Includes Personal Chef Experience): $250",
    faq: "Frequently Asked Questions (FAQ):\n\n- Can beginners join? Absolutely, the workshop is designed for all skill levels.\n- What cuisines will be covered? The workshop covers a variety of international cuisines.\n- Can I purchase additional ingredients kits? Yes, extra kits will be available for purchase.",
    admissionsPolicy:
      "Admissions Policy:\n\n- Workshop registration is mandatory for entry.\n- Participants must be at least 16 years old.\n- Workshop equipment and utensils will be provided.",
    dates: ["2023-10-10"],
    location: "Culinary Institute",
  },
  {
    id: "302",
    name: "Tech Innovators Conference",
    eventDetails:
      "Join us for the Tech Innovators Conference, where trailblazing tech leaders share their insights. Explore cutting-edge technologies and their impact on various industries.",
    ticketPricing:
      "Conference Pass: $150\nWorkshop Pass (Includes Hands-On Sessions): $250\nVIP All-Access Pass (Includes Networking Events): $400",
    faq: "Frequently Asked Questions (FAQ):\n\n- Are the workshops beginner-friendly? Yes, workshops are designed to accommodate various skill levels.\n- What networking opportunities are available? The VIP pass includes exclusive networking events.\n- Is there a dress code? Business casual attire is recommended.",
    admissionsPolicy:
      "Admissions Policy:\n\n- Valid tickets must be presented for entry.\n- Minors under 18 must be accompanied by an adult.\n- Respectful behavior is expected throughout the conference.",
    dates: ["2023-11-25", "2023-11-26"],
    location: "Tech Innovate Center",
  },
  {
    id: "303",
    name: "Yoga and Mindfulness Retreat",
    eventDetails:
      "Escape to a serene retreat that combines yoga, meditation, and mindfulness practices. Rejuvenate your body and mind surrounded by nature's tranquility.",
    ticketPricing:
      "Retreat Pass (2 Days): $300\nExtended Retreat Pass (3 Days): $450\nVIP Retreat Package (Includes Spa Treatments): $650",
    faq: "Frequently Asked Questions (FAQ):\n\n- Can beginners participate in yoga? Absolutely, classes are tailored for all levels.\n- What should I bring? Yoga mats will be provided, but you can bring your own if preferred.\n- Can I choose my spa treatments with the VIP package? Yes, you can customize your spa experience.",
    admissionsPolicy:
      "Admissions Policy:\n\n- Retreat pass or ticket confirmation is required for entry.\n- Participants must be at least 18 years old.\n- Respectful and mindful behavior is expected throughout the retreat.",
    dates: ["2023-09-01", "2023-09-02", "2023-09-03"],
    location: "Tranquil Valley Retreat Center",
  },
  {
    id: "304",
    name: "Art and Music Festival",
    eventDetails:
      "Immerse yourself in a vibrant celebration of art and music. Experience live performances, interactive art installations, and workshops by local and international artists.",
    ticketPricing:
      "One-Day Pass: $40\nWeekend Pass: $70\nVIP Artistic Experience (Includes Backstage Access): $120",
    faq: "Frequently Asked Questions (FAQ):\n\n- Can I bring my own art supplies? Yes, you're encouraged to bring your sketchbooks and art materials.\n- Are children allowed at the festival? The festival is family-friendly; children under 12 enter free.\n- What workshops are available? Workshops include painting, sculpture, and music jam sessions.",
    admissionsPolicy:
      "Admissions Policy:\n\n- Valid tickets must be presented for entry.\n- Minors must be accompanied by an adult.\n- Respect the artworks and installations; no touching or tampering.",
    dates: ["2023-08-15", "2023-08-16"],
    location: "ArtBeat Festival Grounds",
  },
  {
    id: "305",
    name: "Exploration Science Camp",
    eventDetails:
      "Ignite curiosity in young minds through our Exploration Science Camp. Kids will engage in hands-on experiments, outdoor adventures, and science-themed games.",
    ticketPricing:
      "Week-Long Camp Pass: $200\nSibling Pass (20% off for each additional sibling): $160\nVIP Explorer Package (Includes Exclusive Workshops): $300",
    faq: "Frequently Asked Questions (FAQ):\n\n- What age group is the camp for? The camp is designed for children aged 8 to 12.\n- Are meals provided? Snacks and lunch are included in the camp pass.\n- Can parents participate? Parents can observe on designated days; participation is not required.",
    admissionsPolicy:
      "Admissions Policy:\n\n- Camp pass or ticket confirmation is required for entry.\n- Children must be checked in and out by authorized adults.\n- Respectful and cooperative behavior is expected from all campers.",
    dates: [
      "2023-07-10",
      "2023-07-11",
      "2023-07-12",
      "2023-07-13",
      "2023-07-14",
    ],
    location: "Curious Explorers Campsite",
  },
];
