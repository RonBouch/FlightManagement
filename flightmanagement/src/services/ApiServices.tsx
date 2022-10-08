import axios from "axios";
import flightsStore from "../stores/FlightsStore/FlightsStore";
// import { toast } from A"react-toastify";


export const getflights = async () => {
    try {
        const res = await axios.get("http://localhost:4963/flights")
        if (res.status === 200 && res.data) {
            flightsStore.setFlights(res.data?.flights);
        }
    } catch (error) {
        console.log("getflights ~ error", error)
        flightsStore.setFlights([]);
    }
}

export const getFlight = async (flightNumber: string) => {
    const res = await axios.get(`http://localhost:4963/flights/${flightNumber}`)
    if (res.status === 200) {
        return res.data;
    }
}

