import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";

export default function Inventory() {
  const [earnedItems, setEarnedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    setEarnedItems(savedInventory);
  }, []);

  return (
    <div className="inventory-page">
      <Header />

      {earnedItems.length > 0 && (
        <button
          className="reset-inventory-btn"
          onClick={() => {
            localStorage.removeItem("inventory");
            setEarnedItems([]);
          }}
        >
          Reset Inventory
        </button>
      )}

      {earnedItems.length === 0 ? (
        <p className="inventory-empty-message">
          Your inventory is currently empty. Answer 10 questions correctly to
          earn a key that will unlock the chest and earn your first item or creature!
        </p>
      ) : (
        <div className="inventory-grid">
          {earnedItems.map((item) => (
            <div
              className="inventory-card"
              key={item.id}
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.src} alt={item.name} className="inventory-image" />
              <p className="inventory-name">{item.name}</p>
              <p className="inventory-charge">
                Mystic Charge: {item.mysticCharge}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div
          className="inventory-modal-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="inventory-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.src}
              alt={selectedItem.name}
              className="inventory-modal-image"
            />
            <p className="inventory-modal-text">{selectedItem.name}</p>
            <p className="inventory-modal-text">
              Mystic Charge: {selectedItem.mysticCharge}
            </p>

            <button
              className="inventory-modal-close"
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
