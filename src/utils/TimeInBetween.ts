import type { TimeInBetween } from '@/interface/types'
import { useFlightSearch } from '@/composable/useFlightSearch'

const { timeDifference } = useFlightSearch();

export function calculateTimeInBetween(departureTime: string, arrivalTime: string): TimeInBetween {
  const departure: Date = new Date(`1970-01-01T${departureTime}`);
  const arrival: Date = new Date(`1970-01-01T${arrivalTime}`);
  const difference: number = Math.abs(arrival.getTime() - departure.getTime());
  const hours: number = (Math.floor(difference / (1000 * 60 * 60)) +  timeDifference.value);
  const minutes: number = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const flightTime = `${hours}${minutes > 0 ? ':'+minutes : ''}`

  return { flightTime };
}