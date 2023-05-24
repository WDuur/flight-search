
export interface TimelineItem {
  id: number
  status: string
  isSelected: boolean
}

export interface TimeInBetween {
  flightTime: string;
}
export interface City {
    name: string
    code: string
    zone: string
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

export interface Flight {
  carrierCode: {
    iata: string;
    icao: string;
  };
  serviceSuffix: string;
  flightNumber: number;
  sequenceNumber: number;
  flightType: string;
  departure: {
    airport: {
      iata: string;
      icao: string;
    };
    terminal: string;
    date: string;
    passengerLocalTime: string;
  };
  arrival: {
    airport: {
      iata: string;
      icao: string;
    };
    terminal: string;
    date: string;
    passengerLocalTime: string;
  };
  aircraftType: {
    iata: string;
  };
  serviceTypeCode: {
    iata: string;
  };
  segmentInfo: {
    numberOfStops: number;
    intermediateAirports: {
      iata: string[];
    };
  };
  oagFingerprint: string;
  codeshare: {
    operatingAirlineDisclosure: {
      code: string;
      name: string;
      number: string;
    };
    aircraftOwner: {
      code: string;
      name: string;
    };
    jointOperationAirlineDesignators: any[];
    comments010: any[];
    comment050: {
      code: string;
      serviceNumber: string;
      suffix: string;
    };
  };
}

