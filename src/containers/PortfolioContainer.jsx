import react, { useState } from "react";
import { useLocation } from "react-router-dom";
import PortfolioListComponent from "../components/PortfolioListComponent";
import PorfolioInputComponent from "../components/PortfolioInputComponent";

const PortfolioContainer = () => {
   const location = useLocation();
   const isAdd = location.pathname.includes("/add");
   const isEdit = location.pathname.includes("/edit");
   const [isOverlayVisible, setIsOverlayVisible] = useState(false);
   const [overlayImageUrl, setOverlayImageUrl] = useState(null);

   const toggleOverlay = (imageUrl) => {
      if (imageUrl) {
        setOverlayImageUrl(imageUrl);
      }
      setIsOverlayVisible(!isOverlayVisible);
    };

  return (
   <section>
      {!isAdd && !isEdit && <PortfolioListComponent toggleOverlay={toggleOverlay}
          isOverlayVisible={isOverlayVisible} overlayImageUrl={overlayImageUrl} setIsOverlayVisible={setIsOverlayVisible} />}

      {(isAdd || isEdit) && <PorfolioInputComponent isEdit={isEdit} />}
   </section>
  );
};

export default PortfolioContainer;