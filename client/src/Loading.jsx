import "./Loading.css";

const Loading = ( { prompt }) => (
  <div className="flex flex-col">
    <span className="text-xl text-white">{prompt}</span>
    <div>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

export default Loading;
