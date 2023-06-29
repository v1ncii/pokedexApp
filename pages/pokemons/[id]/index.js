import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { useEffect } from "react";

export default function Pokemon() {
    const[pokemon, setPokemon] = useState(null);
    const[isLoading, setIsLoading] =useState(true);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!router.isReady) return;
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setIsLoading(false);
                setPokemon(json);
            });
    }, [router.isReady]);

    return <p>Pokemon {id}</p>;
}