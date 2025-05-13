import React, { useEffect, useState } from 'react';
import './style.css';

const CAT_ENDPOINT_FACT = 'https://catfact.ninja/fact';

export function App() {
    const [fact, setFact] = useState();
    const [image, setImage] = useState();
    const [factError, setFactError] = useState(null);
    const [imageError, setImageError] = useState(null);

    // para recupera la imagen cada vez que tenemos una cita nueva
    useEffect(() => {
        if (!fact) return;

        const firstWordForImage = fact.split(' ').slice(0, 3).join(' ');
        console.log(firstWordForImage);

        fetch(`https://cataas.com/cat/says/${firstWordForImage}?size=50&color=red&json=true`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(response => {
                const { url } = response;
                setImage(url);
                setImageError(null);
            })
            .catch(error => {//solo en la peticion no en la respuesta
                console.error("Error fetching cat image:", error);
                setImage(null);
                setImageError("No se pudo cargar la imagen del gato.");
            });
    }, [fact]); //fact, para que se ejecute cuando cambia el fact

    // para recuperar la cita al cargar la pagina
    useEffect(() => {
        fetch(CAT_ENDPOINT_FACT)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const { fact: catFact } = data;
                setFact(catFact);
                setFactError(null);
            })
            .catch(error => {
                console.error("Error fetching cat fact:", error);
                setFact(null);
                setFactError("No se pudo cargar el dato gatuno.");
            });
    }, []);

    return (
        <main>
            <h1>App de Gatos</h1>
            {fact ? (
                <p>{fact}</p>
            ) : factError ? (
                <p style={{ color: 'red' }}>{factError}</p>
            ) : (
                <p>Cargando un dato gatuno...</p>
            )}
            {image ? (
                <img src={image} alt={`Cat saying: ${fact ? fact.split(' ').slice(0, 3).join(' ') : ''}`} />
            ) : imageError ? (
                <p style={{ color: 'red' }}>{imageError}</p>
            ) : (
                <p>Cargando una imagen...</p>
            )}
        </main>
    );
}