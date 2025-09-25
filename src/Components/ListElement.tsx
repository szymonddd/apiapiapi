
type ListElementProps = {
    name: string;
    height: string;
    weight: string;
    types: string[];
};

const ListElement = ({ name, height, weight, types}: ListElementProps) => {

    return (
        <>
            <h4>Name: {name}</h4>
            <h4>Height: {height}</h4>
            <h4>Weight: {weight}</h4>
            <h4>Types: {types}</h4>
        </>
    )
}

export default ListElement