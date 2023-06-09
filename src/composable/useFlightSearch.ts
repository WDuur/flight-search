import { ref, reactive, readonly, nextTick } from 'vue'
import { searchTimeZone } from '@/utils/TimeZone'
import type { City, Flight } from '@/interface/types'
import flightData from '@/__mock__/flightData.json'

export interface SearchData {
	departure: City
	arrival: City
	departureDate: Date
	state: string
}
export interface FlightRoute {
	from: String
	to: String
}
const selected = ref<String>('idle');
const state = ref<String>('idle')
const flightResult = ref<Flight[]>([]);
const originalFlightResult = ref<Flight[]>([]);
const timeDifference = ref<number>(0);

const searchData = reactive<SearchData>({
	departure: { name: '', code: '', zone: '' },
	arrival: { name: '', code: '', zone: '' },
	departureDate: new Date(),
	state: 'api',
})

const flightRoute = ref<FlightRoute>({
	from: '',
	to: '',
});

export function useFlightSearch() {
  
	const options = {
		method: 'GET',
		headers: {
			'content-type': 'application/octet-stream',
			'X-RapidAPI-Key':
					'702da58081msh33bc90577746a88p1f2f9cjsn8f09ad1af2ab',
			'X-RapidAPI-Host': 'flight-info-api.p.rapidapi.com',
		},
	}

	const searchQuery = async () => {
		const departureOffset = await searchTimeZone(searchData.departure.zone);
		const arrivalOffset = await searchTimeZone(searchData.arrival.zone);
		timeDifference.value = Math.abs((departureOffset - arrivalOffset)/60/60);

		console.log('time diff in hours: ',timeDifference)

		const [day, month, year] = new Date(searchData.departureDate)
				.toLocaleDateString('nl-NL')
				.split('-')
		const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
				2,
				'0'
		)}`
		const fetchApi =
				Array.isArray(searchData.state) && searchData.state.includes('api')

		// https://rapidapi.com/oag-oag-default/api/flight-info-api/
		const url = `https://flight-info-api.p.rapidapi.com/schedules?version=v1&DepartureDate=${formattedDate}&DepartureAirport=${searchData.departure.code}&ArrivalAirport=${searchData.arrival.code}`
			if (fetchApi && timeDifference) {
					try {
							const response = await fetch(url, options)
							const result = await response.json()
							console.log(result.data)
							state.value = 'result'
							flightResult.value = result.data
							originalFlightResult.value = flightResult.value
					} catch (error) {
							console.error(error)
					}
			} else {
				flightResult.value = flightData
				originalFlightResult.value = flightResult.value
				flightRoute.value = {
						from: searchData.departure.name,
						to: searchData.arrival.name,
				}

				state.value = 'result'
			}
  }

	return {
		state,
		selected,
		flightRoute,
		timeDifference,
		originalFlightResult,
		location,
		searchData,
		flightResult,
		searchQuery,
	}
}
