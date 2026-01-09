export default function Button({ name, onClick }) {

    return(
        <button className="game-button" onClick={onClick}>{name}</button>
    )
}