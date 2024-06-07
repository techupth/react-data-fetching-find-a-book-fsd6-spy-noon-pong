import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResualt, setSearchResualt] = useState([]);

  const getItem = async (text) => {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${Text}`
    );
    setSearchResualt(result.data);
  };

  useEffect(() => {
    if (searchText) {
      getItem(searchText);
    }
  }, [searchText]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <label htmlFor="search-text">search: </label>
      <input
        id="search-text"
        type="text"
        onChange={(e) => setSearchResualt(e.target.value)}
      />
      {searchResualt.length > 0 && (
        <>
          {searchResualt.map((result, index) => (
            <div key={index} className="autocompleteItems">
              <li className="search-result">{result.volumeInfo.title}</li>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
