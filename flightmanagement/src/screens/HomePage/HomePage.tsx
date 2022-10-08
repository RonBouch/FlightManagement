import { observer } from 'mobx-react';
import React, { useEffect } from 'react'
import flightsStore from '../../stores/FlightsStore/FlightsStore';
import './HomePage.css';
import FlightsTable from '../../components/FlightsTable/FlightsTable';
import { connect } from 'socket.io-client';

const socket = connect("http://localhost:4963")
const HomePage = observer(() => {
    useEffect(() => {
        socket.on("flight-update", (res) => {
            flightsStore.updateFlightsData(res);
        })
    }, [socket])

    return (
        <div className='container'>
            <FlightsTable data={flightsStore.getFlights} />
        </div>
    )
})
export default HomePage;
