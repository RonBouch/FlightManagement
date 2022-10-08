import React from 'react'
// import { getURLs, setCount, onDelete } from '../../services/ApiServices'
import isEmpty from 'lodash.isempty';
const baseURL = "http://localhost:3000/"


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


const FlightsTable = ({ data }: Props<FlightsItem>) => {
    console.log("🚀 ~ file: FlightsTable.tsx ~ line 23 ~ FlightsTable ~ data", data)

    const addClick = async (shortenerURL: string) => {
        // setCount(shortenerURL);
        // getURLs(dispatch);
    }

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
}

export default FlightsTable
