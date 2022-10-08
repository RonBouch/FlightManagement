import { makeObservable, observable, action, computed } from 'mobx';
import isEqual from 'lodash.isequal';

interface FlightsItem {
    flightNumber: string
    landingAirport: string
    landingTime: string
    status: string
    takeoffAirport: string
    takeoffTime: string
}

class FlightsStore {
    flights: { [index: string]: FlightsItem; } = {};
    flightsWithFilter: { [index: string]: FlightsItem; } = {};
    loader: boolean = false;




    constructor() {
        makeObservable(this, {
            flights: observable,
            loader: observable,
            flightsWithFilter: observable,

            setFlights: action,
            setLoader: action,
            setFlightsWithFilter: action,
            updateFlightsData: action,

            getFlights: computed,
            getLoader: computed,
            getFlightsWithFilter: computed,
            getOriginalflights: computed,
        });
    }

    setFlightsWithFilter(searchValue?: string) {
        if (searchValue) {

        }
        // this.flightsWithFilter = this.flights.slice().filter(item => (item.title.toUpperCase().includes(searchValue.toUpperCase())))
        else {
            // this.flightsWithFilter = this.flights.slice();
        }
    }

    updateFlightsData(newFlightData: FlightsItem) {
        const getFlightNumber = newFlightData?.flightNumber
        const prevFlightData = this.flights[getFlightNumber];
        if (prevFlightData && !isEqual(newFlightData, prevFlightData)) {
            let getPrevLandingTime = prevFlightData.landingTime.slice()
            this.flights[getFlightNumber] = newFlightData
            this.flightsWithFilter[getFlightNumber] = newFlightData
        } else {

        }
    }

    setFlights(data: FlightsItem[]) {
        const dict = Object.assign({}, ...data.map((x) => ({ [x.flightNumber]: x })));

        this.flights = dict;
        this.flightsWithFilter = dict;
    }

    setLoader(data: boolean) {
        this.loader = data;
    }

    get getLoader() {
        return this.loader
    }

    get getFlights() {
        return this.flightsWithFilter
    }
    get getOriginalflights() {
        return this.flights;
    }

    get getFlightsWithFilter() {
        return this.flightsWithFilter;
    }
}

const flightsStore = new FlightsStore();
export default flightsStore;
