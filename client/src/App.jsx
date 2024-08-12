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
  const [rerolling, setRerolling] = useState(false);

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

  const handleSelect = async (id, reroll = false) => {
    setRerolling(reroll);
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
    setRerolling(true);
    const {
      data: { seriesId },
    } = selectedEpisode;
    await handleSelect(seriesId, true);
  };

  return (
    <div className="min-h-screen text-center">
      <div className="p-5 bg-slate-950">
        <span className="text-4xl text-white font-semibold">TV Roulette</span>
      </div>
      <div className="max-w-xl m-auto pt-5 pb-7">
        {isLoading ? (
          <Loading prompt={rerolling ? "Re-rolling" : "Getting episode"} />
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
          <Loading prompt="" />
        )}
        <Footer />
      </div>
    </div>
  );
}

export default App;
