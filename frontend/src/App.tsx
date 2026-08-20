import React, {useState, useEffect} from 'react';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  minThreshold: number;
  lowStock: boolean;
}

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState<string | null>(null);

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      // btoa() encodes the credentials into Base64 format, which is the standard required for HTTP Basic Auth headers.
      setAuth(btoa(`${username}:${password}`));
    }
    else if (username === 'user' && password === 'user123') {
      setAuth(btoa(`${username}:${password}`));
    }
    else {
      alert("Invalid username or password!");
      setPassword('');
    }
  };

  const handleLogout = () => {
    setAuth(null);
    setUsername('');
    setPassword('');
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = { name, quantity: parseInt(quantity), minThreshold: parseInt(minThreshold) };

    try {
      const response = await fetch('http://localhost:8080/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
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
          'Authorization': `Basic ${auth}`
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

  if (!auth) {
    return (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
                type="text" placeholder="Username" value={username}
                onChange={(e) => setUsername(e.target.value)} required
            />
            <input
                type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)} required
            />
            <button type="submit">Login</button>
          </form>


    <h3>Current Inventory</h3>
    <div>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Min Threshold</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {items.map((item) => (
            <tr key={item.id} style={{ backgroundColor: item.lowStock ? '#8B0000' : 'transparent' }}>
              {/* Dynamically highlights the row in dark red if the item's quantity falls below the minimum threshold */}
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.minThreshold}</td>
              <td>
                {item.lowStock ? 'Low Stock' : 'In Stock'}
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
        </div>
    );
        }
  return (
      <div>
        <div>
          <h1>Smart Pantry Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
        {/* Renders the Add Item form only if the logged-in user has Admin role */}
        {auth && username === 'admin' &&
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
        }

        <h3>Current Inventory</h3>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Min Threshold</th>
            <th>Status</th>
            {/* Renders the Actions column only if the logged-in user has Admin role */}
            {auth && username === 'admin' && <th>Actions</th>}
          </tr>
          </thead>
          <tbody>
          {items.map((item) => (
              <tr key={item.id} style={{ backgroundColor: item.lowStock ? '#8B0000' : 'transparent' }}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.minThreshold}</td>
                <td>
                  {item.lowStock ? 'Low Stock' : 'In Stock'}
                </td>
                <td>
                  {/* Renders the restock button only if the logged-in user has Admin role */}
                  {auth && username === 'admin' && <button
                      onClick={() => handleRestock(item.id)}>
                    Restock
                  </button>
                  }
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