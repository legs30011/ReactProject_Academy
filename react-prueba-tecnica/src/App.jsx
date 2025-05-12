import React, { useEffect, useState } from 'react';
export function App(){
    const CAT_ENDPOINT_FACT = 'http://carfact.ninja/fact '
    const CAT_ENDPOINT_IMAGE_URL =`http://cataas.com/cat/says/${'hello'}?size=50&color=red&json=truye`
    const [fact, setFact] = useState('lorem ipsum car fact whatever')
    //no puedes usar react query
    //SWR AXIOS O APOLLO
    useEffect(() => {
        fetch('http://carfact.ninja/fact ')
        .then(res => res.json())
        .then(data => setFact(data.fact))
    },[])
    return (
        <main>
            <h1>App de Gatos</h1>
            <p>{fact}</p>
        </main>
        
    )
}