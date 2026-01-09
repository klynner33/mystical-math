
export default function ArcadeButton({ name, onClick }) {
  return (
    <button className="arcade-button" onClick={onClick}>
      {name}
    </button>
  );
}
