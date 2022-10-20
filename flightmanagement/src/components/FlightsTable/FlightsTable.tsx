import React from 'react'
import isEmpty from 'lodash.isempty';
import { observer } from 'mobx-react';
import "../FlightsTable/Styles/FlightsTable.css"
import { FlightsType } from '../../services/types';

interface Props {
    data: FlightsType | {}
}

const FlightsTable = observer(({ data }: Props) => (
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
                            <td>{item?.flightNumber}</td>
                            <td>{item?.takeoffAirport}</td>
                            <td>{item?.takeoffTime} {item?.takeoffTimeDiff && <p className='delayed'>{`Delayed - ${item?.takeoffTimeDiff} min`}</p>}</td>
                            <td>{item?.landingTime} {item?.landingTimeDiff && <p className='delayed'>{`Delayed - ${item?.landingTimeDiff} min`}</p>}</td>
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
))

export default FlightsTable
