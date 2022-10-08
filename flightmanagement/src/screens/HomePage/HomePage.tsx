import { observer } from 'mobx-react';
import React, { useEffect } from 'react'
import flightsStore from '../../stores/FlightsStore/FlightsStore';
import './HomePage.css';
import FlightsTable from '../../components/FlightsTable/FlightsTable';
import { connect } from 'socket.io-client';

const socket = connect("http://localhost:4963")
const HomePage = observer(() => {
    console.log(flightsStore.getFlights)
    useEffect(() => {
        // socket.on("flight-update", (data) => {
        //     console.log("data", data)
        // })
    }, [socket])
    const getData = () => {
        socket.emit('flight-update');
    }

    return (
        <div className='container'>
            <FlightsTable data={flightsStore.getFlights} />
        </div>
    )
})
export default HomePage;
