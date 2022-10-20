import { makeObservable, observable, action, computed } from 'mobx';
import { getFlights } from '../../services/ApiServices';
import { FlightPropT, FlightsType, TFlightsStore } from '../../services/types';
import FlightDataStore from './FlightDataStore';

export class FlightsStore implements TFlightsStore {
    flights: FlightsType;
    flightsWithFilter: FlightsType

    constructor() {
        makeObservable(this, {
            flights: observable,
            flightsWithFilter: observable,

            setFlights: action,
            setFlightsWithFilter: action,
            updateFlightsData: action,

            getFlights: computed,
        });
        this.flights = {}
        this.flightsWithFilter = {}
        this.getDataFromServer()
    }

    async getDataFromServer() {
        try {
            const flights = await getFlights();
            this.setFlights(flights)
        } catch (error) {
            console.log("getData ~ error", error)
        }
    }

    setFlightsWithFilter(searchValue?: string) {
        if (searchValue) {
            let filtered: FlightsType = Object.assign({}, ...
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

    updateFlightsData(newFlightData: FlightPropT) {
        this.flights[newFlightData.flightNumber].update(newFlightData);
    }

    setFlights(data: FlightPropT[]) {
        let newDict: FlightsType = {}
        data?.map((item, index) => {
            newDict[item.flightNumber.toString()] = new FlightDataStore(item);
        })
        this.flights = newDict;
        this.flightsWithFilter = newDict;
    }

    get getFlights() {
        return this.flightsWithFilter
    }

}
