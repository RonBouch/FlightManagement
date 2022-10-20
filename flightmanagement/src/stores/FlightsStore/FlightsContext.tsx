import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { LOCAL_URL } from "../../services/ApiServices";
import { FlightsStore } from "./FlightsStore";
import { connect } from 'socket.io-client';
import { TFlightsStore } from "../../services/types";

export interface FlightsContextState {
    flightsStore?: TFlightsStore
}

export const FlightsContext = createContext<FlightsContextState>({});

const socket = connect(LOCAL_URL);

const FlightsProvider = ({ children }: { children: ReactNode }) => {

    const [flightsStore, setFlightsStore] = useState<TFlightsStore>();

    useEffect(() => {
        if (!flightsStore) {
            setFlightsStore(new FlightsStore());
        } else {
            socket.on("flight-update", (res) => {
                flightsStore?.updateFlightsData(res);
            })
        }
    }, [flightsStore, socket]);


    return (
        <FlightsContext.Provider value={{ flightsStore }}>
            {children}
        </FlightsContext.Provider>
    );
}

export default FlightsProvider;