import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./characters.page.css";

function Characters() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteCharacters")) || []
  );
  const fetchData = async () => {
    try {
      const response = await axios.get(
        //   `https://lereacteur-vinted-api.herokuapp.com/v2/offers/`
        `https://site--marvel-back--6ddrj29nv9kk.code.run/characters`,
        {
          params: {
            name,
          },
        }
      );
      setData(response.data);
      // console.log(response.data);
      setIsLoading(false);
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
      localStorage.setItem("favoriteCharacters", JSON.stringify(favorites));
    }
  });
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h1>CHARACTERS</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="search-comics"
          type="Recherche"
          placeholder="Rechercher des characters"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" onClick={() => fetchData()}>
          Search
        </button>
      </form>
      {data.results.map((charac) => {
        const charac_img_url =
          charac.thumbnail.path + "." + charac.thumbnail.extension;
        return (
          <div className="card" key={charac._id}>
            <input
              id="fav"
              type="checkbox"
              checked={getFavorite(charac._id)}
              onChange={(e) => setFavorite(charac._id, e.target.checked)}
            />
            <label htmlFor="fav">Favori</label>
            <Link to={`/comics/${charac._id}`}>
              <img src={charac_img_url} alt="img" className="img" />
              <div className="container">
                <h3>{charac.name}</h3>
                <p>{charac.description}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default Characters;
