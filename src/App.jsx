import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const findBook = async (searchQuery) => {
    try {
      const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
      setBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    findBook(query);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="text here" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {books.map(({ id, volumeInfo: { title, authors } }) => (
          <li key={id}>
            {title} by {authors ? authors.join(", ") : "Unknown Author"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
