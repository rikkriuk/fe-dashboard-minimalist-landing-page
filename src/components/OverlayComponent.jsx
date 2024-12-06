import React from "react";

const OverlayComponent = ({ imageUrl, onClose }) => {
  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
         <div className="bg-white p-4 rounded shadow-lg relative">
            <button
               onClick={onClose}
               className="absolute bg-primary px-3 py-1 rounded-md text-white top-0 right-0 hover:bg-primary-700"
            >
               Close
            </button>
            <img src={imageUrl} alt="Overlay" className="max-w-full max-h-96" />
         </div>
      </div>
  );
};

export default OverlayComponent;