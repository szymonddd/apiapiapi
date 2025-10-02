import ListElement from "./ListElement";
import { useState } from "react";
import "../styles/ListViewer.css";
import type {Pokemon} from "../App";

type ListViewerProps = {
    pokemons: Pokemon[];
};

const ListViewer = ({ pokemons }: ListViewerProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon | null>(null);
    const [displayElement, setDisplayElement] = useState<boolean>(false);

    function displayInfo() {
        setDisplayElement(true);
        setSearchQuery("");
    }

    return (
        <>
            <input
                type="text"
                placeholder="Szukaj pokémona..."
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setDisplayElement(false);
                }}
            />

            {
                searchQuery.length === 0 ? <p className="grr">Wpisz coś</p> :
                    pokemons
                        .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((pokemon, index) => (
                            <p
                                key={index}
                                onClick={() => {
                                    setDisplayedPokemon(pokemon);
                                    displayInfo();
                                }}
                            >
                                {pokemon.name}
                            </p>
                        ))
            }

            {
                displayElement && displayedPokemon && (
                    <ListElement
                        name={displayedPokemon.name}
                        height={displayedPokemon.height}
                        weight={displayedPokemon.weight}
                        types={displayedPokemon.types}
                    />
                )
            }
        </>
    );
};

export default ListViewer;
