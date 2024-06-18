import { useState, useEffect, useRef } from "react";
import { SearchContext } from "./context/SearchContext";
import SearchBar from "./components/SearchBar";
import Gallery from "./components/Gallery";
import { DataContext } from "./context/DataContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";

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
      {message}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchContext.Provider
                  value={{ term: searchInput, handleSearch: handleSearch }}
                >
                  <SearchBar />
                </SearchContext.Provider>
                <DataContext.Provider value={data}>
                  <Gallery />
                </DataContext.Provider>
              </>
            }
          />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
