import { observer } from 'mobx-react';
import { useCallback, useContext, useState } from 'react'
import { FlightsTable } from '../../components';
import './Style/HomePage.css';
import { TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { debounce } from "lodash";
import { FlightsContext } from '../../stores/FlightsStore/FlightsContext';


const HomePage = observer(() => {
    const { flightsStore } = useContext(FlightsContext);
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
            {flightsStore && <FlightsTable data={flightsStore.getFlights} />}

        </div>
    )
})
export default HomePage;
