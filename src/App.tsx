import './App.css'
import { useState } from "react";
import ListViewer from "./Components/ListViewer.tsx";

export type Pokemon = {
    name: string;
    height: string;
    weight: string;
    types: string[];
}

function App() {
    const [fetchOutput, setFetchOutput] = useState<string>("Nic się nie dzieje");
    const [viewList, setViewList] = useState<boolean>(false);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    async function fetchData() {
        const url = "https://pokeapi.co/api/v2/pokemon";
        setFetchOutput("Zbieranie danych...");

        try {
            const pokemonResult = new Array<Pokemon>();

            for (let i = 1; i <= 50; i++) {
                const data = await fetch(url + `/${i}`);
                const jsonItem = await data.json();

                const pokemonItem: Pokemon = {
                    name: jsonItem.name,
                    height: jsonItem.height,
                    weight: jsonItem.weight,
                    types: jsonItem.types.map((type: any) => type.type.name),
                };

                pokemonResult.push(pokemonItem);
                setFetchOutput(`Zbieranie danych... (${pokemonResult.length} / 50)`);
            }

            setFetchOutput("Sukces!");
            setPokemons(pokemonResult);
            setViewList(true);
        } catch (error) {
            console.log("Coś się popsuło...");
            setFetchOutput("Coś się popsuło. Sprawdź połączenie z internetem.");
        }
    }

    return (
        <>
            <button className={"fetchButton"} onClick={fetchData}>Załaduj Pokémony</button>
            <h4>{fetchOutput}</h4>

            {viewList ? <ListViewer pokemons={pokemons} /> : null}
        </>
    );
}

export default App