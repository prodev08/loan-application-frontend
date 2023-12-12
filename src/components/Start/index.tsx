import { FC } from "react";

interface IStart {
  handleStart: () => void;
}

const Start: FC<IStart> = ({ handleStart }) => {
  return (
    <div className="start-page">
      <div className="component-color rounded-md w-[800px] h-100 p-[65px]">
        <h1 className="mb-16">Loan Application System</h1>
        <button className="primary-button" onClick={() => handleStart()}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Start;
