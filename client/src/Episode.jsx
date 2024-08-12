import React from "react";

const Episode = ({
  handleReroll,
  handleGoBack,
  selectedEpisode: { episodeNumber, seasonNumber, data },
}) => {
  let { name, overview, image } = data;

  return (
    <div className="flex justify-center flex-col">
      <div className="mb-7">
        <span className="text-2xl text-white">Your pick</span>
      </div>
      <div className="mb-2 bg-slate-950 p-3 rounded-md">
        <div>
          <span className="text-2xl text-white">
            Season {seasonNumber}, Episode {episodeNumber}
          </span>
        </div>
        <div className="py-3">
          <span className="text-4xl text-white">{name}</span>
        </div>
        <div className="flex justify-center py-2">
          <img src={image}></img>
        </div>
        <div className="pt-3 pb-3 px-5">
          <span className="text-l text-white">{overview}</span>
        </div>
      </div>
      <button
        className="rounded-md my-2 py-2 bg-slate-950 text-white"
        onClick={handleReroll}
      >
        Reroll
      </button>
      <button
        className="rounded-md my-2 py-2 bg-slate-950 text-white"
        onClick={handleGoBack}
      >
        Go back
      </button>
    </div>
  );
};

export default Episode;
