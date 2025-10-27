import React, { useState } from "react";
import axios from "axios";

const Recommendation: React.FC = () => {
  const [itemId, setItemId] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const fetchRecommendations = async () => {
    try {
      const body: any = {};
      if (itemId) {
        body.itemId = itemId;
      } else {
        if (color) body.color = color;
        if (category) body.category = category;
        if (style) body.style = style;
      }

      const response = await axios.post("http://localhost:5000/api/recommendations", body);
      setResults(response.data.recommended || []);
    } catch (error) {
      console.error("Recommendation error:", error);
    }
  };

  return (
    <div>
      <h2>Attribute-Based Recommendations</h2>
      <div>
        <label>Item ID (optional): </label>
        <input
          value={itemId}
          onChange={e => setItemId(e.target.value)}
          placeholder="e.g., 63f2cfeecf0..."
        />
      </div>
      <p>-- OR Enter Attributes --</p>
      <div>
        <label>Color: </label>
        <input value={color} onChange={e => setColor(e.target.value)} placeholder="red" />
      </div>
      <div>
        <label>Category: </label>
        <input value={category} onChange={e => setCategory(e.target.value)} placeholder="top" />
      </div>
      <div>
        <label>Style: </label>
        <input value={style} onChange={e => setStyle(e.target.value)} placeholder="casual" />
      </div>
      <button onClick={fetchRecommendations}>Get Recommendations</button>

      <h3>Results:</h3>
      <ul>
        {results.map(item => (
          <li key={item._id}>
            {item.filePath} - {JSON.stringify(item.attributes)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;
