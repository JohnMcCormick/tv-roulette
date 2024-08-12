import { useEffect, useState } from "react";
import "./App.css";

import Loading from "./Loading";
import Episode from "./Episode";
import Search from "./Search";
import Footer from "./Footer";

function App() {
  const [defaultShows, setDefaultShows] = useState([]);
  const [shows, setShows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInitialShows = async () => {
      let response = await fetch(`/api`);
      let data = await response.json();
      let { shows } = data;
      setDefaultShows(shows);
      setShows(shows);
    };

    fetchInitialShows();
  }, []);

  useEffect(() => {
    const searchShows = async () => {
      if (searchInput.length >= 3) {
        let response = await fetch(`/api/search?show=${searchInput}`);
        let data = await response.json();
        setShows(data.shows);
      } else {
        setShows(defaultShows);
      }
    };
    searchShows();
  }, [searchInput]);

  const handleSelect = async (id) => {
    setIsLoading(true);
    let response = await fetch(`/api/select?id=${id}`);
    let data = await response.json();
    setSelectedEpisode(data);
    // setSearchInput('');
    // setShows([]);
    setIsLoading(false);
  };

  const handleGoBack = () => {
    setSelectedEpisode(null);
  };

  const handleReroll = async () => {
    const {
      data: { seriesId },
    } = selectedEpisode;
    await handleSelect(seriesId);
  };

  return (
    <div className="min-h-screen p-10 text-center max-w-xl m-auto">
      <div className="mb-5">
        <span className="text-4xl text-white font-semibold">TV Roulette</span>
      </div>
      {isLoading ? (
        <Loading prompt="Getting episode" />
      ) : selectedEpisode ? (
        <Episode
          handleGoBack={handleGoBack}
          handleReroll={handleReroll}
          selectedEpisode={selectedEpisode}
        />
      ) : defaultShows?.length > 0 ? (
        <Search
          shows={shows}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSelect={handleSelect}
        />
      ) : (
        <Loading prompt=""/>
      )}
      <Footer />
    </div>
  );
}

export default App;