import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function DetailsBreakfastPage() {
    const [searchParams] = useSearchParams()
    const breakfastId = searchParams.get('id')
    
    const [breakfast, setBreakfast] = useState("")

    const fetchBreakfast = useCallback(() => {
        setIsLoading(true);
        //fetch breakfast
        fetch(process.env.REACT_APP_API_ENDPOINT + `api/user/getBreakfast/${breakfastId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setBreakfast(data.breakfast)
                setIsLoading(false);
            }
            else {
                setError("Error fetching data (breakfast)")
                setIsLoading(false);
            }
        }).catch(err => { console.log(err); setIsLoading(false) });
    }, [breakfast])

    useEffect(() => {
        if (breakfast.length === 0) {
            fetchPost();
        }
    }, [breakfast]);

    return (
        <div>DetailsBreakfastPage</div>
    )
}

export default DetailsBreakfastPage