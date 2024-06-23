import { useEffect, useState } from "react";
import axios from "axios";
import "./comics.page.css";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

// FUNCTIONS

// VARIABLES
let limit = 100;
var page = 1;
// var title = "";

function Comics() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteComics")) || []
  );
  const fetchData = async () => {
    try {
      page = parseInt(page);
      let skip = (page - 1) * limit;
      const response = await axios.get(
        "https://site--marvel-back--6ddrj29nv9kk.code.run/comics",
        {
          params: {
            limit,
            skip,
            title,
          },
        }
      );
      setIsLoading(false);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const setFavorite = (id, value) => {
    const favs = [...favorites.filter((f) => f !== id)];
    if (value) {
      favs.push(id);
    }
    setFavorites(favs);
  };
  const getFavorite = (id) => {
    if (favorites) {
      return favorites.some((f) => f === id) || false;
    }
    return false;
  };

  useEffect(() => {
    if (isLoading) {
      fetchData();
    } else {
      localStorage.setItem("favoriteComics", JSON.stringify(favorites));
    }
  });

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h1>COMICS</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="search-comics"
          type="Recherche"
          placeholder="Rechercher des comics"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" onClick={() => fetchData()}>
          Search
        </button>
      </form>
      <button className="minus" onClick={() => (page -= 1)}>
        Previous
      </button>
      <span>Page : {page}</span>
      <button className="plus" onClick={() => (page += 1)}>
        Next
      </button>
      {data.results.map((comic, index) => {
        const img_url = comic.thumbnail.path + "." + comic.thumbnail.extension;
        return (
          <div className="card" key={comic._id}>
            {/* <Link to={`/characters`}>CHARAC</Link> */}
            <input
              id="fav"
              type="checkbox"
              checked={getFavorite(comic._id)}
              onChange={(e) => setFavorite(comic._id, e.target.checked)}
            />
            <label htmlFor="fav">Favori</label>
            <span>{comic.title}</span>
            <img src={img_url} alt="img" className="img" />
            <p>{comic.description}</p>
          </div>
        );
      })}
    </>
  );
}

export default Comics;
