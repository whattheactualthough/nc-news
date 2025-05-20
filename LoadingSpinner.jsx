import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

const LoadingSpinner = ({ loading }) => {
  return (
    <div className="loading-spinner">
    
     
      <PuffLoader
        speedMultiplier={0.75}
        color= "olive"
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
