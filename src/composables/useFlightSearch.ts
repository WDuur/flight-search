import { ref, reactive, readonly } from 'vue'
import type { City, FlightType } from '@/interface/types'
import flightData from '@/__Mock__/flightData.json'

export interface SearchData {
    departure: City
    arrival: City
    departureDate: Date
}

const dummy: boolean = true

export default function useFlightSearch() {
    const state = ref('idle')
    let flightResult: FlightType = reactive({})

    const searchData = reactive<SearchData>({
        departure: { name: '', code: '' },
        arrival: { name: '', code: '' },
        departureDate: new Date(),
    })

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
        const [day, month, year] = new Date(searchData.departureDate)
            .toLocaleDateString('nl-NL')
            .split('-')
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
            2,
            '0'
        )}`

        // https://rapidapi.com/oag-oag-default/api/flight-info-api/
        const url = `https://flight-info-api.p.rapidapi.com/schedules?version=v1&DepartureDate=${formattedDate}&DepartureAirport=${searchData.departure.code}&ArrivalAirport=${searchData.arrival.code}`
        console.log(url)
        if (!dummy) {
            try {
                const response = await fetch(url, options)
                const result = await response.json()
                console.log(result.data)
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log(flightData.data)

            flightResult = flightData.data
        }
    }

    return {
        state: readonly(state),
        searchData,
        flightResult,
        searchQuery,
    }
}
