import emailjs from 'emailjs-com'

interface RoomData {
  roomName: string
  quantity: number
  rate: number
  capacity?: string
  totalCost: number
  checkInDate: string
  checkOutDate: string
  dates?: string[]
}

interface ReservationData {
  firstname: string
  lastname: string
  email: string
  phone: string
  guests: string
  bookedRooms: RoomData[]
  notes?: string
  total: number
  addOnTotal?: number
  additionalJoiner: number
  encryptedData?: string
}

export function useEmail() {
  const sendReservationAcknowledgement = async (data: ReservationData, template: string) => {
    try {
      // Build HTML table for booked rooms
      const roomsTable = `
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 14px;">
          <thead style="background-color: #f9f9f9;">
        <tr>
          <th align="left">Room</th>
          <th align="center">Qty</th>
          <th align="center">Rate</th>
          <th align="center">Capacity</th>
          <th align="center">Check-In</th>
          <th align="center">Check-Out</th>
          <th align="center">Nights</th>
          <th align="center">Total</th>
        </tr>
          </thead>
          <tbody>
        ${data.bookedRooms
          .map((room) => {
            const checkIn = new Date(room.checkInDate)
            const checkOut = new Date(room.checkOutDate)
            const nights = Math.max(0, Math.round((+checkOut - +checkIn) / (1000 * 60 * 60 * 24)))
            return `
          <tr>
            <td>${room.roomName}</td>
            <td align="center">${room.quantity}</td>
            <td align="center">₱${Number(room.rate).toLocaleString()}${
              room.roomName === 'Barkadahan' ? ' / Pax' : ''
            }</td>
            <td align="center">${room.capacity || 'N/A'}</td>
            <td align="center">${isNaN(checkIn.getTime()) ? '' : checkIn.toLocaleDateString()}</td>
            <td align="center">${
              isNaN(checkOut.getTime()) ? '' : checkOut.toLocaleDateString()
            }</td>
            <td align="center">${nights}</td>
            <td align="center">₱${Number(room.totalCost).toLocaleString()}</td>
          </tr>
            `
          })
          .join('')}
        ${(() => {
          // Support for an explicit additionalJoiner field if provided on the reservation data
          // (e.g. data.additionalJoiner, data.additionalJoinerRate, data.additionalJoinerTotal).
          const aj = (data as any).additionalJoiner ?? 0
          const ajRate = 999
          const ajTotal = (data as any).additionalJoinerTotal ?? aj * ajRate
          if (aj && aj > 0) {
            return `
          <tr style="background-color:#f1f1f1;">
            <td>Additional Joiner</td>
            <td align="center">${aj}</td>
            <td align="center">₱${Number(ajRate).toLocaleString()}</td>
            <td align="center">-</td>
            <td align="center">-</td>
            <td align="center">-</td>
            <td align="center">-</td>
            <td align="center">₱${Number(ajTotal).toLocaleString()}</td>
          </tr>
            `
          }
          // Fallback: if there's a generic addOnTotal but no explicit additionalJoiner, show an Add-ons row
          if (data.addOnTotal && Number(data.addOnTotal) > 0) {
            return `
          <tr style="background-color:#f1f1f1;">
            <td>Add-ons</td>
            <td align="center">-</td>
            <td align="center">-</td>
            <td align="center">-</td>
            <td align="center">-</td>
            <td align="center">-</td>
            <td align="center">-</td>
            <td align="center">₱${Number(data.addOnTotal).toLocaleString()}</td>
          </tr>
            `
          }
          return ''
        })()}
          </tbody>
        </table>
      `

      // Send the email
      const result = await emailjs.send(
        'service_jq6m8ee', // EmailJS Service ID
        template,
        {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phone: data.phone,
          guests: data.guests,
          roomsTable, // pass HTML table
          notes: data.notes || 'None',
          total: `₱${Number(data.total).toLocaleString()}`,
          addOnTotal: data.addOnTotal ? `₱${Number(data.addOnTotal).toLocaleString()}` : '₱0',
          contactInfo: `If you have any questions or concerns, please contact UWS.`,
          additionalJoiner: data.additionalJoiner,
          encryptedData: data.encryptedData || '',
        },
        'xsvi8L3B4ff5HoCd_', // EmailJS Public Key
      )

      console.log('📧 Acknowledgement email sent!', result.text)
    } catch (error) {
      console.error('❌ Failed to send email:', error)
    }
  }

  return { sendReservationAcknowledgement }
}
