import type { N } from 'vitest/dist/types-71ccd11d'

export interface City {
    name: string
    code: string
}

interface Airport {
    airport?: {
        iata?: string
        icao?: string
    }
    terminal?: string
    date?: string
    passengerLocalTime?: string
}

export interface FlightType {
    carrierCode?: {
        iata?: string
        icao?: string
    }
    serviceSuffix?: string
    flightNumber?: number
    sequenceNumber?: number
    flightType?: string
    departure: Airport
    arrival: Airport
    aircraftType?: string
    serviceTypeCode?: string
    segmentInfo?: {
        numberOfStops?: number
        intermediateAirports?: {
            iata?: any
        }
    }
    oagFingerprint?: string
    codeshare?: {
        operatingAirlineDisclosure: {
            code?: string
            name?: string
            number?: string
        }
        aircraftOwner: {
            code?: string
            name?: string
        }
        jointOperationAirlineDesignators: {
            comments010?: any
            comment050?: {
                code?: string
                serviceNumber?: string
                suffix?: string
            }
        }
    }
}
