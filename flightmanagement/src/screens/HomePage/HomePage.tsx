import { observer } from 'mobx-react';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import './Style/HomePage.css';
import { FlightsTable } from '../../components';
import { connect } from 'socket.io-client';
import { TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { debounce } from "lodash";
import { LOCAL_URL } from '../../services/ApiServices';
import { FlightsContext } from '../../stores/FlightsStore/FlightsContext';

const socket = connect(LOCAL_URL);

const HomePage = observer(() => {
    const { flightsStore } = useContext(FlightsContext);

    useEffect(() => {
        if (flightsStore) {
            socket.on("flight-update", (res) => {
                flightsStore?.updateFlightsData(res);
            })
        }
    }, [socket])

    const [searchValue, setSearchValue] = useState('')

    const getDataWithFilter = (e: string) => {
        flightsStore?.setFlightsWithFilter(e)
    }
    const handleNewDataWithDebounce: any = useCallback(debounce(getDataWithFilter, 500), []);

    const handleChangeText = useCallback((e: any) => {
        setSearchValue(e.target.value)
        if (e.target.value.length > 1) {
            handleNewDataWithDebounce(e.target.value);
        } else {
            handleNewDataWithDebounce();
        }
    }, [searchValue]);

    return (
        <div className='container'>
            <TextField
                className='search'
                fullWidth
                placeholder='Search flight'
                id="standard-bare"
                variant="outlined"
                value={searchValue}
                onChange={handleChangeText}
                InputProps={{
                    endAdornment: (
                        <IconButton>
                            <SearchOutlined />
                        </IconButton>
                    ),
                }}
            />
            <FlightsTable data={flightsStore?.getFlights || []} />

        </div>
    )
})
export default HomePage;
