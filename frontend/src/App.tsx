import React, {useState, useEffect} from 'react';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  minThreshold: number;
  lowStock: boolean;
}

export default function App() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [minThreshold, setMinThreshold] = useState('');

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = { name, quantity: parseInt(quantity), minThreshold: parseInt(minThreshold) };

    try {
      const response = await fetch('http://localhost:8080/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin123')
        },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        setName('');
        setQuantity('');
        setMinThreshold('');
        fetchItems();
      } else {
        alert('Failed to add item. Are you logged in as admin?');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleRestock = async (id: number) => {
    const addAmount = prompt('Enter quantity to add:');
    if (!addAmount) return;

    try {
      const response = await fetch(`http://localhost:8080/api/items/${id}/restock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin123')
        },
        body: JSON.stringify({ quantity: parseInt(addAmount) })
      });

      if (response.ok) {
        fetchItems();
      } else {
        alert('Failed to restock item.');
      }
    } catch (error) {
      console.error('Error restocking:', error);
    }
  };

  return (
      <div>
        <h1>Smart Pantry Dashboard</h1>

        <form onSubmit={handleAddItem}>
          <h3>Add New Pantry Item</h3>
          <input
              type="text" placeholder="Item Name" value={name}
              onChange={(e) => setName(e.target.value)} required
          />
          <input
              type="number" placeholder="Quantity" value={quantity}
              onChange={(e) => setQuantity(e.target.value)} required
          />
          <input
              type="number" placeholder="Min Threshold" value={minThreshold}
              onChange={(e) => setMinThreshold(e.target.value)} required
          />
          <button type="submit">Add Item</button>
        </form>

        <h3>Current Inventory</h3>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Min Threshold</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.minThreshold}</td>
                <td>
                  {item.lowStock ? 'Low Stock' : 'In Stock'}
                </td>
                <td>
                  <button
                      onClick={() => handleRestock(item.id)}>
                    Restock
                  </button>
                </td>
              </tr>
          ))}
          {items.length === 0 && (
              <tr>
                <td colSpan={5}>No items found in pantry.</td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  );
}