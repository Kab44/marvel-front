import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CharComics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--6ddrj29nv9kk.code.run/comics/${characterId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <h1>CHARAC IN COMICS</h1>
      {data.comics.map((comic) => {
        const comic_img_url =
          comic.thumbnail.path + "." + comic.thumbnail.extension;
        return (
          <div className="card" key={comic._id}>
            <img src={comic_img_url} alt="img" className="img" />
            <div className="container">
              <h3>{comic.title}</h3>
              <p>{comic.description}</p>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default CharComics;
