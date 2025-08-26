declare global {
  interface addRoomDates {
    roomid: number
    roomName: string
    startDate: string
    endDate: string
    dates: string[]
    guests?: number
    rate?: number
  }

  interface updateRoomDates {
    roomid: number
    roomName: string
    startDate: string
    endDate: string
    dates: string[]
    guests?: number
    rate?: number
  }

  interface removeRoomDates {
    roomid: number
  }
}
export { addRoomDates, updateRoomDates, removeRoomDates }
