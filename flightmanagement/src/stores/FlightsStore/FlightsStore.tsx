import { makeObservable, observable, action, computed, IObservableArray } from 'mobx';
import FlightDataStore from './FlightDataStore';
export interface FlightsItem {
    flightNumber: string
    landingAirport: string
    landingTime: string
    status: string
    takeoffAirport: string
    takeoffTime: string
    landingTimeDiff?: string
    takeoffTimeDiff?: string
}
export interface TFlightsStore {
    flights: IObservableArray<FlightDataStore>;
    flightsWithFilter: IObservableArray<FlightDataStore>;
    setFlights: (data: IObservableArray<FlightDataStore>) => void;
    setFlightsWithFilter: (searchValue: string) => void;
    updateFlightsData: (newFlightData: FlightsItem) => void;
    readonly getFlights: IObservableArray<FlightDataStore>;
}
export class FlightsStore implements TFlightsStore {
    flights: IObservableArray<FlightDataStore>;
    flightsWithFilter: IObservableArray<FlightDataStore>

    constructor() {
        makeObservable(this, {
            flights: observable,
            flightsWithFilter: observable,

            setFlights: action,
            setFlightsWithFilter: action,
            updateFlightsData: action,

            getFlights: computed,
        });
        this.flights = observable.array<FlightDataStore>([]);
        this.flightsWithFilter = observable.array<FlightDataStore>([]);
    }

    setFlightsWithFilter(searchValue?: string) {
        if (searchValue) {
            let filtered: IObservableArray<FlightDataStore> = Object.assign({}, ...
                Object.entries(this.flights).slice().filter(([k, v]) => v.flightNumber.toString().toUpperCase().includes(searchValue.toUpperCase()) ||
                    v.takeoffAirport.toUpperCase().includes(searchValue.toUpperCase()) ||
                    v.landingAirport.toUpperCase().includes(searchValue.toUpperCase())
                ).map(([k, v]) => ({ [k]: v }))
            );
            this.flightsWithFilter = filtered
        }
        else {
            this.flightsWithFilter = this.flights;
        }
    }

    updateFlightsData(newFlightData: FlightsItem) {
        const getFlightIndex = this.flights.findIndex(f => f.flightNumber === newFlightData?.flightNumber)
        this.flights[getFlightIndex].update(newFlightData);
    }

    setFlights(data: IObservableArray<FlightDataStore>) {
        data?.map((item, index) => {
            const newItem = new FlightDataStore(item);
            this.flights.push(newItem);
        })
        this.flightsWithFilter = this.flights
    }

    get getFlights() {
        return this.flightsWithFilter
    }

}
