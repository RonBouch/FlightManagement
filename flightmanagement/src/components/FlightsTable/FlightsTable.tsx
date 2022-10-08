import React from 'react'
import isEmpty from 'lodash.isempty';
import { observer } from 'mobx-react';


interface Props<FlightsItem> {
    data: {
        [key: string]: FlightsItem;
    } | {}
}


interface FlightsItem {
    flightNumber: string
    landingAirport: string
    landingTime: string
    status: string
    takeoffAirport: string
    takeoffTime: string
}


const FlightsTable = observer(({ data }: Props<FlightsItem>) => {

    return (
        <React.Fragment>
            {!isEmpty(data) ?
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th className='short-column'>No.</th>
                            <th className='short-column'> Flight-Number</th>
                            <th>Takeoff-Airport</th>
                            <th>Takeoff-Time</th>
                            <th>Landing-Time</th>
                            <th>Landing-Airport</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {!isEmpty(data) && Object.entries(data).map(([key, item], index) => {
                            return (<tr key={item?.flightNumber + index} >
                                <th className='short-column' scope='row'>{index + 1}</th>
                                <td>
                                    {item?.flightNumber}
                                </td>
                                <td>{item?.takeoffAirport}</td>
                                <td>
                                    {item?.takeoffTime}
                                </td>
                                <td>{item?.landingTime}</td>
                                <td>{item?.landingAirport}</td>
                                <td className={`status-${item?.status}`}>{item?.status}</td>
                            </tr>)
                        })
                        }
                    </tbody>
                </table>
                :
                <p className='no-results'>No Results</p>
            }

        </React.Fragment>
    )
})

export default FlightsTable
