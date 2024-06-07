import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [find, setFind] = useState("");
  const [results, setResults] = useState([]);

  const result = async (query) => {
    try {
      const search = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      setResults(search.data.items);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  
  useEffect(() => {
    if (find) {
      result(find);
    }
  }, [find]);

  const handleFind = (event) => {
    setFind(event.target.value);
  };

  return (
    <div className="App">
      <h2>Find a Book</h2>
      <input type="text" onChange={handleFind} value={find} />
      <div>
        {results.map((book, index) => (
          <ul key={index}>
            <li>{book.volumeInfo.title}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;

