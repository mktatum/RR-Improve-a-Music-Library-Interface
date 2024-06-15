import { useState, useRef } from "react";
import { SearchContext } from "./context/SearchContext";
import SearchBar from "./components/SearchBar";
import Gallery from "./components/Gallery";
import { DataContext } from "./context/DataContext";

const App = () => {
  let [message, setMessage] = useState("Search for Music!");
  let [data, setData] = useState([]);
  let searchInput = useRef("");

  const API_URL = "https://itunes.apple.com/search?term=";

  const handleSearch = (e, term) => {
    e.preventDefault();
    // console.log(term);
    const fetchData = async () => {
      document.title = `${term.current.value} music`;
      const response = await fetch(API_URL + term.current.value);
      const resData = await response.json();
      if (resData.results.length > 0) {
        return setData(resData.results);
      } else {
        return setMessage("Not Found.");
      }
    };
    fetchData();
  };

  return (
    <div className="App">
      <SearchContext.Provider
        value={{ term: searchInput, handleSearch: handleSearch }}
      >
        <SearchBar />
      </SearchContext.Provider>
      {message}
      <DataContext.Provider value={data}>
        <Gallery />
      </DataContext.Provider>
    </div>
  );
};

export default App;
