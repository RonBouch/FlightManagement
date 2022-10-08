import { makeObservable, observable, action, computed } from 'mobx';

interface FlightsItem {
    flightNumber: string
    landingAirport: string
    landingTime: string
    status: string
    takeoffAirport: string
    takeoffTime: string
}
interface Dict<FlightsItem> {
    data: {
        [key: string]: FlightsItem;
    }
}
class FlightsStore {
    flights: Dict<FlightsItem> | {} = {};
    flightsWithFilter: Dict<FlightsItem> | {} = {};
    loader: boolean = false;




    constructor() {
        makeObservable(this, {
            flights: observable,
            loader: observable,
            flightsWithFilter: observable,

            setFlights: action,
            setLoader: action,
            setFlightsWithFilter: action,

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
