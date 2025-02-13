import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import axios from "axios";

const API_URL = "http://localhost:5000";

function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetch initial stocks
    axios.get(`${API_URL}/stocks`).then((response) => {
      const stockArray = response.data.map(([name, price]) => ({
        name,
        price,
      }));
      setStocks(stockArray);
    });

    // Listen for real-time stock updates
    socket.on("stockUpdate", ({ stock, price }) => {
      setStocks((prevStocks) =>
        prevStocks.map((s) => (s.name === stock ? { name: stock, price } : s))
      );
    });

    return () => {
      socket.off("stockUpdate");
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Stock Market Monitoring</h1>
      <table border="1" width="50%" style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.name}>
              <td>{stock.name}</td>
              <td>${stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
