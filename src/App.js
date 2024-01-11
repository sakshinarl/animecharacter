import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Header from "./components/Header";

// importing other components 


function App() {
// Creating state variables using useState Hooks :
// "animeList" variable will be used for the searched anime 
// "topAnime" variable will be used for all the popular anime
// "search" variable will be used for search terms
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");

  // Fetching top anime (by popularity) from jikan API
  // In place of simple fetch method you can axios library 
  // async function is used so don't to the keyword await

  const getTopAnime = async () => {
    const data = await fetch(
      `https://api.jikan.moe/v3/top/anime/1/bypopularity`
    ).then((res) => res.json());

    setTopAnime(data.top);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    fetchAnime(search);
  };

  // Fetching searched anime from jikan API
  const fetchAnime = async (anime_name) => {
    const data = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${anime_name}&order_by=title&sort=asc&limit=10`
    ).then((res) => res.json());

    setAnimeList(data.results);
  };

  // get getTopAnime() as the site render useEffect is used
  useEffect(() => {
    getTopAnime();
  }, []);

  return (
    <>
    <div className="App" >
      <Header />

      {/*  Main Content  */}
      <Home
        // passing props to the Home Component 
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
        animeList={animeList}
        topAnime={topAnime}
      />

      <Footer />
      </div>
    </>
  );
}

export default App;