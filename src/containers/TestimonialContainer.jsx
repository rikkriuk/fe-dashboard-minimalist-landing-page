import react, { useState } from "react";
import { useLocation } from "react-router-dom";
import TestimonialListComponent from "../components/TestimonialListComponent";
import TestimonialInputComponent from "../components/TestimonialInputComponent";

const TestimonialContainer = () => {
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
      {!isAdd && !isEdit && <TestimonialListComponent toggleOverlay={toggleOverlay}
          isOverlayVisible={isOverlayVisible} overlayImageUrl={overlayImageUrl} setIsOverlayVisible={setIsOverlayVisible} />}

      {(isAdd || isEdit) && <TestimonialInputComponent isEdit={isEdit} />}
   </section>
  );
};

export default TestimonialContainer;