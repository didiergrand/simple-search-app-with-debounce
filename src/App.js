import "./App.css";
import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

const SearchAPI = (name) =>
  fetch(`https://api.api-ninjas.com/v1/dogs?name=${name}`, {
    headers: { "X-Api-Key": process.env.REACT_APP_API_KEY },
  })
    .then((res) => res.json())
    .then((data) => data);

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  useEffect(() => {
    if (debouncedSearchQuery) {
      SearchAPI(debouncedSearchQuery)
        .then((data) => {
          if (data?.length === 0) {
            setSearchResult([]);
          } else {
            setSearchResult(data);
          }
        })
        .catch((e) => {
          console.log("error:", e);
        });
    } else {
      setSearchResult([]);
    }
  }, [debouncedSearchQuery]);

  const onSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="App">
      <input
        type="search"
        name="searchQuery"
        onChange={onSearchQueryChange}
        placeholder="Search by name"
        aria-label="Search"
      />
      {searchResult.length > 0 ? (
        searchResult.map((dog) => (
          <div key={dog.id}>
            <img src={dog.image_link} alt="dog" width={100} />
            <div>
              <h5>{dog.name}</h5>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h5>No results found</h5>
        </div>
      )}
    </div>
  );
}

export default App;