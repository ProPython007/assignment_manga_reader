import { useEffect, useState } from "react";


// Utility function to fetch data through get request:
// Expects URL
// Returns Data, Loader and Error
// Equipped with AbortController to abort unwanted pending/old requests!
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const abortConst = new AbortController();

        setTimeout(() => {
            fetch(`${url}`, {signal: abortConst.signal})
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Couldn't fetch the data from the server!");
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setIsPending(false);
                    setError(false);
                })
                .catch((err) => {
                    if (err.name === 'AbortError'){
                        console.log('Fetch aborted!');
                    } else{
                        setError(err.message);
                        setIsPending(false);
                    }
                });
        }, 0);

        return () => abortConst.abort();
    }, [url]);


    return {
        data, isPending, error
    };
}


export default useFetch;