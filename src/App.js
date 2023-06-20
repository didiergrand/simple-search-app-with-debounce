import "./App.css";
import React, { useState } from "react";

const SearchAPI = (name) =>
  fetch(`https://api.api-ninjas.com/v1/dogs?name=${name}`, {
    headers: { "X-Api-Key": process.env.REACT_APP_API_KEY },
  }) // Replace the `xxxxx` with your API key
    .then((res) => res.json())
    .then((data) => data);

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const onSearchQueryChange = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
    // Fetch search data based on query`
    SearchAPI(searchQuery)
      .then((data) => {
        // Set data to result`
        if (event.target.value === "" || data?.length === 0) {
          return setSearchResult([]);
        }
        setSearchResult(data);

        console.log(data, searchResult);
      })
      .catch((e) => {
        console.log("error:", event);
      });
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
          <div>
            <img src={dog.image_link} alt="dog" />
            <div>
              <h5>{dog.name} </h5>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h5> No results found </h5>
        </div>
      )}
    </div>
  );
}

export default App;
