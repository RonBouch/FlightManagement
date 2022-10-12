import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { TFlightsStore, FlightsStore } from "./FlightsStore";

export interface FlightsContextState {
    flightsStore?: TFlightsStore
}

export const FlightsContext = createContext<FlightsContextState>({});

const FlightsProvider = ({ children }: { children: ReactNode }) => {

    const [flightsStore, setFlightsStore] = useState<TFlightsStore>();

    useEffect(() => {
        if (!flightsStore) {
            setFlightsStore(new FlightsStore());
        }
    }, [flightsStore]);

    return (
        <FlightsContext.Provider value={{ flightsStore }}>
            {children}
        </FlightsContext.Provider>
    );
}

export default FlightsProvider;