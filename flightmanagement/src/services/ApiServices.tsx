import axios from "axios";
import flightsStore from "../stores/FlightsStore/FlightsStore";

export const LOCAL_URL = "http://localhost:4963";

export const getflights = async () => {
    try {
        const res = await axios.get(`${LOCAL_URL}/flights`)
        if (res.status === 200 && res.data) {
            flightsStore.setFlights(res.data?.flights);
        }
    } catch (error) {
        console.log("getflights ~ error", error)
        flightsStore.setFlights([]);
    }
}

