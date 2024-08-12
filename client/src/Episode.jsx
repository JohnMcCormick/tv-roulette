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
        <span className="text-3xl text-white">Your pick</span>
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
      <div className="flex flex-col max-w-xs m-auto">
        <button
          className="rounded-md my-2 py-2 bg-slate-950 text-white hover:bg-black px-10"
          onClick={handleReroll}
        >
          Re-roll
        </button>
        <button
          className="rounded-md my-2 py-2 bg-slate-950 text-white hover:bg-black px-10"
          onClick={handleGoBack}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default Episode;
