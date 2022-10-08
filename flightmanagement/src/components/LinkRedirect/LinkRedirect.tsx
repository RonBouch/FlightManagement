import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useParams } from 'react-router-dom'
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const LinkRedirect = () => {
    // const params = useParams();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [])

    return (
        <div style={{ marginTop: 100 }}>
            {!isLoading ?
                <>
                    <NotFoundPage />
                </>
                :
                <ThreeDots
                    height="20"
                    width="100%"
                    color='grey'
                    ariaLabel='loading'
                />
            }

        </div>
    )
}

export default LinkRedirect
