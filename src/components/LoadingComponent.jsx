import React from "react";

const LoadingComponent = () => {
   return (
        <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full mt-40 h-16 w-16 border-t-4 border-primary"></div>
        </div>
    );
};

export default LoadingComponent;