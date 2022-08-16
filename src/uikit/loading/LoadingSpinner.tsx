import { FC } from "react";
import "./loadingSpinner.css";

const LoadingSpinner: FC = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
