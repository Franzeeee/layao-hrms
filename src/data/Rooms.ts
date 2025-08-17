export interface Room {
  id: number
  name: string
  room_type_id: number
  room_type: any
  created_at?: string
  updated_at?: string
}

export interface RoomType {
  id: number
  type: string
  description: string
  capacity: string
  pax?: number | null
  rate: number
  created_at?: string
  updated_at?: string
  images?: string[]
  features: Feature[]
  inclusions: Inclusion[]
  rooms: Room[]
  amenities?: string[]
  max_rooms: number | null
}

export interface Feature {
  id: number
  feature: string
  icon: string
}

export interface Inclusion {
  id: number
  text: string
  icon: string
}

// Static data with proper typing
export const MOCK_INCLUSIONS: Inclusion[] = [
  {
    id: 1,
    text: 'Breakfast Included',
    icon: '/icons/breakfast.svg',
  },
  {
    id: 2,
    text: 'Airport Shuttle',
    icon: '/icons/shuttle.svg',
  },
]

export const MOCK_FEATURES: Feature[] = [
  {
    id: 1,
    feature: 'Air Conditioning',
    icon: '/icons/ac.svg',
  },
  {
    id: 2,
    feature: 'Free WiFi',
    icon: '/icons/wifi.svg',
  },
]

export const MOCK_ROOM_TYPES: RoomType[] = [
  {
    id: 1,
    type: 'Deluxe',
    description: 'A deluxe room with a king-sized bed.',
    capacity: 'Good for 2 Persons',
    rate: 3800,
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
    images: ['/images/room1.jpg'],
    features: [MOCK_FEATURES[0], MOCK_FEATURES[1]],
    inclusions: [MOCK_INCLUSIONS[0]],
    rooms: [],
    amenities: [],
    max_rooms: 1,
  },
  {
    id: 2,
    type: 'Superior Deluxe',
    description: 'A deluxe room with a king-sized bed.',
    capacity: 'Good for 2 Persons',
    rate: 5500,
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
    images: ['/images/room1.jpg'],
    features: [MOCK_FEATURES[0], MOCK_FEATURES[1]],
    inclusions: [MOCK_INCLUSIONS[0]],
    rooms: [],
    amenities: [],
    max_rooms: 1,
  },
  {
    id: 3,
    type: 'Barkadahan',
    description: 'A barkadahan room with multiple beds.',
    capacity: 'Minimum of 8 Person',
    pax: 8,
    rate: 1400,
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
    images: [
      '/images/room_types/Barkadahan/img2.JPG',
      '/images/room_types/Barkadahan/b7.JPG',
      '/images/room_types/Barkadahan/img3.JPG',
      '/images/room_types/Barkadahan/img4.JPG',
      '/images/room_types/Barkadahan/img5.JPG',
      '/images/room_types/Barkadahan/img6.JPG',
      '/images/room_types/Barkadahan/img7.JPG',
    ],
    features: [MOCK_FEATURES[0], MOCK_FEATURES[1]],
    inclusions: [MOCK_INCLUSIONS[0]],
    rooms: [],
    amenities: [],
    max_rooms: 3,
  },
  {
    id: 4,
    type: 'Family Suite',
    description: 'A barkadahan room with multiple beds.',
    capacity: 'Good for 3 Persons',
    rate: 8888,
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
    images: ['/images/beach-villa-suite.jpg', '/images/carousel1.jpg'],
    features: [MOCK_FEATURES[0], MOCK_FEATURES[1]],
    inclusions: [MOCK_INCLUSIONS[0]],
    rooms: [],
    amenities: [],
    max_rooms: 1,
  },
  {
    id: 5,
    type: 'Layao Executive',
    description: 'A barkadahan room with multiple beds.',
    capacity: 'Good for 3 Persons',
    rate: 15000,
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
    images: ['/images/beach-villa-suite.jpg', '/images/carousel1.jpg'],
    features: [MOCK_FEATURES[0], MOCK_FEATURES[1]],
    inclusions: [MOCK_INCLUSIONS[0]],
    rooms: [],
    amenities: [],
    max_rooms: 1,
  },
]

export const MOCK_ROOMS: Room[] = [
  {
    id: 0,
    name: 'Deluxe 01',
    room_type_id: 1,
    room_type: MOCK_ROOM_TYPES[0],
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
  },
  {
    id: 1,
    name: 'Deluxe 02',
    room_type_id: 1,
    room_type: MOCK_ROOM_TYPES[0],
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
  },
  {
    id: 2,
    name: 'Deluxe 03',
    room_type_id: 1,
    room_type: MOCK_ROOM_TYPES[0],
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
  },
  {
    id: 3,
    name: 'Barkadahan 01',
    room_type_id: 2,
    room_type: MOCK_ROOM_TYPES[1],
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
  },
  {
    id: 4,
    name: 'Barkadahan 02',
    room_type_id: 2,
    room_type: MOCK_ROOM_TYPES[1],
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
  },
  {
    id: 5,
    name: 'Barkadahan 03',
    room_type_id: 2,
    room_type: MOCK_ROOM_TYPES[1],
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
  },
]
