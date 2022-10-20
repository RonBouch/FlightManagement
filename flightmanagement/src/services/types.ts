import FlightDataStore from "../stores/FlightsStore/FlightDataStore"

export interface FlightPropT {
    flightNumber: string
    landingAirport: string
    landingTime: string
    status: string
    takeoffAirport: string
    takeoffTime: string
    landingTimeDiff?: string
    takeoffTimeDiff?: string
    update?: (item: FlightPropT) => void;
}

export interface FlightsType { [key: string]: FlightDataStore }

export interface TFlightsStore {
    flights: FlightsType;
    flightsWithFilter: FlightsType;
    setFlights: (data: FlightPropT[]) => void;
    setFlightsWithFilter: (searchValue: string) => void;
    updateFlightsData: (newFlightData: FlightPropT) => void;
    readonly getFlights: FlightsType;
}

