import axios from "axios";
export const LOCAL_URL = "http://localhost:4963";

export const getFlights = async () => {

    try {
        const res = await axios.get(`${LOCAL_URL}/flights`)
        if (res.status === 200 && res.data) {
            return res.data?.flights
        }
    } catch (error) {
        console.log("getflights ~ error", error)
        return []
    }
}

