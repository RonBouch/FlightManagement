import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';

const NotFoundPage = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [])
    return (
        <div>
            {!isLoading ?
                <>
                    <h3>404 page not found</h3>
                    <p>We are sorry but the page you are looking for does not exist.</p>
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

export default NotFoundPage;