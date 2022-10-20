import { action, makeObservable, observable } from "mobx";
import moment from "moment";
import { FlightPropT } from "../../services/types";
const MOMENT_FORMAT = "dd/MM/yyyy - HH:mm";



export default class FlightDataStore implements FlightPropT {
    flightNumber: string;
    landingAirport: string
    landingTime: string
    status: string
    takeoffAirport: string
    takeoffTime: string
    landingTimeDiff?: string;
    takeoffTimeDiff?: string;

    constructor(params?: FlightPropT) {
        this.flightNumber = params?.flightNumber || '';
        this.landingAirport = params?.landingAirport || '';
        this.landingTime = params?.landingTime || '';
        this.status = params?.status || '';
        this.takeoffAirport = params?.takeoffAirport || '';
        this.takeoffTime = params?.takeoffTime || '';
        if (params?.landingTimeDiff || params?.takeoffTimeDiff) {
            this.landingTimeDiff = params?.landingTimeDiff;
            this.takeoffTimeDiff = params?.takeoffTimeDiff;
        }

        makeObservable(this, {
            flightNumber: observable,
            landingAirport: observable,
            landingTime: observable,
            status: observable,
            takeoffAirport: observable,
            takeoffTime: observable,
            landingTimeDiff: observable,
            takeoffTimeDiff: observable,

            update: action,
        });
    }


    update(item: FlightPropT) {
        const prevLandingTime = this.landingTime;
        const prevTakeoffTime = this.takeoffTime;
        this.flightNumber = item?.flightNumber;
        this.landingAirport = item?.landingAirport;
        this.landingTime = item?.landingTime;
        this.status = item?.status;
        this.takeoffAirport = item?.takeoffAirport;
        this.takeoffTime = item?.takeoffTime;

        if (item?.landingTime !== prevLandingTime || item?.takeoffTime !== prevTakeoffTime) {
            this.landingTimeDiff = (moment.duration(moment(item?.landingTime, MOMENT_FORMAT).diff(moment(prevLandingTime, MOMENT_FORMAT)))).asMinutes().toString();
            this.takeoffTimeDiff = (moment.duration(moment(item?.takeoffTime, MOMENT_FORMAT).diff(moment(prevTakeoffTime, MOMENT_FORMAT)))).asMinutes().toString();
        }
    }
} 