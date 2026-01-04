export enum Tab {
  Home = 'Home',
  Radio = 'Radio',
  Network = 'Network',
  Profile = 'Profile',
}

export enum UserRole {
  User = 'User',
  Security = 'Security',
  DoorStaff = 'Door Staff',
  BarStaff = 'Bar Staff',
  EventHost = 'Event Host/Promoter',
  Admin = 'Admin Panel',
  Runner = 'Runner',
}

export enum NetworkSubTab {
  Magazine = 'Magazine',
  News = 'News',
  Chat = 'Chat',
}

export interface User {
  id: number;
  role: UserRole;
  nickname: string;
  level: number;
  xp: number;
  ccBalance: number;
  avatarUrl: string;
  activityHistory: Activity[];
  friends: Friend[];
  referredFriends: { name: string; bonus: string }[];
  demographics?: {
    age: number;
    location: string;
  }
}

export interface TopUser {
    nickname: string;
    avatarUrl: string;
    xp: number;
    spent: number;
}

export interface Friend {
  id: number;
  nickname: string;
  avatarUrl: string;
  lastCheckIn: {
    venueName: string;
    lat: number;
    lng: number;
  };
}

export interface Activity {
  id: number;
  description: string;
  timestamp: string;
}

export interface Event {
  id: number;
  title: string;
  venue: string;
  date: string;
  imageUrl: string;
  time?: string;
  clubId: number;
}

export interface Club {
    id: number;
    name: string;
    feed: ClubPost[];
}

export interface ClubPost {
    id: number;
    author: string;
    content: string;
    timestamp: string;
    imageUrl?: string;
}

export interface ForumPost {
  id: number;
  author: {
    nickname: string;
    avatarUrl: string;
  };
  timestamp: string;
  topic: string;
  content: string;
}


export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  requiredLevel: number;
  limitedEdition: boolean;
  vendorName: string;
  description: string;
  keyInfo: string[];
}

export interface Vendor {
  id: number;
  name: string;
  logoUrl: string;
}

export interface Article {
  id: number;
  title: string;
  source: string;
  imageUrl: string;
  excerpt: string;
}

export interface NewsItem {
  id: number;
  title: string;
  source: string;
  link: string;
  timestamp: string;
}

export interface ChatMessage {
  id: number;
  author: {
    nickname: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: string;
}

export interface Transaction {
    id: number;
    type: 'Entry' | 'Purchase' | 'Access' | 'Interaction';
    description: string;
    timestamp: string;
    location: string;
    cardHolder: string;
    value?: number; // Added for financial tracking
}

export enum GuestStatus {
    Pending = 'Pending',
    CheckedIn = 'Checked-In',
    VIP = 'VIP',
}

export interface Guest {
    id: number;
    name: string;
    status: GuestStatus;
    checkInTime?: string;
    plusOnes: number;
}

export interface ChartDataPoint {
    name: string;
    value: number;
}