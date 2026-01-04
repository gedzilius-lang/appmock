import { User, UserRole, Event, Product, Vendor, Article, NewsItem, Club, Transaction, Guest, GuestStatus, TopUser, ChatMessage, ClubPost } from '../types';

export const mockUser: User = {
  id: 1,
  role: UserRole.User,
  nickname: 'SynthRider',
  level: 7,
  xp: 780,
  ccBalance: 1250,
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
  activityHistory: [
    { id: 1, description: 'Checked in at Plaza Klub', timestamp: '2h ago' },
    { id: 2, description: 'Purchased "PLAZMA" Snapback', timestamp: '1d ago' },
    { id: 3, description: 'Posted in "Techno Origins" forum', timestamp: '3d ago' },
  ],
  friends: [
    { id: 2, nickname: 'GlitchGoddess', avatarUrl: 'https://picsum.photos/seed/friend1/100/100', lastCheckIn: { venueName: 'Frieda\'s Büxe', lat: 47.3663, lng: 8.5198 } },
    { id: 3, nickname: 'BassJunkie', avatarUrl: 'https://picsum.photos/seed/friend2/100/100', lastCheckIn: { venueName: 'Supermarket', lat: 47.3891, lng: 8.5145 } },
  ],
  referredFriends: [
      { name: 'DataDiva', bonus: '+50 XP, +20 CC' }
  ],
  demographics: { age: 28, location: 'Zurich' }
};

export const mockSecurityUser: User = { ...mockUser, id: 200, role: UserRole.Security, nickname: 'Guard_01' };
export const mockDoorStaffUser: User = { ...mockUser, id: 300, role: UserRole.DoorStaff, nickname: 'DoorMaster' };
export const mockBarStaffUser: User = { ...mockUser, id: 400, role: UserRole.BarStaff, nickname: 'MixMaster' };
export const mockEventHostUser: User = { ...mockUser, id: 500, role: UserRole.EventHost, nickname: 'PromoterPete' };
export const mockAdminUser: User = { ...mockUser, id: 600, role: UserRole.Admin, nickname: 'SysAdmin' };
export const mockRunnerUser: User = { ...mockUser, id: 700, role: UserRole.Runner, nickname: 'RunninRandy' };

export const weekendEvents: Event[] = [
  { id: 1, title: 'PLAZMA w/ Sama\' Abdulhadi', venue: 'Plaza Klub', date: 'FRI 24.05', imageUrl: '', clubId: 1 },
  { id: 2, title: 'Kauz & Klang', venue: 'Kauz', date: 'SAT 25.05', imageUrl: '', clubId: 6 },
  { id: 3, title: 'Rakete pres. Hot Since 82', venue: 'Hive', date: 'SAT 25.05', imageUrl: '', clubId: 2 },
];

export const featuredEvents: Event[] = [
    { id: 4, title: 'Nacht: Âme', venue: 'Kaufleuten', date: 'FRI 31.05', imageUrl: '', clubId: 7 },
    { id: 5, title: 'Supermarket pres. ANNA', venue: 'Supermarket', date: 'SAT 01.06', imageUrl: '', clubId: 3 },
    { id: 6, title: 'Circoloco at Gonzo', venue: 'Gonzo', date: 'FRI 07.06', imageUrl: '', clubId: 5 },
];

export const moreEvents: Event[] = [
    { id: 7, title: 'Frieda\'s Büxe pres. Traumer', venue: 'Frieda\'s Büxe', date: 'SAT 08.06', time: '23:00', imageUrl: '', clubId: 4 },
    { id: 8, title: 'Lexy & K-Paul at Plaza', venue: 'Plaza Klub', date: 'FRI 14.06', time: '23:00', imageUrl: '', clubId: 1 },
    { id: 9, title: 'Solomun at Kaufleuten', venue: 'Kaufleuten', date: 'SAT 15.06', time: '23:00', imageUrl: '', clubId: 7 },
];

export const clubPosts: Record<number, ClubPost[]> = {
    1: [
        { id: 101, author: 'Plaza Klub', content: 'What a night with Sama\' Abdulhadi! The energy was insane. Who\'s ready for the next one?', timestamp: '1d ago', imageUrl: 'https://picsum.photos/seed/plaza1/400/200' },
        { id: 102, author: 'Plaza Klub', content: 'This Friday: Lexy & K-Paul are taking over the decks. Get ready for a journey!', timestamp: '3d ago' },
    ],
    3: [
        { id: 301, author: 'Supermarket', content: 'ANNA is coming! Secure your tickets now for a night of pure techno.', timestamp: '2d ago' },
    ]
};


export const clubs: Club[] = [
    { id: 1, name: "Plaza Klub", feed: clubPosts[1] || []},
    { id: 2, name: "Hive", feed: []},
    { id: 3, name: "Supermarket", feed: clubPosts[3] || []},
    { id: 4, name: "Frieda's Büxe", feed: []},
    { id: 5, name: "Gonzo", feed: []},
    { id: 6, name: "Kauz", feed: []},
    { id: 7, name: "Kaufleuten", feed: []},
];

export const vendors: Vendor[] = [
  { id: 1, name: 'Mati Drink', logoUrl: '' },
  { id: 2, name: 'Mr. Samigo', logoUrl: '' },
  { id: 3, name: 'LuckyPunch', logoUrl: '' },
];

export const ccMarketProducts: Product[] = [
  { id: 1, name: '"PLAZMA" Snapback', price: 250, imageUrl: '', requiredLevel: 3, limitedEdition: false, vendorName: "thenet Merch", description: "High-quality snapback with embroidered PLAZMA logo. A must-have for any true fan.", keyInfo: ["100% Cotton", "Adjustable strap", "Black with white logo"] },
  { id: 2, name: 'Mati Drink 6-Pack', price: 200, imageUrl: '', requiredLevel: 1, limitedEdition: false, vendorName: "Mati Drink", description: "Stay energized all night long with a 6-pack of the legendary Mati Drink.", keyInfo: ["6x 500ml bottles", "Classic flavor", "Keeps you dancing"] },
  { id: 3, name: 'LuckyPunch Power Drink', price: 150, imageUrl: '', requiredLevel: 1, limitedEdition: false, vendorName: "LuckyPunch", description: "The official power-up of Zurich's nightlife scene.", keyInfo: ["4x 250ml cans", "Tropical flavor", "Full of energy"] },
  { id: 4, name: 'Mr. Samigo Dinner Voucher', price: 1200, imageUrl: '', requiredLevel: 5, limitedEdition: true, vendorName: "Mr. Samigo", description: "Enjoy a pre-party dinner experience at one of Zurich's trendiest spots. CHF 100 value.", keyInfo: ["Valid for 2 people", "Excludes drinks", "Reservation required"] },
  { id: 5, name: 'VIP Lounge Access Pass', price: 2500, imageUrl: '', requiredLevel: 10, limitedEdition: true, vendorName: "ClubJoin Exclusives", description: "Unlock access to the exclusive VIP lounge at any partner event for one night.", keyInfo: ["Single use", "Valid for user +1", "Includes one free drink"] },
  { id: 6, name: 'Backstage Meet & Greet', price: 5000, imageUrl: '', requiredLevel: 15, limitedEdition: true, vendorName: "Plazma Records", description: "A once-in-a-lifetime opportunity to meet the headlining artist backstage.", keyInfo: ["Event-specific", "Limited to 2 people", "Unforgettable experience"] },
];

export const topUsers: TopUser[] = [
    { nickname: 'GlitchGoddess', avatarUrl: 'https://picsum.photos/seed/friend1/50/50', xp: 950, spent: 2200 },
    { nickname: 'BassJunkie', avatarUrl: 'https://picsum.photos/seed/friend2/50/50', xp: 890, spent: 1800 },
    { nickname: 'RaveRover', avatarUrl: 'https://picsum.photos/seed/top3/50/50', xp: 850, spent: 1550 },
    { nickname: 'DataDiva', avatarUrl: 'https://picsum.photos/seed/top4/50/50', xp: 820, spent: 1400 },
    { nickname: 'TechnoHead', avatarUrl: 'https://picsum.photos/seed/fuser1/50/50', xp: 790, spent: 1300 },
];

export const articles: Article[] = [
    {id: 1, title: 'The Rise of Melodic Techno in Zurich', source: 'plazmarec.com', imageUrl: '', excerpt: 'An inside look into the artists and venues shaping the city\'s signature sound...'},
    {id: 2, title: 'Aline\'s Guide to Club Culture Etiquette', source: 'UBWG Blog', imageUrl: '', excerpt: 'How to be a respected member of the dance floor community, from a scene veteran...'},
    {id: 3, title: 'From Vinyl to Digital: The Evolution of DJing', source: 'Resident Advisor', imageUrl: '', excerpt: 'We trace the technological journey that has transformed the art of mixing tracks...'},
    {id: 4, title: 'Kaufleuten\'s Hidden Garden: A Summer Oasis', source: 'Zurich by Night', imageUrl: '', excerpt: 'Discover the secret spot that locals love for pre-club drinks and chill moments...'},
    {id: 5, title: 'The Sound of Supermarket: 20 Years of House', source: 'Sihl Records', imageUrl: '', excerpt: 'A look back at the iconic club\'s journey and its impact on Swiss house music...'},
];

export const newsItems: NewsItem[] = [
    {id: 1, title: 'Love Me Two Times: Spring Edition announced!', source: 'Rakete', link: '#', timestamp: '2h ago'},
    {id: 2, title: 'Sihl Records vinyl delivery (house) just dropped.', source: 'Sihl Records', link: '#', timestamp: '8h ago'},
    {id: 3, title: 'Supermarket voted #1 club in Zurich two years in a row.', source: 'DJ Mag', link: '#', timestamp: '1d ago'},
    {id: 4, title: 'Pop-Up Season: What\'s Coming This Summer?', source: 'Zurich by Night', link: '#', timestamp: '2d ago'},
];

export const chatMessages: Record<string, ChatMessage[]> = {
    "What’s Tonight?": [
        {id: 1, author: { nickname: 'RaveRover', avatarUrl: 'https://picsum.photos/seed/top3/50/50'}, content: 'Anyone hitting Hive for Hot Since 82?', timestamp: '18:32'},
        {id: 2, author: { nickname: 'BassJunkie', avatarUrl: 'https://picsum.photos/seed/friend2/50/50'}, content: 'Tempting, but Kauz is the move for me tonight.', timestamp: '18:35'},
        {id: 3, author: { nickname: 'SynthRider', avatarUrl: 'https://picsum.photos/seed/user1/50/50'}, content: 'Plaza for Sama\' is going to be epic. Can\'t miss it.', timestamp: '18:40'},
    ],
    "Lost & Found": [
        {id: 4, author: { nickname: 'GlitchGoddess', avatarUrl: 'https://picsum.photos/seed/friend1/50/50'}, content: 'Lost a black denim jacket at Frieda\'s Büxe last weekend, had a "Techno" pin on it. Anyone seen it?', timestamp: 'Yesterday'},
    ],
    "Saw You, But I Was Shy…": [
        {id: 5, author: { nickname: 'TechnoHead', avatarUrl: 'https://picsum.photos/seed/fuser1/50/50'}, content: 'To the person in the vintage NASA shirt at the bar at Gonzo, your vibe was immaculate.', timestamp: '2 days ago'},
    ]
};

export const mockTransactions: Transaction[] = [
    { id: 1, type: 'Purchase', description: '2x Club Mate', cardHolder: 'User_451', location: 'Main Bar', timestamp: '23:15:02', value: 24 },
    { id: 2, type: 'Access', description: 'VIP Area', cardHolder: 'User_101', location: 'VIP Entrance', timestamp: '23:14:30' },
    { id: 3, type: 'Entry', description: 'Guest List Entry', cardHolder: 'User_823', location: 'Main Entrance', timestamp: '23:12:11' },
    { id: 4, type: 'Purchase', description: '1x Water', cardHolder: 'User_451', location: 'Main Bar', timestamp: '23:10:55', value: 6 },
    { id: 5, type: 'Interaction', description: 'Checked-in at DJ Booth', cardHolder: 'User_007', location: 'DJ Booth', timestamp: '23:09:01' },
];

export const mockGuestList: Guest[] = [
    { id: 1, name: 'Alice Wonderland', status: GuestStatus.CheckedIn, checkInTime: '23:05', plusOnes: 1 },
    { id: 2, name: 'Bob Sinclair', status: GuestStatus.VIP, checkInTime: '22:45', plusOnes: 3 },
    { id: 3, name: 'Charlie Brown', status: GuestStatus.Pending, plusOnes: 0 },
    { id: 4, name: 'Diana Prince', status: GuestStatus.Pending, plusOnes: 1 },
    { id: 5, name: 'Edward Scissorhands', status: GuestStatus.VIP, checkInTime: '23:15', plusOnes: 0 },
];
