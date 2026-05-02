import type { TimeSlot } from '@hd-corporate/contracts'

const BUSINESS_HOURS = {
  start: 9,
  end: 18,
  slotDuration: 30,
  breakStart: 12,
  breakEnd: 14,
}

const DAYS_OFF = [0, 6]

export function buildSlotGrid(
  dateStr: string,
  bookedTimes: string[],
  blockedTimes: string[],
  wholeDayBlocked: boolean
): TimeSlot[] {
  const date = new Date(`${dateStr}T12:00:00`)
  const dayOfWeek = date.getDay()

  if (DAYS_OFF.includes(dayOfWeek) || wholeDayBlocked) {
    return []
  }

  const booked = new Set(bookedTimes)
  const blocked = new Set(blockedTimes)
  const slots: TimeSlot[] = []
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()

  for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
    if (hour >= BUSINESS_HOURS.breakStart && hour < BUSINESS_HOURS.breakEnd) {
      continue
    }

    for (let minute = 0; minute < 60; minute += BUSINESS_HOURS.slotDuration) {
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`

      let available = true
      if (isToday) {
        const slotTime = new Date(date)
        slotTime.setHours(hour, minute, 0, 0)
        available = slotTime > now
      }

      if (available && (booked.has(timeStr) || blocked.has(timeStr))) {
        available = false
      }

      slots.push({
        id: `${dateStr}-${timeStr}`,
        time: timeStr,
        available,
      })
    }
  }

  return slots
}
