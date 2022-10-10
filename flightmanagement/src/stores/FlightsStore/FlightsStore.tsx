import { makeObservable, observable, action, computed } from 'mobx';
import isEqual from 'lodash.isequal';
import moment from 'moment';
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
const MOMENT_FORMAT = "dd/MM/yyyy - HH:mm";
class FlightsStore {
    flights: { [index: string]: FlightsItem; } = {};
    flightsWithFilter: { [index: string]: FlightsItem; } = {};

    constructor() {
        makeObservable(this, {
            flights: observable,
            flightsWithFilter: observable,

            setFlights: action,
            setFlightsWithFilter: action,
            updateFlightsData: action,

            getFlights: computed,
            getFlightsWithFilter: computed,
            getOriginalflights: computed,
        });
    }

    setFlightsWithFilter(searchValue?: string) {
        if (searchValue) {
            let filtered = Object.assign({}, ...
                Object.entries(this.flights).filter(([k, v]) =>
                    k.toString().toUpperCase().includes(searchValue.toUpperCase()) ||
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
        const getFlightNumber = newFlightData?.flightNumber
        const prevFlightData = this.flights[getFlightNumber];
        if (prevFlightData && !isEqual(newFlightData, prevFlightData)) {
            let getPrevLandingTime = prevFlightData.landingTime.slice()
            let newData = newFlightData

            if (newFlightData?.landingTime != getPrevLandingTime) {
                let landingTimeDiff = (moment.duration(moment(newFlightData.landingTime, MOMENT_FORMAT).diff(moment(prevFlightData.landingTime, MOMENT_FORMAT)))).asMinutes();
                let takeoffTimeDiff = (moment.duration(moment(newFlightData.takeoffTime, MOMENT_FORMAT).diff(moment(prevFlightData.takeoffTime, MOMENT_FORMAT)))).asMinutes();
                newData['landingTimeDiff'] = landingTimeDiff.toString()
                newData['takeoffTimeDiff'] = takeoffTimeDiff.toString()
            }

            this.flights[getFlightNumber] = newFlightData
            if (this.flightsWithFilter[getFlightNumber])
                this.flightsWithFilter[getFlightNumber] = newData;
        }
    }

    setFlights(data: FlightsItem[]) {
        const dict = Object.assign({}, ...data.map((x) => ({ [x.flightNumber]: x })));

        this.flights = dict;
        this.flightsWithFilter = dict;
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
