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
  capacity: number
  rate: number
  created_at?: string
  updated_at?: string
  images?: string[]
  features: Feature[]
  inclusions: Inclusion[]
  rooms: Room[]
}

export interface Feature {
  id: number
  feature: string
  icon: string
}

export interface Inclusion {
  id: number
  inclusion: string
  icon: string
}

// Static data with proper typing
export const MOCK_INCLUSIONS: Inclusion[] = [
  {
    id: 1,
    inclusion: 'Breakfast Included',
    icon: '/icons/breakfast.svg',
  },
  {
    id: 2,
    inclusion: 'Airport Shuttle',
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
    capacity: 2,
    rate: 150,
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
    images: ['/images/room1.jpg'],
    features: [MOCK_FEATURES[0], MOCK_FEATURES[1]],
    inclusions: [MOCK_INCLUSIONS[0]],
    rooms: [],
  },
  {
    id: 2,
    type: 'Barkadahan',
    description: 'A barkadahan room with multiple beds.',
    capacity: 4,
    rate: 200,
    created_at: '2024-01-01',
    updated_at: '2024-01-10',
    images: ['/images/beach-villa-suite.jpg', '/images/carousel1.jpg'],
    features: [MOCK_FEATURES[0], MOCK_FEATURES[1]],
    inclusions: [MOCK_INCLUSIONS[0]],
    rooms: [],
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
